import api from './api'
import { API_ENDPOINTS } from '../utils/constants'

export const userService = {
  // Get current user profile
  getProfile: async () => {
    const response = await api.get(API_ENDPOINTS.USERS.PROFILE)
    return response.data
  },

  // Update profile
  updateProfile: async (userData) => {
    const response = await api.put(API_ENDPOINTS.USERS.UPDATE, userData)
    return response.data
  },

  // Upload profile image
  uploadImage: async (image) => {
    const formData = new FormData()
    formData.append('image', image)
    
    const response = await api.post(API_ENDPOINTS.USERS.IMAGE, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  },

  // Get local sellers
  getLocalSellers: async (city, area) => {
    const response = await api.get(API_ENDPOINTS.USERS.LOCAL_SELLERS, {
      params: { city, area }
    })
    return response.data
  },

  // Get top rated sellers
  getTopRatedSellers: async () => {
    const response = await api.get(API_ENDPOINTS.USERS.TOP_RATED)
    return response.data
  }
}