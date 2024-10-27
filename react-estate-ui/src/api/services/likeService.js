import apiClient from '../config/apiClient'
import API_ENDPOINTS from '../config/apiConfig'
//import { User } from '../lib/interfaces/interface.models'

export const like = (postData)  => {
    return apiClient.post(API_ENDPOINTS.LIKE.LIKE,postData)
}
export const getLikesCount = (postId) => {
    return apiClient.get(API_ENDPOINTS.LIKE.GET_LIKES(postId))
}


