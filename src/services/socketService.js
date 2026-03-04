// src/services/socketService.jsx
import { io } from 'socket.io-client'

let socket = null
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:8080/ws'

export const initSocket = (user) => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ['websocket'],
      query: {
        userId: user?.id,
        userType: user?.userType
      }
    })

    socket.on('connect', () => {
      console.log('✅ Socket connected')
    })

    socket.on('disconnect', () => {
      console.log('❌ Socket disconnected')
    })

    socket.on('error', (error) => {
      console.error('Socket error:', error)
    })
  }
  return socket
}

export const getSocket = () => socket

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

export default {
  initSocket,
  getSocket,
  disconnectSocket
}