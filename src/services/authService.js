import api from './api'
import { API_ENDPOINTS } from '../utils/constants'

export const authService = {
  sendOtp: async (mobileNumber, userType) => {
    const response = await api.post(API_ENDPOINTS.AUTH.SEND_OTP, { 
      mobileNumber, 
      userType 
    })
    return response.data
  },

  verifyOtp: async (mobileNumber, otpCode) => {
    const response = await api.post(API_ENDPOINTS.AUTH.VERIFY_OTP, { 
      mobileNumber, 
      otpCode 
    })
    return response.data
  },

  refreshToken: async (refreshToken) => {
    const response = await api.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, null, {
      headers: { Authorization: `Bearer ${refreshToken}` }
    })
    return response.data
  },

  logout: async () => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGOUT)
    return response.data
  }
}