import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useLoaderData, useNavigate, Await } from "react-router-dom";
import DOMPurify from "dompurify";
import { AuthContext } from '../../context/AuthContext'
import { useContext, useState, Suspense, useRef, useEffect } from "react";
import apiRequest from '../../lib/apiRequest'
import Chat from "../../components/chat/Chat";
import ReactStars from 'react-rating-stars-component';
import TextareaAutosize from 'react-textarea-autosize';
import {format} from 'timeago.js'

function SinglePage() {

  const singlePageLoader = useLoaderData();
  const post = singlePageLoader.postResponse
  console.log(post)
  let { comments, ratings } = post
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
  console.log(comments)

  const navigate = useNavigate();
  const [saved, setSaved] = useState(post.isSaved)
  const [chatData, setChatData] = useState(null)
  const [alreadyCommented, setAlreadyCommented] = useState(post.alreadyCommented)
  const [alreadyRated, setAlreadyRated] = useState(post.alreadyRated)
  const [postedUserData, setPostedUserData] = useState(singlePageLoader.postResponse.user)
  const [rating, setRating] = useState(0)
  const [editRating, setEditRating] = useState(true)
  const [comment, setcomment] = useState([])
  const [sent, updateSent] = useState(false)
  const { currentUser } = useContext(AuthContext);
  const chatRef = useRef()
  const textarea = "Write some of the best experience of yours from this place ...."
  useEffect(() => {
    async function fetchData() {
      try {
        const postedUserId = postedUserData.id
        const res = await apiRequest.get('/chats/get/' + postedUserId)
        if (res !== null) {
          setChatData(res.data)
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [postedUserData])

  const handleSave = async () => {
    setSaved((prev) => !prev)
    if (!currentUser) {
      navigate("/login")
    }
    try {
      await apiRequest.post('/users/save', { postId: post.id })
    } catch (err) {
      setSaved((prev) => !prev)
      console.log(err)
    }
  }

  const openChatBox = async () => {
    const receiver = post?.user;
    const receiverId = post?.userId
    receiver["id"] = receiverId
    console.log('chatData state', chatData)
    if (chatData !== null) {
      console.log('user & chat already exists', chatData)
      chatRef.current?.openChat(chatData.id, receiver);
    } else {
      console.log('new user has to be created')
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
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div className="bottom" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.postDetail.desc) }}></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
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
                    value={rating}
                    activeColor="#ffd700"
                    onChange={changeRating}
                  />
                  <span className="title" style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', padding: '20px' }}>{rating} out of 5</span>
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

          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                <span>
                  {post.postDetail.utilities === "owner" ?
                    (<p>Owner is responsible</p>) : (<p>Tenant is responsible</p>)
                  }
                </span>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                <span>{post.postDetail.pet === "allowed" ? (<p>Pets are allowed</p>) : (<p>Pets are not allowed</p>)}</span>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Property Fees</span>
                <span>{post.postDetail.income}</span>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postDetail.size} sqft</span>
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
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>{post.postDetail.school > 1000 ? post.postDetail.school / 1000 + "km" : post.postDetail.school + "m"} away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail.restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="comments-ratings">
            {
              comments.map((comment) => (
                <div className="user-comments" key={comment.id}>
                  <div style={{ display: 'flex' }}>
                    <div >
                      <img className="avatar-img" src={comment.user.avatar} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '1vh' }}>
                      <span>{comment.user.username}</span>
                      <span style={{display:'flex',width:'180%'}}>
                        <div style={{display:'flex',alignItems:'flex-start'}}>
                        <ReactStars
                          count={5}
                          isHalf={true}
                          size={20}
                          edit={false}
                          value={comment.stars}
                          activeColor="#ffd700"
                        />
                        </div>
                        <div style={{display:'flex',alignItems:'center',marginLeft:'60%'}}>
                          {format(comment.createdAt)}
                        </div>
                      </span>
                      <div className="comment">
                        <TextareaAutosize
                          cols={20}
                          style={{ padding: '15px', width: '180%' }}
                          autoFocus={true}
                          minRows={5}
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
                <Chat chats={chatData} ref={chatRef} showLastMsgs={false} />
              }
            </div>
          </div>
          <div className="buttons">
            <button onClick={openChatBox}>
              <img src="/chat.png" alt="" style={{ width: "70%" }} />
              <span style={{ color: "black" }} >Send a Message</span>
            </button>
            <button onClick={handleSave} style={{ backgroundColor: saved ? "#fece51" : "white", color: "black" }}>
              <img src="/save.png" alt="" />
              {saved == true ? "place saved " : "save the place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
