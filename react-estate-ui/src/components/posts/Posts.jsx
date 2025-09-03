import './Posts.scss'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsersPropertiesRequest } from '../../store/Property/propertySlice';
import { Suspense, useContext, useRef } from "react";
import { useLoaderData, Await, useNavigate } from 'react-router-dom'
import ImageSlider from '../img-slider/imgSlider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faEye, faLocationPin, faMapLocationDot, faMapPin, faShare, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { BHKType } from '../../interfaces/BHKType-interface';
import { fetchLikesRequest, postLikeRequest } from '../../store/Like/likeSlice';
import LikeButton from '../Like-Btn/likeButton';
import LikePopup from '../Like-Popup/likePopup'

const Posts = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsersPropertiesRequest())
  }, [])

  const [usersProperties, setUsersProperties] = useState([])
  const { list, error, loading } = useSelector((state) => state.property)
  console.log('userPosts likes', list.userPosts)
  // const [showLikePopup,setShowLikePopup] = useState(false)
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [likedUsers, setLikedUsers] = useState([])
  const [saved, setSaved] = useState(list.saved)
  const currentUser = useSelector((state) => state.auth.currentUser)
  const likeResponseMsg = useSelector((state) => state.like?.message)
  var likedResponseObj = useSelector((state) => state.like?.response)
  var averageRating = 0.0

  const handleMouseEnter = (event, likes) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setPopupPosition({
      x: rect.left,
      y: rect.top
    })
    setLikedUsers(likes);
    setHovered(true)
  }
  const handleMouseLeave = () => {
    setHovered(false)
  }
  // const handleMouseEnter = () => {
  //   setShowLikePopup(true)
  // }
  // const handleMouseLeave = () => {
  //   setShowLikePopup(false)
  // }

  // if (ratings !== undefined) {
  //   item.ratings = ratings
  // }
  const getAvgRatings = (item) => {
    if (item.ratings !== undefined) {
      averageRating = item.ratings.reduce((acc, rating) => acc + rating.stars, 0) / item.ratings.length || 0;
    }
    return averageRating
  }

  const likePost = (postId) => {
    dispatch(postLikeRequest({ postId, userId: currentUser.id }))
  }
  useEffect(() => {
    if (likeResponseMsg === 'Liked') {
      setSaved((prevItems) =>
        prevItems.map((item) =>
          item.post.id === likedResponseObj.postId
            ? { ...item, likes: [...item.likes, likedResponseObj] }
            : item
        )
      );
    } else if (likeResponseMsg === 'Like removed') {
      setSaved((prev) =>
        prev.map((item) =>
          item.post.id === likedResponseObj.postId
            ? { ...item, likes: item.likes.filter((x) => x.userId !== currentUser.id) }
            : item
        )
      );
    }
  }, [likeResponseMsg, likedResponseObj]);
  //  useEffect(()=>{
  //   
  // },[liked])
  // const likedAlready = (likes)=>{
  //   let x = likes.some((likedBy)=>likedBy.userId==currentUser.id)
  //   alert(x)
  //   return x
  // }

  const sharePost = (postId) => {


  }

  return (
    <Suspense fallback={<p>Loading ...</p>}>
      <Await
        resolve={list.userPosts}
        errorElement={<p>Error loading posts !</p>}
      >
        {
          list.userPosts && list.userPosts.length > 0 && list.userPosts?.map((item, index) => (
            <div className='flex-column justify-space-between margin-sm' key={index}>
              <div className="card">
                <div className="flex justify-space-between">
                  <span>
                    <FontAwesomeIcon icon={faMapPin} color='red' />
                    <label className='font-bold padding-sm'>{item.city}</label>
                  </span>
                  <span className="font-bold hover-scaleUp padding-sm">
                    {item.title}
                  </span>
                  <span className='padding-sm'>
                    "{Object.entries(BHKType).find(([key, value]) => key == item.postDetail?.BHKType)[1]}"
                  </span>
                  <span>
                    {
                      !(getAvgRatings(item).toFixed(1) == 0.0) &&
                      <div id="rating">
                        <button>
                          {getAvgRatings(item).toFixed(1)}
                        </button>
                      </div>
                    }
                  </span>
                </div>
              </div>
              <div className="card margin-sm ">
                <div className="imageContainer width-full">
                  <ImageSlider images={item.images} />
                </div>
                <div className="flex flex-column justify-space-between margin-xs gap-xs">
                  <span style={{ position: 'relative' }} className='like-container pointer' onMouseEnter={(e) => handleMouseEnter(e, item.likes)} onMouseLeave={handleMouseLeave}>
                    <LikeButton onLike={() => likePost(item.id)} likedAlready={item.likes.some((x) => x.userId == currentUser.id)} />
                    <label className='font-xs padding-xs'>{item.likes.length} Likes</label>
                    {hovered && <LikePopup likes={likedUsers} position={popupPosition} onclose={handleMouseLeave} />}
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faComment} className='hover-scaleUp' />
                    <label className='font-xs padding-xs'>{item.comments.length} Comments</label>
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faShare} className='hover-scaleUp' onClick={() => sharePost(item.postId)} />
                    <label className='font-xs padding-xs'>{item.shares.length} Shares</label>
                  </span>
                </div>
              </div>
            </div>
          ))
        }
        {
          list.userPosts && list.userPosts.length == 0 && <div>
            <h2>No Posts</h2>
          </div>
        }
      </Await>
    </Suspense>
  );
};

export default Posts;
