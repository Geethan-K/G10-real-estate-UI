import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';
import { faCoins, faMoneyBill1Wave, faChartArea, faCouch, faCarSide, faDoorOpen, faCheck, faClock, faCheckDouble, faChevronCircleDown, faChevronCircleUp, faThumbsUp, faBookmark, faComment, faShareNodes, faBathtub, faBed, faToriiGate, faFireBurner, faVideoCamera, faNewspaper, } from "@fortawesome/free-solid-svg-icons";
import { BHKType } from '../../interfaces/BHKType-interface.ts'
import "./card.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DOMPurify from "dompurify";
import { format } from 'timeago.js';
import { Amenities } from '../../interfaces/icons-interface.ts'
import { color, motion, useAnimation } from 'framer-motion'
import ReactPlayer from 'react-player'
import TextareaAutosize from 'react-textarea-autosize';

const Card = React.memo(({ item, postDetail, userDetail, ratings, comments }) => {
  console.log(item)
  console.log(ratings)
  console.log(comments)
  console.log(postDetail)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandProperties, setExpandProperties] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [amenitiesExpand, setAmenitiesIsExpand] = useState(false);
  const [expandFurnishings, setExpandFurnishings] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [houseTour, setHouseTour] = useState(true);
  const [readComments, setReadComments] = useState(false)
  const [showFullComments,setShowFullComments]=useState(false)

  const controlAnimation = useAnimation()
  if (item.postDetail?.amenities !== undefined) {
    var filteredAmenities = Object.keys(item.postDetail.amenities).reduce((result, key) => {
      if (item.postDetail.amenities[key]) {
        result[key] = Amenities[key]
      }
      return result
    }, {})
  }
  const handleMouseEnter = () => {
    setIsHovered(true);
    controlAnimation.stop(); // Stop the animation
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    controlAnimation.start({
      x: ["100%", "-100%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    });
  };
  const RatingMap = globalThis.Map;
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
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex =>
        (prevIndex + 1) % item.images.length
      );
    }, 2000); // Change image every 3 seconds

    return () => clearInterval(intervalId);
  }, [item.images.length]);

  useEffect(() => {
    controlAnimation.start({
      x: ["100%", "-100%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    });
  }, [controlAnimation])
  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }
  const ChangeExpandProperties = () => {
    setExpandProperties(!expandProperties);
  }
  const switchMode = () => {
    setReadComments(!readComments)
    setHouseTour(!houseTour)
  }

  var averageRating = 0.0
  if (ratings !== undefined) {
    item.ratings = ratings
  }
  if (item.ratings !== undefined) {
    averageRating = item.ratings.reduce((acc, rating) => acc + rating.stars, 0) / item.ratings.length || 0;
  }
  return (
    <>
      { // to={`/${item.id}`}
        !(item.type == 'booking') && <div style={{ display: 'flex' }}>
          <Link >
            <div className="card">
              <div className="imageContainer">
                <img src={item.images[currentImageIndex]} alt="" />
              </div>
              <div className="textContainer">
                <span style={{ display: 'flex', justifyContent: 'space-between', height: '7px' }}>
                  <span>
                    <h1 className="bhk-type">
                      {
                        !(postDetail?.BHKType === undefined) && <span>"{Object.entries(BHKType).find(([key, value]) => key == postDetail?.BHKType)[1]}" independent {item.property} for {item.type} </span>
                      }
                    </h1>
                  </span>
                  <span>
                    {
                      !(averageRating.toFixed(1) == 0.0) &&
                      <div id="rating">
                        <button>
                          {averageRating.toFixed(1)}
                        </button>
                        <span>
                          Excellent
                        </span>
                      </div>
                    }

                    {/* <ReactStars
                count={5}
                isHalf={true}
                edit={false}
                disable={true}
                size={24}
                value={averageRating.toFixed(1)}
                activeColor="#ffd700"
              /> */}
                    {
                      averageRating.toFixed(1) == 0.0 ? (<p>(No reviews yet)</p>
                      ) : (<></>)
                    }
                  </span>
                </span>
                <h2 className="title">
                  <Link to={`/${item.id}`}>"{item.title} "</Link>
                </h2>
                {/* <p className="price">	&#8377; {item.price}</p> */}
                <span className="flex">
                  <p className=" user-name">Property details</p>
                </span>
                <div className="flex">
                <div className="property-details-container">
                  <div className="property-details">
                    <div className="flex">
                      <span className="rent">
                        <div className="property-detail-section">
                          <span className="icon-space">
                            <FontAwesomeIcon icon={faMoneyBill1Wave} className="property-icon" />
                          </span>
                          <span className="details-space">
                            <label>rent </label>
                            <p>&#8377; {item.rent}</p>
                          </span>
                        </div>
                      </span>
                      <span className="rent">
                        <div className="property-detail-section">
                          <span className="icon-space">
                            <FontAwesomeIcon icon={faCoins} className="property-icon" />
                          </span>
                          <span className="details-space">
                            <label>deposit </label>
                            <p>&#8377; {item.deposit}</p>
                          </span>
                        </div>
                      </span>
                      <span className="rent">
                        <div className="property-detail-section">
                          <span className="icon-space">
                            <FontAwesomeIcon icon={faChartArea} className="property-icon" />
                          </span>
                          <span className="details-space">
                            <label>built up </label>
                            <p>{item.sqft} sqft</p>
                          </span>
                        </div>
                      </span>
                    </div>
                    {
                      expandProperties && <div className="hidden-properties">
                        <span className="rent">
                          <div className="property-detail-section">
                            <span className="icon-space">
                              <FontAwesomeIcon icon={faCarSide} className="property-icon" />
                            </span>
                            <span className="details-space">
                              <label>parking </label>
                              <p>{item.parking}</p>
                            </span>
                          </div>
                        </span>
                        <span className="rent">
                          <div className="property-detail-section">
                            <span className="icon-space">
                              <FontAwesomeIcon icon={faBathtub} className="property-icon" />
                            </span>
                            <span className="details-space">
                              <label>bathroom </label>
                              <p>{item.bathroom}</p>
                            </span>
                          </div>
                        </span>
                        <span className="rent">
                          <div className="property-detail-section">
                            <span className="icon-space">
                              <FontAwesomeIcon icon={faBed} className="property-icon" />
                            </span>
                            <span className="details-space">
                              <label>bedroom </label>
                              <p>{item.bedroom}</p>
                            </span>
                          </div>
                        </span>
                      </div>
                    }
                    {
                      expandProperties && <div className="hidden-properties">
                        <span className="rent">
                          <div className="property-detail-section">
                            <span className="icon-space">
                              <FontAwesomeIcon icon={faCouch} className="property-icon" />
                            </span>
                            <span className="details-space">
                              <label>Furnishing </label>
                              <p>{item.postDetail?.furnishedType}</p>
                            </span>
                          </div>
                        </span>
                        <span className="rent">
                          <div className="property-detail-section">
                            <span className="icon-space">
                              <FontAwesomeIcon icon={faDoorOpen} className="property-icon" />
                            </span>
                            <span className="details-space">
                              <label>facing </label>
                              <p>{item.facing}</p>
                            </span>
                          </div>
                        </span>
                        <span className="rent">
                          <div className="property-detail-section">
                            <span className="icon-space">
                              <FontAwesomeIcon icon={faFireBurner} className="property-icon" />
                            </span>
                            <span className="details-space">
                              <label>Gas line </label>
                              <p>{postDetail.gasPipeline}</p>
                            </span>
                          </div>
                        </span>
                      </div>
                    }
                    {
                      expandProperties && <div className="hidden-properties">
                        <span className="rent">
                          <div className="property-detail-section">
                            <span className="icon-space">
                              <FontAwesomeIcon icon={faToriiGate} className="property-icon" />
                            </span>
                            <span className="details-space">
                              <label>Gated Community </label>
                              <p>{postDetail.gatedCommunity}</p>
                            </span>
                          </div>
                        </span>
                      </div>
                    }
                  </div>
                  <div className="drop-down-container">
                    <span>
                      <FontAwesomeIcon icon={expandProperties ? faChevronCircleDown : faChevronCircleUp} className="drop-down-icon" onClick={() => setExpandProperties(!expandProperties)} />
                    </span>
                  </div>
                 
                </div>
                </div>
               
                {
                  !(item.postDetail?.amenities === undefined) && Object.keys(postDetail?.amenities).length > 0 && <>
                    <span className="flex">
                    <p className="user-name">Amenities</p>
                    </span>
                   
                      <span className="flex" >
                      <div className="amenities-details">
                        <span className="section">
                          {
                            Object.keys(filteredAmenities).slice(0,amenitiesExpand?Object.keys(filteredAmenities).length:3).map((key) => (
                              <div className="column amenity">
                                <span>
                                  <img src={filteredAmenities[key]} alt="" className="src" />
                                </span>
                                <span>
                                  <p>{key}</p>
                                </span>
                              </div>
                            ))
                          }
                        </span>
                      </div>
                      <div className="flex">
                        <span>
                          <FontAwesomeIcon icon={amenitiesExpand ? faChevronCircleDown : faChevronCircleUp} className="drop-down-icon" onClick={() => setAmenitiesIsExpand(!amenitiesExpand)} />
                        </span>
                      </div>
                      </span>
                  </>
                }
                {
                  !(item.postDetail?.furnishings === undefined || item.postDetail?.furnishings === null ) && Object.keys(postDetail?.furnishings).length > 0 &&
                  <>
                    <div className="flex user-name">
                      Furnishing
                    </div>
                    <div className="flex">
                      <div className="furnishings-container">
                        {
                          Object.keys(postDetail.furnishings).slice(0, expandFurnishings ? Object.keys(postDetail?.furnishings).length : 3).map((key) => (
                            <div className="column">
                              <span>
                                <img src={'/furnishings/' + key + '.png'} alt="" className="furnishing-icon" />
                              </span>
                              <span>
                                <label className="user-name furnishing-lbl">{key}</label>
                              </span>
                            </div>
                          ))
                        }
                      </div>
                      <div style={{ display: 'flex' }} onClick={() => setExpandFurnishings(!expandFurnishings)}>
                        {
                          expandFurnishings ? <FontAwesomeIcon icon={faChevronCircleUp} className="drop-down-icon" /> : <FontAwesomeIcon icon={faChevronCircleDown} className="drop-down-icon" />
                        }
                      </div>
                    </div>
                  </>
                }
                {
                  !(item.postDetail?.amenities) &&  Object.keys(postDetail?.amenities).length < 5  && <div className="padding-sm">
                   <div className="desc-txt" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(postDetail.desc) }}></div>
                  </div>
                }
                <p className="address">
                  <img src="/pin.png" alt="" />
                  <span>{item.address}</span>
                </p>
                {/* <div style={{display:'flex',width:'20%'}}>
            <div  style={{ overflow: 'hidden', whiteSpace: isExpanded ? 'normal' : 'nowrap', textOverflow: 'ellipsis' }} className="desc-container">
                <p className="address" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.postDetail.desc) }}></p>
              </div>
              <div className="expand-btn-container">
              <button  onClick={toggleExpand}>
                {isExpanded ? 'Less...' : 'More...'}
              </button>
              </div>
              
            </div> */}
                <div className="uploaded-time flex">
                  <span className="address">
                  <span className="flex-column hover-scaleUp">
                    <img src={userDetail.avatar} className="user-avatar" />
                    <label className="user-name">{userDetail.username}</label>
                  </span>
                  <span className="flex">
                    <FontAwesomeIcon icon={faClock} style={{ fontSize: '15px', padding: '5px' }} />
                    <p>posted {format(item.postDetail?.createdAt)}</p>
                  </span>
                  <span className="flex">
                    <FontAwesomeIcon icon={faCheck} color="green" style={{ fontSize: '15px', padding: '5px' }} />
                    <p>trusted owner</p>
                  </span>
                  </span>
                  <div className="flex padding-sm" >
                    <span className="flex-column" onClick={switchMode}>
                      <span>
                        <FontAwesomeIcon icon={faVideoCamera} style={{color:houseTour?'orange':'black'}} />
                      </span>
                      <label className="user-name">House tour</label>
                    </span>
                    <span className="flex-column" onClick={switchMode}>
                      <span>
                        <FontAwesomeIcon icon={faNewspaper}  style={{color:readComments?'orange':'black'}} />
                      </span>
                      <label className="user-name">Reviews</label>
                    </span>
                  </div>
                  {
                    !(item.postDetail?.highlightDetails === null || item.postDetail?.highlightDetails === undefined) && <motion.div
                      animate={controlAnimation} className="features highlights-scroll" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                      {
                        Object.entries(item.postDetail.highlightDetails).map(([key, detail]) => (
                          <div key={key} className="feature">
                            <span className="img-container">
                              <img src={'/highlights/' + key + '.png'} alt="" className="highlight-img" />
                            </span>
                            <span className="highlight-details">{detail.name} - {detail.km}</span>
                          </div>
                        ))
                      }
                    </motion.div>
                  }
                </div>
              </div>
            </div>
            <div className="footer-icons-container">
              <span>
                <div className="icon">
                  <FontAwesomeIcon icon={faThumbsUp} />
                </div>
                <div className="icon">
                  <FontAwesomeIcon icon={faShareNodes} />
                </div>
                <div className="icon">
                  <FontAwesomeIcon icon={faComment} />
                </div>
                <div className="icon">
                  <FontAwesomeIcon icon={faBookmark} />
                </div>
              </span>
            </div>
          </Link>
          <div className="extra-detail-container">
              <span className="video-container">
                <ReactPlayer url='https://www.youtube.com/watch?v=YAeAdNmWc2o'  height={'100%'} width={'100%'} controls={true} playIcon={true} />
              </span>
              <div>
            <div>
              <span className="flex padding-sm" style={{ position: 'static' }}>
                <label>Top Comments</label>
              </span>
              <span className="reviews-container pointer" >
                {
                  comments.map((comment) => (
                    <div className="user-comments" key={comment.id}>
                      <img className="avatar-img" src={comment.user.avatar} />
                      <div className="detail-container">
                        <p className="user-name">{comment.user.username}</p>
                        <span className="rating-container">
                          <div className="flex " >
                            <ReactStars
                              count={5}
                              isHalf={true}
                              size={20}
                              edit={false}
                              value={comment.stars}
                              activeColor="#ffd700"
                            />
                            <div>
                              <label className="user-name">{comment.stars}/5</label>
                            </div>
                          </div>
                          <div className="created-date">
                            {format(comment.createdAt)}
                          </div>
                        </span>
                        <div className="comment">
                          <p className="comment-txt">
                            {comment.content}
                          </p>
                        </div>
                        <div className="like-comment-section">
                          <span>
                            <FontAwesomeIcon icon={faThumbsUp} className="icon" />
                          </span>
                          <span><p className="address">17 Likes</p></span>
                          <span><FontAwesomeIcon icon={faComment} className="icon" /></span>
                          <span><p className="address">23 Comments</p></span>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </span>
            </div>
          </div>
          <span className="flex show-more-container pointer" onClick={() => setShowFullComments(!showFullComments)}>
                <span>
                  <p className="user-name">Show full comments</p>
                </span>
                <span>
                  <FontAwesomeIcon icon={faChevronCircleDown} />
                </span>
              </span>
          </div>
         
        </div>
      }
      {
     (item.type == 'booking') && <Link to={`/hotelDetail?hotel_id=${item.id}`}>
          <div className="hotel_card">
            <img src="https://res.cloudinary.com/dynvtl13s/image/upload/v1718504194/posts/x44dge9twe4nl7lxyrvj.jpg" alt="" className="hotel_img" />
            <div className="hotel_desc">
              <div className="hotel_title">Taj corramandal</div>
              <div className="hotel_distance">500 m from center</div>
              <div className="taxi_srv">Free airport taxi</div>
              <div className="hotel_subtitle">
                Studio with air conditioning
              </div>
              <div className="hotel_features">
                Entire studio . 3 bathroom . 21 m2 full bed
              </div>
              <div className="cancel_option">
                Free cancelation
              </div>
              <div className="cancel_op_subtitle">
                You can cancel later , so lock in this great price today !
              </div>

            </div>
            <div className="hotel_details">
              <div className="hotel_ratings">
                <span>Excellent</span>
                <button className="rating-btn">5.5</button>
              </div>
              <div className="detail_texts">
                <span className="hotel_price">£ 123</span>
                <span className="taxi_option">
                  includes taxes and fares
                </span>
                <span className="avl_btn">see availability</span>
              </div>
            </div>
          </div>
        </Link>
      }
    </>
  );
})

export default Card;
