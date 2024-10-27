import apiClient from '../config/apiClient'
import API_ENDPOINTS from '../config/apiConfig'
//import { User } from '../lib/interfaces/interface.models'

export const postComment = (postData)  => {
    return apiClient.post(API_ENDPOINTS.COMMENT.POST_COMMENT,postData)
}
export const getComments = (postId) => {
    return apiClient.get(API_ENDPOINTS.COMMENT.GET_COMMENTS(postId))
}


