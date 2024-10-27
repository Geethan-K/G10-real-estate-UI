import apiClient from '../config/apiClient'
import API_ENDPOINTS from '../config/apiConfig'
//import { User } from '../lib/interfaces/interface.models'

export const postNotification = (userId)  => {
    return apiClient.get(API_ENDPOINTS.NOTIFICATION.GET(userId))
}
export const getNotifications = (postData) => {
    return apiClient.post(API_ENDPOINTS.NOTIFICATION.SEND,postData)
}


