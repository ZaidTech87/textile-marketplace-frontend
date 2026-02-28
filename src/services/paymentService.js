import api from './api'
import { API_ENDPOINTS } from '../utils/constants'

export const paymentService = {
  // Create order for listing fee
  createOrder: async (productId) => {
    const response = await api.post(API_ENDPOINTS.PAYMENTS.CREATE_ORDER(productId))
    return response.data
  },

  // Verify payment
  verifyPayment: async (paymentData) => {
    const response = await api.post(API_ENDPOINTS.PAYMENTS.VERIFY, paymentData)
    return response.data
  },

  // Get payment status
  getPaymentStatus: async (orderId) => {
    const response = await api.get(API_ENDPOINTS.PAYMENTS.STATUS(orderId))
    return response.data
  },

  // Get payment by product
  getPaymentByProduct: async (productId) => {
    const response = await api.get(API_ENDPOINTS.PAYMENTS.PRODUCT_PAYMENT(productId))
    return response.data
  },

  // Initialize Razorpay payment
  initRazorpay: (options) => {
    return new Promise((resolve, reject) => {
      const razorpay = new window.Razorpay({
        ...options,
        handler: (response) => {
          resolve(response)
        },
        modal: {
          ondismiss: () => {
            reject(new Error('Payment cancelled'))
          }
        }
      })
      razorpay.open()
    })
  }
}