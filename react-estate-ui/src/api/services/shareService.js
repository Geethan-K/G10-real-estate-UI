import apiClient from '../config/apiClient'
import API_ENDPOINTS from '../config/apiConfig'
//import { User } from '../lib/interfaces/interface.models'

export const sharePost = (postData)  => {
    return apiClient.post(API_ENDPOINTS.SHARE.SHARE_POST,postData)
}
export const getSharedCount = (postId) => {
    return apiClient.get(API_ENDPOINTS.SHARE.GET_SHARED_COUNT(postId))
}


