import apiClient from '../config/apiClient'
import API_ENDPOINTS from '../config/apiConfig'
//import { User } from '../lib/interfaces/interface.models'

export const getNewsFeed = (userId)  => {
    return apiClient.get(API_ENDPOINTS.NEWS_FEED.GET_FEED(userId))
}
export const getUserPosts = (userId) => {
    return apiClient.get(API_ENDPOINTS.NEWS_FEED.GET_USER_POSTS(userId))
}
export const createPost = (postData) => {
    return apiClient.post(API_ENDPOINTS.NEWS_FEED.CREATE_POST,postData)
}

