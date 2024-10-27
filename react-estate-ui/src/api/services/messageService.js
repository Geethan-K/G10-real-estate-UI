import apiClient from '../config/apiClient'
import API_ENDPOINTS from '../config/apiConfig'
//import { User } from '../lib/interfaces/interface.models'

export const sendMessage = (postData)  => {
    return apiClient.post(API_ENDPOINTS.MESSAGE.SEND,postData)
}
export const searchMessage = (userId,postData) => {
    return apiClient.post(API_ENDPOINTS.MESSAGE.SEARCH(userId),postData)
}

