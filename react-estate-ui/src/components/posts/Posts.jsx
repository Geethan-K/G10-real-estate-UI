import './Posts.scss'
import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { fetchUsersPropertiesRequest } from '../../store/Property/propertySlice';
import { Suspense, useContext, useRef } from "react";
import { useLoaderData, Await, useNavigate } from 'react-router-dom'
import ImageSlider from '../img-slider/imgSlider';
const Posts = () => {
  const dispatch = useDispatch()
  const [usersProperties,setUsersProperties]=useState([])
  const {list,error,loading} = useSelector((state)=>state.property)
  const {userPosts} = list
  useEffect(()=>{
    dispatch(fetchUsersPropertiesRequest())
  },[])

  return (
    <div>
      <h2>Posts</h2>
      <Suspense fallback={<p>Loading ...</p>}>
                <Await
                  resolve={userPosts}
                  errorElement={<p>Error loading posts !</p>}
                >
              
                 
                </Await>
              </Suspense>
    </div>
  );
};

export default Posts;
