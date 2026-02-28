import api from './api'
import { API_ENDPOINTS } from '../utils/constants'

export const chatService = {
  // Get or create chat room
  getOrCreateRoom: async (productId) => {
    const response = await api.post(API_ENDPOINTS.CHAT.ROOM(productId))
    return response.data
  },

  // Get user's chat rooms
  getRooms: async () => {
    const response = await api.get(API_ENDPOINTS.CHAT.ROOMS)
    return response.data
  },

  // Get messages for a room
  getMessages: async (roomId, page = 0) => {
    const response = await api.get(API_ENDPOINTS.CHAT.MESSAGES(roomId), {
      params: { page }
    })
    return response.data
  },

  // Send message
  sendMessage: async (roomId, message, media = null) => {
    if (media) {
      const formData = new FormData()
      formData.append('message', message)
      formData.append('media', media)
      
      const response = await api.post(
        API_ENDPOINTS.CHAT.SEND(roomId), 
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )
      return response.data
    } else {
      const response = await api.post(API_ENDPOINTS.CHAT.SEND(roomId), { message })
      return response.data
    }
  },

  // Mark messages as read
  markAsRead: async (roomId) => {
    const response = await api.post(API_ENDPOINTS.CHAT.READ(roomId))
    return response.data
  },

  // Get unread count
  getUnreadCount: async () => {
    const response = await api.get(API_ENDPOINTS.CHAT.UNREAD_COUNT)
    return response.data
  }
}