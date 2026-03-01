import React, { createContext, useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { chatService } from '../services/chatService'
import { initSocket, getSocket, disconnectSocket } from '../services/socketService'

export const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth()
  const [rooms, setRooms] = useState([])
  const [activeRoom, setActiveRoom] = useState(null)
  const [messages, setMessages] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated && user) {
      // Initialize socket connection
      initSocket(user)
      
      // Load chat rooms
      loadRooms()
      
      // Load unread count
      loadUnreadCount()
      
      // Socket event listeners
      const socket = getSocket()
      
      socket.on('new_message', (message) => {
        if (activeRoom && message.roomId === activeRoom.id) {
          setMessages(prev => [...prev, message])
        }
        loadRooms()
        loadUnreadCount()
      })
      
      socket.on('message_read', (data) => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === data.messageId ? { ...msg, isRead: true } : msg
          )
        )
      })
      
      return () => {
        socket.off('new_message')
        socket.off('message_read')
        disconnectSocket()
      }
    }
  }, [isAuthenticated, user])

  const loadRooms = async () => {
    try {
      const data = await chatService.getRooms()
      setRooms(data)
    } catch (error) {
      console.error('Failed to load rooms:', error)
    }
  }

  const loadUnreadCount = async () => {
    try {
      const count = await chatService.getUnreadCount()
      setUnreadCount(count)
    } catch (error) {
      console.error('Failed to load unread count:', error)
    }
  }

  const loadMessages = async (roomId, page = 0) => {
    setLoading(true)
    try {
      const data = await chatService.getMessages(roomId, page)
      if (page === 0) {
        setMessages(data.content)
      } else {
        setMessages(prev => [...data.content, ...prev])
      }
      return data
    } catch (error) {
      console.error('Failed to load messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async (roomId, content, media = null) => {
    try {
      const message = await chatService.sendMessage(roomId, content, media)
      setMessages(prev => [...prev, message])
      loadRooms()
      return message
    } catch (error) {
      console.error('Failed to send message:', error)
      throw error
    }
  }

  const markAsRead = async (roomId) => {
    try {
      await chatService.markAsRead(roomId)
      setMessages(prev => 
        prev.map(msg => ({ ...msg, isRead: true }))
      )
      loadUnreadCount()
    } catch (error) {
      console.error('Failed to mark as read:', error)
    }
  }

  const selectRoom = (room) => {
    setActiveRoom(room)
    loadMessages(room.id)
    if (room.unreadCount > 0) {
      markAsRead(room.id)
    }
  }

  return (
    <ChatContext.Provider value={{
      rooms,
      activeRoom,
      messages,
      unreadCount,
      loading,
      loadRooms,
      selectRoom,
      sendMessage,
      markAsRead,
      loadMessages
    }}>
      {children}
    </ChatContext.Provider>
  )
}