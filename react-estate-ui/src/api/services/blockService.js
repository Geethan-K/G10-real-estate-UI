import apiClient from '../config/apiClient'
import API_ENDPOINTS from '../config/apiConfig'
//import { User } from '../lib/interfaces/interface.models'

export const blockUser = (postData)  => {
    return apiClient.post(API_ENDPOINTS.BLOCK.BLOCK_USER,postData)
}
export const getBlockedUsers = (userId) => {
    return apiClient.get(API_ENDPOINTS.BLOCK.GET_BLOCKED_USERS(userId))
}


