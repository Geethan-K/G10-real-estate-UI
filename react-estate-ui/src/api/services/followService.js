import apiClient from '../config/apiClient'
import API_ENDPOINTS from '../config/apiConfig'
//import { User } from '../lib/interfaces/interface.models'

export const followUser = (postData)  => {
    return apiClient.post(API_ENDPOINTS.FOLLOW.FOLLOW_USER,postData)
}
export const unfollowUser = (postData) => {
    return apiClient.post(API_ENDPOINTS.FOLLOW.UNFOLLOW_USER,postData)
}
export const isFollowing = (userId,followingId) => {
    return apiClient.get(API_ENDPOINTS.FOLLOW.IS_FOLLOWING(userId,followingId))
}
export const getFollowers = (userId) => {
    return apiClient.get(API_ENDPOINTS.FOLLOW.GET_FOLLOWERS(userId))
}
export const getFollowings = (userId) => {
    return apiClient.get(API_ENDPOINTS.FOLLOW.GET_FOLLOWINGS(userId))
}



