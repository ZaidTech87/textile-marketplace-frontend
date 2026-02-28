import axios from 'axios'
import { getToken, clearStorage } from '../utils/storage'
import toast from 'react-hot-toast'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      const { status, data } = error.response
      
      if (status === 401) {
        clearStorage()
        window.location.href = '/login'
        toast.error('Session expired. Please login again.')
      } else if (status === 403) {
        toast.error('You do not have permission to perform this action')
      } else if (status === 404) {
        toast.error('Resource not found')
      } else if (status === 500) {
        toast.error('Server error. Please try again later.')
      } else if (data?.message) {
        toast.error(data.message)
      }
    } else if (error.request) {
      // Request made but no response
      toast.error('Network error. Please check your connection.')
    } else {
      // Something else happened
      toast.error('An error occurred. Please try again.')
    }
    
    return Promise.reject(error)
  }
)

export default api