import apiClient from '../config/apiClient'
import API_ENDPOINTS from '../config/apiConfig'
//import { User } from '../lib/interfaces/interface.models'

export const getChats = ()  => {
    return apiClient.get(API_ENDPOINTS.CHATS.GET_ALL_CHATS)
}
export const getChat = (id) => {
    return apiClient.get(API_ENDPOINTS.CHATS.GET_CHAT(id))
}
export const getReceiverStatus = (receiverId) => {
    return apiClient.get(API_ENDPOINTS.CHATS.GET_RECEIVER_STATUS(receiverId))
}
export const updateSeenBy = (id) => {
    return apiClient.put(API_ENDPOINTS.CHATS.UPDATE_SEEN_BY(id))
}





