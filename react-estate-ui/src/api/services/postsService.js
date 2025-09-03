import apiClient from '../config/apiClient'
import API_ENDPOINTS from '../config/apiConfig'
//import { User } from '../lib/interfaces/interface.models'

export const getPostDetail = (postId)  => {
    alert('service call !!')
    return apiClient.get(API_ENDPOINTS.NEWS_FEED.GET_POST_BY_ID(postId))
}
export const getAllPosts = (query) => {
    return apiClient.get(API_ENDPOINTS.NEWS_FEED.GET_FEED(query))
}
export const getUsersPosts = (userId) => {
    return apiClient.get(API_ENDPOINTS.NEWS_FEED.GET_USER_POSTS(userId))
}
export const addNewsFeedPost = (postData) => {
    return apiClient.post(API_ENDPOINTS.NEWS_FEED.CREATE_POST,postData)
}

