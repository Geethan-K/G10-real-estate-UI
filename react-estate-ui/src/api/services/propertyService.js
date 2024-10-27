import apiClient from '../config/apiClient'
import API_ENDPOINTS from '../config/apiConfig'
//import { User } from '../lib/interfaces/interface.models'

export const getPostDetail = (postId)  => {
    alert('service call !!')
    return apiClient.get(API_ENDPOINTS.PROPERTY.GET_POST(postId))
}
export const getPosts = (query) => {
    return apiClient.get(API_ENDPOINTS.PROPERTY.GET_POSTS(query))
}
export const getUsersProperties = () => {
    return apiClient.get(API_ENDPOINTS.PROPERTY.GET_USERS_POSTS)
}
export const addNewProperty = (postData) => {
    return apiClient.post(API_ENDPOINTS.PROPERTY.ADD,postData)
}

