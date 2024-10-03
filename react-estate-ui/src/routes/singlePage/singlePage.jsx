import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import { useLoaderData, useNavigate, Await } from "react-router-dom";
import DOMPurify from "dompurify";
import { AuthContext } from '../../context/AuthContext'
import { useContext, useState,  useRef, useEffect } from "react";
import apiRequest from '../../lib/apiRequest'
import Chat from "../../components/chat/Chat";
import ReactStars from 'react-rating-stars-component';
import TextareaAutosize from 'react-textarea-autosize';
import { format } from 'timeago.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarAlt,   faChevronCircleLeft,  faShareNodes, faCoins, faMoneyBill1Wave, faChartArea, faCouch, faCarSide, faDoorOpen,  faChevronCircleDown, faChevronCircleUp, faThumbsUp,  faBathtub, faBed, faToriiGate, faFireBurner, faDiamond, faHeart } from "@fortawesome/free-solid-svg-icons";
import { BHKType } from "../../interfaces/BHKType-interface";
import { FurnishedType } from "../../interfaces/FurnishedType-interface";
import { Amenities } from '../../interfaces/icons-interface.ts'
import Map from "../../components/map/Map";
import Services_Offered from "../../interfaces/services-interface.ts";
import NearbyTransport from "../../components/nearby-transport/nearbyTransport.jsx";
import ReactPlayer from 'react-player'
import NearbyFacilities from "../../components/nearby-facilities/nearbyFacilities.jsx";
function SinglePage() {

  const singlePageLoader = useLoaderData();
  const [wikimediaImages, setWikimediaImages] = useState([]);
  const [openStreetCamImages, setOpenStreetCamImages] = useState([]);
  const [wikidataInfo, setWikidataInfo] = useState([]);
  const post = singlePageLoader.postResponse
 

  let { comments, ratings,postDetail } = post
  if (postDetail?.amenities !== undefined) {
    var filteredAmenities = Object.keys(postDetail.amenities).reduce((result, key) => {
      if (postDetail.amenities[key]) {
        result[key] = Amenities[key]
      }
      return result
    }, {})
  }

  // console.log(post)
  // console.log(postDetail)
  // console.log(comments)

  const RatingMap = globalThis.Map; // Create an alias for the Map object

  const mergeRatingsIntoComments = (comments, ratings) => {

    const ratingsMap = new RatingMap();
    ratings.forEach(rating => {
      ratingsMap.set(rating.user.id, rating.stars)
    })

    return comments.map((comment) => {
      const stars = ratingsMap.get(comment.user.id) || 0.0
      return {
        ...comment,
        stars
      }
    })
  }
  

  comments = mergeRatingsIntoComments(comments, ratings)

  var averageRating = 0.0
  if (ratings !== undefined) {
    post.ratings = ratings
  }
  if (post.ratings !== undefined) {
    averageRating = post.ratings.reduce((acc, rating) => acc + rating.stars, 0) / post.ratings.length || 0;
  }
  const navigate = useNavigate();
  const [saved, setSaved] = useState(post.isSaved)
  const [chatData, setChatData] = useState(null)
  const [isReceiverLive,setIsReceiverLive] = useState(false)
  const [alreadyCommented, setAlreadyCommented] = useState(post.alreadyCommented)
  const [alreadyRated, setAlreadyRated] = useState(post.alreadyRated)
  const [postedUserData, setPostedUserData] = useState(singlePageLoader.postResponse.user)
  const [rating, setRating] = useState(0)
  const [editRating, setEditRating] = useState(true)
  const [comment, setcomment] = useState([])
  const [sent, updateSent] = useState(false)
  const [wallpaper, setWallpaper] = useState({ src: post.images[0], index: 0 })
  const { currentUser } = useContext(AuthContext);
  const chatRef = useRef()
  const textarea = "Write some of the best experience of yours from this place ...."
  useEffect(() => {
    async function fetchData() {
      try {
        const postedUserId = postedUserData.id
        const res = await apiRequest.get('/chats/get/' + postedUserId)
        if (res !== null) {
          setChatData(res.data.chatID)
          setIsReceiverLive(res.data.isReceiverActive)
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [postedUserData])

  const changeWallpaper = (image, i) => {
    setWallpaper({ src: image, index: i })
  }

  const handleSave = async () => {
   
    if (!currentUser) {
      navigate("/login")
    }
    try {
        const res = await apiRequest.post('/users/save', { postId: post.id })
        if(res){
          setSaved((prev) => !prev)
        }
         
    } catch (err) {
      console.log(err)
    }
  }

  const openChatBox = async () => {
    const receiver = post?.user;
    const receiverId = post?.userId
    receiver["id"] = receiverId
    if (chatData !== null) {
      chatRef.current?.openChat(chatData.id, receiver);
    } else {
      try {
        const res = await apiRequest.post('/chats', { receiverId })
        let chatID = res.data?.id;
        setChatData(res.data)
       
        if (chatID !== undefined) {
          chatRef.current?.openChat(chatID, receiver);
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  const changeRating = async (newRating) => {
    setRating(newRating);
    try {
      const res = await apiRequest.post('/commentsAndRatings/ratings/add', { postId: post.id, stars: newRating })
      if (res) setEditRating(false)
    } catch (err) {
      setEditRating(true)
      console.log(err)

    }
  };

  const saveComment = async () => {
    try {
      const res = await apiRequest.post('/commentsAndRatings/comments/add', { postId: post.id, content: comment })
      console.log(res)
      if (res) updateSent(true)
    } catch (err) {
      updateSent(false)
      console.log(err)
    }
  }

  return (
    <div className="singlePage">
     <div className="details">
        <div className="detail-wrapper">
      <span className="flex title-container">
          <span className="padding-sm">
            <h1 className="bhk-type">
              {
                !(postDetail?.BHKType === undefined) && <span>"{Object.entries(BHKType).find(([key, value]) => key == postDetail?.BHKType)[1]}" independent {post.property} for {post.type} in {post.city}</span>
              }
            </h1>
          </span>       
      </span>
          <span style={{height:'50vh'}}> 
            <Slider images={post.images} wallpaper={wallpaper} />
          </span>
          <span className="small-img-gallery">
            <div className="horizontal-images">
            <span className="chevron-btn-container">
              <FontAwesomeIcon icon={faChevronCircleLeft} className="chevron-icon"/>
            </span>
              {post.images.slice(1).map((image, i) => (
                <img
                  src={image}
                  alt=""
                  className="horizontal-wrapper-img"
                  key={i}
                  onClick={() => changeWallpaper(image, i)}
                />
              ))}
            </div>
          </span>
          <div className="info">
            <div className="top">
              <div className="post">
                <span className="post-title-container">
                <div className="user">
                      <img src={post.user.avatar} alt="" className="profile-img hover-scaleUp box-shadow"/>
                      <span className="flex">
                      <span className="address padding-xs hover-scaleUp" >{post.user.username}</span>
                      <span className="padding-sm">
                      <FontAwesomeIcon icon={faDiamond} style={{fontSize:'8px'}}/>
                      </span>
                      <p className="address padding-xs" >Ad Created {format(postDetail.createdAt)}</p> 
                      </span>
                    </div>
                  <h1>{post.title}</h1>
                  <div className="address" style={{color:'black'}}>
                    <p>{FurnishedType[postDetail.furnishedType]}</p> , <p>{post.sqft} Sqft</p> , <p>{post.facing} Facing</p>
                  </div>
                <div className="address">
                    <img src="/pin.png" alt="" />
                    <span>{post.address}</span>
                  </div>
                 
                  <div className="property-detail-container flex">
                    <div className=" flex-column padding-sm">
                    <span>
                      <FontAwesomeIcon icon={faBed} className="font-size-md" />
                    </span>
                    <span>
                      <label className="font-semiBold">{post.bedroom} bedroom</label>
                    </span>
                    </div>
                     {/* <FontAwesomeIcon icon={faDiamond} style={{fontSize:'8px'}}/> */}
                    <div  className=" flex-column padding-sm">
                    <span>
                      <FontAwesomeIcon icon={faBathtub} className="font-size-md"/>
                    </span>
                    <span> 
                      <label  className="font-semiBold">{post.bathroom} bathroom</label>
                    </span>
                    </div>
                      {/* <FontAwesomeIcon icon={faDiamond} style={{fontSize:'8px'}}/> */}
                    <div  className="flex-column  padding-sm">
                    <span>
                      <FontAwesomeIcon icon={faCarAlt} className="font-size-md" />
                    </span>
                    <span>
                      <label className="font-semiBold">{post.parking} parking</label>
                    </span>
                    </div>
                  </div>
                </span>
                <span>
                  <div className=" review-buttons" >
                  <button className=" box-shadow">
                      <FontAwesomeIcon icon={faThumbsUp} />
                    </button>
                    <button className=" box-shadow">
                      <FontAwesomeIcon icon={faShareNodes} />
                    </button>
                    <button onClick={openChatBox} className="box-shadow">
                      <img src="/chat.png" alt=""  />
                    </button>
                    <button onClick={handleSave} className="box-shadow"  >
                      <FontAwesomeIcon icon={faHeart} style={{ color: saved ? "orangered" : "gray",fontSize:'20px'}}/>
                    </button>
                  </div>
                  <div className="flex padding-sm" >                    
                      <ReactStars
                        count={5}
                        isHalf={true}
                        edit={false}
                        disable={true}
                        size={24}
                        value={parseFloat(averageRating.toFixed(1))}
                        activeColor="#ffd700"
                      />
                      {
                        averageRating.toFixed(1) == 0.0 ? (<p>(No reviews yet)</p>
                        ) : (<span className="padding-sm"><label className="font-semiBold font-size-md">{averageRating.toFixed(1)}  / 5</label></span> )
                      }
                  </div>
                    <div className="flex padding-sm">
                    <div className="padding-sm">
                      <label>Deposit</label>
                      <div className="font-size-md font-semiBold">$ {post.deposit}</div>
                    </div>
                    <div  className="padding-sm">
                      <label>Rent</label>
                      <div className="font-size-md font-semiBold">$ {post.rent}</div>
                    </div>
                    </div>
                </span>
              </div>
              {/* <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div> */}
            </div>
            <div className="desc-container">
              <span className="title">Description</span>
            <div className="desc-txt" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(postDetail.desc) }}></div>
            </div>
            <div className=" desc-container">
              <span className="flex title flex-start">
                Services Offered
              </span>
              <span className="flex justify-space-around" >
                  {
                    Services_Offered.map((service,index)=>(
                      <span key={index} className="flex-column padding-sm justify-space-between hover-scaleUp ">
                        <span className="services-img-container padding-sm round-border box-shadow" >
                          <img src={service.src} alt="" className="src" />
                        </span>
                        <span className="flex-column" style={{flexWrap:'wrap'}}>
                          <label className="font-semiBold">{service.name}</label>
                        </span>
                      </span>
                    ))
                  }
              </span>
            </div>
            {/* <div className="desc-container">
              <div className="flex title flex-start">
                Nearby Locations
              </div>
              <div style={{height:'38vh'}}>
                <Map items={[post]}/>
              </div>
            </div> */}
            <div className="desc-container">
              <span className="flex">
              <h3>Nearby Transport</h3>
              <label className="padding-sm">(within 2 kms)</label>
              </span>
          
              <div style={{overflowY:'scroll',height:'55vh'}}>
                <NearbyTransport latitude={post.latitude} longitude={post.longitude} />
              </div>
            </div>
            <div className="desc-container">
              <span className="flex" >
              <h3>Popular places nearby</h3>
              <label className="padding-sm">(within 5 kms)</label>
              </span>
              <div>
                <NearbyFacilities lat={post.latitude} lon={post.longitude}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="additional-info">
        <div className="info-wrapper">
          {
            !alreadyRated && (
              <div className="Ratings">
                <p className="title">Rate this place :</p>
                <span style={{ display: 'flex', marginRight: '10px' }}>
                  <ReactStars
                    count={5}
                    isHalf={true}
                    size={40}
                    edit={editRating}
                    value={parseFloat(rating)}
                    activeColor="#ffd700"
                    onChange={changeRating}
                  />
                  <span className="title flex">{rating} out of 5</span>
                </span>
              </div>
            )
          }
          {
            !alreadyCommented && (
              <div className="comments">
                {
                  sent == true ? (<p className="title">Comment Added Successfully !</p>) : (<p className="title">Comment :</p>)
                }
                <TextareaAutosize
                  style={{ padding: '15px', width: '100%' }}
                  autoFocus={true}
                  minRows={7}
                  maxRows={20}
                  disabled={sent}
                  defaultValue="Write some good / average experience you had from this place..."
                  onChange={ev => setcomment(ev.target.value)}
                />
                <span style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {
                    sent == false ? (<button onClick={saveComment}><i className="fa-solid fa-paper-plane" ></i></button>) : (<i className="fa-solid fa-check" style={{ fontSize: '35px', color: 'green' }}></i>)
                  }
                </span>
              </div>
            )
          }
          <div className="margin-sm ">
            <span className="listVertical">
              <ReactPlayer url='https://www.youtube.com/watch?v=YAeAdNmWc2o' height={'50vh'} width={'auto'} controls={true}  />
            </span>
          </div>
          <p className="title">General</p>
          <div className="flex listVertical">
              <div className="property-details">
                <div className="justify-space-between padding-sm ">
                    <div className="property-detail-section ">
                      <span className="icon-space">
                        <FontAwesomeIcon icon={faMoneyBill1Wave} className="property-icon " />
                      </span>
                      <span className="details-space">
                        <label>rent </label>
                        <p >&#8377; {post.rent}</p>
                      </span>
                    </div>
                    <div className="property-detail-section">
                      <span className="icon-space">
                        <FontAwesomeIcon icon={faCoins} className="property-icon" />
                      </span>
                      <span className="details-space">
                        <label>deposit </label>
                        <p>&#8377; {post.deposit}</p>
                      </span>
                    </div>
                    <div className="property-detail-section">
                      <span className="icon-space">
                        <FontAwesomeIcon icon={faChartArea} className="property-icon" />
                      </span>
                      <span className="details-space">
                        <label>built up </label>
                        <p>{post.sqft} sqft</p>
                      </span>
                    </div>
                </div>
                <div className="justify-space-between padding-sm">
                    <div className="property-detail-section">
                      <span className="icon-space">
                        <FontAwesomeIcon icon={faCarSide} className="property-icon" />
                      </span>
                      <span className="details-space">
                        <label>parking </label>
                        <p>{post.parking}</p>
                      </span>
                    </div>
                    <div className="property-detail-section">
                      <span className="icon-space">
                        <FontAwesomeIcon icon={faBathtub} className="property-icon" />
                      </span>
                      <span className="details-space">
                        <label>bathroom </label>
                        <p>{post.bathroom}</p>
                      </span>
                    </div>
                    <div className="property-detail-section">
                      <span className="icon-space">
                        <FontAwesomeIcon icon={faBed} className="property-icon" />
                      </span>
                      <span className="details-space">
                        <label>bedroom </label>
                        <p>{post.bedroom}</p>
                      </span>
                    </div>
                </div>
                <div className="justify-space-between padding-sm">
                    <div className="property-detail-section">
                      <span className="icon-space">
                        <FontAwesomeIcon icon={faCouch} className="property-icon" />
                      </span>
                      <span className="details-space">
                        <label>Furnishing </label>
                        <p>{post.postDetail?.furnishedType}</p>
                      </span>
                    </div>
                    <div className="property-detail-section">
                      <span className="icon-space">
                        <FontAwesomeIcon icon={faDoorOpen} className="property-icon" />
                      </span>
                      <span className="details-space">
                        <label>facing </label>
                        <p>{post.facing}</p>
                      </span>
                    </div>
                    <div className="property-detail-section">
                      <span className="icon-space">
                        <FontAwesomeIcon icon={faFireBurner} className="property-icon" />
                      </span>
                      <span className="details-space">
                        <label>Gas line </label>
                        <p>{postDetail.gasPipeline}</p>
                      </span>
                    </div>
                </div>
                <div className="justify-space-between padding-sm">
                    <div className="property-detail-section">
                      <span className="icon-space">
                        <FontAwesomeIcon icon={faToriiGate} className="property-icon" />
                      </span>
                      <span className="details-space">
                        <label>Gated Community </label>
                        <p>{postDetail.gatedCommunity}</p>
                      </span>
                    </div>
                </div>
              </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes pointer">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.sqft} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Amenities</p>
            <div className="property-details">
            <div className="flex ">
              {
                !(postDetail?.amenities === undefined) && Object.keys(postDetail?.amenities).length > 0 && <>
                  {
                    Object.keys(filteredAmenities).slice(0, Object.keys(filteredAmenities).length).map((key,index) => (
                      <div key={index} className="amenities-column">
                        <span>
                          <img src={filteredAmenities[key]} alt="" className="src box-shadow" />
                        </span>
                        <span>
                          <p>{key}</p>
                        </span>
                      </div>
                    ))
                  }
                </>
              }
            </div>
            </div>
          <p className="title">Nearby Places</p>
          <div className="property-details">
            <div className="flex">
            {
                 postDetail.highlightDetails &&   Object.entries(postDetail.highlightDetails).map(([key, detail]) => (
                          <div key={key} className="amenities-column">
                            <span>
                              <img src={'/highlights/' + key + '.png'} alt="" className="box-shadow" />
                            </span>
                            <span>
                              <p>{detail.name}</p>
                              <p>{detail.km}</p>
                              </span>
                          </div>
                        ))
                      }
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <p className="title">Top Comments</p>
          <div className="comments-ratings padding-sm">
            {
              comments.map((comment,index) => (
                <div className="user-comments" key={index}>
                  <div className="flex flex-start full-width " >
                    <span className="flex-column padding-sm" >
                     <img className="avatar-img" src={comment.user.avatar} />
                    </span>
                    <div className="flex-column " style={{flex:1}}>
                      <span className="white-txt">{comment.user.username}</span>
                      <span className="flex justify-space-between" >
                        <div className="flex">
                          <ReactStars
                            count={5}
                            isHalf={true}
                            size={20}
                            edit={false}
                            value={comment.stars}
                            activeColor="#ffd700"
                          />
                        </div>
                        <div className="flex white-txt">
                          {format(comment.createdAt)}
                        </div>
                      </span>
                      <div className="comment">
                        <TextareaAutosize
                          cols={20}
                          style={{ padding: '15px', width: '100%',borderRadius:'5vh',color:'white' }}
                          autoFocus={true}
                          minRows={1}
                          maxRows={7}
                          disabled={true}
                          defaultValue={comment.content}
                          onChange={ev => setcomment(ev.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="chatContainer">
            <div className="wrapper">
              {
                <Chat chats={chatData} ref={chatRef} showLastMsgs={false} receiverData={isReceiverLive}/>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
