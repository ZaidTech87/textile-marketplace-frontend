import api from './api'
import { API_ENDPOINTS } from '../utils/constants'

export const productService = {
  // Get all products with filters
  getProducts: async (params) => {
    const response = await api.get(API_ENDPOINTS.PRODUCTS.FEED, { params })
    return response.data
  },

  // Get single product
  getProductById: async (id) => {
    const response = await api.get(API_ENDPOINTS.PRODUCTS.DETAIL(id))
    return response.data
  },

  // Create draft product
  createDraft: async (productData) => {
    const response = await api.post(API_ENDPOINTS.PRODUCTS.CREATE_DRAFT, productData)
    return response.data
  },

  // Upload product images
  uploadImages: async (productId, coverImage, additionalImages = []) => {
    const formData = new FormData()
    formData.append('coverImage', coverImage)
    additionalImages.forEach(img => formData.append('additionalImages', img))
    
    const response = await api.post(
      API_ENDPOINTS.PRODUCTS.UPLOAD_IMAGES(productId), 
      formData, 
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    )
    return response.data
  },

  // Get seller's products
  getMyProducts: async () => {
    const response = await api.get(API_ENDPOINTS.PRODUCTS.MY_PRODUCTS)
    return response.data
  },

  // Update product
  updateProduct: async (id, productData) => {
    const response = await api.put(API_ENDPOINTS.PRODUCTS.DETAIL(id), productData)
    return response.data
  },

  // Delete product
  deleteProduct: async (id) => {
    const response = await api.delete(API_ENDPOINTS.PRODUCTS.DETAIL(id))
    return response.data
  },

  // Search products
  searchProducts: async (keyword, page = 0) => {
    const response = await api.get(API_ENDPOINTS.PRODUCTS.SEARCH, {
      params: { keyword, page }
    })
    return response.data
  },

  // Get nearby products
  getNearbyProducts: async (city, area, page = 0) => {
    const response = await api.get(API_ENDPOINTS.PRODUCTS.NEARBY, {
      params: { city, area, page }
    })
    return response.data
  },

  // Get featured products
  getFeaturedProducts: async () => {
    const response = await api.get(API_ENDPOINTS.PRODUCTS.FEATURED)
    return response.data
  }
}