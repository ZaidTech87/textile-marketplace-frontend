import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useChat } from '../../hooks/useChat'
import ChatMessage from './ChatMessage'
import { FiSend, FiPaperclip, FiArrowLeft, FiMoreVertical } from 'react-icons/fi'
import { formatDate } from '../../utils/formatters'
import toast from 'react-hot-toast'

const ChatWindow = ({ room, onBack }) => {
  const { user } = useAuth()
  const { messages, sendMessage, markAsRead, loadMessages, loading } = useChat()
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)

  const isSeller = room?.sellerId === user?.id
  const otherParty = isSeller ? room?.buyer : room?.seller

  useEffect(() => {
    if (room) {
      loadMessages(room.id)
      markAsRead(room.id)
    }
  }, [room])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSend = async (e) => {
    e?.preventDefault()
    
    if (!newMessage.trim() && !fileInputRef.current?.files?.length) return

    setSending(true)
    try {
      await sendMessage(room.id, newMessage)
      setNewMessage('')
    } catch (error) {
      toast.error('Failed to send message')
    } finally {
      setSending(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error('File size should be less than 10MB')
      return
    }

    setSending(true)
    try {
      await sendMessage(room.id, null, file)
    } catch (error) {
      toast.error('Failed to upload file')
    } finally {
      setSending(false)
      e.target.value = '' // Reset file input
    }
  }

  if (!room) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">💬</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Select a conversation
          </h3>
          <p className="text-gray-500">
            Choose a chat from the list to start messaging
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <FiArrowLeft />
          </button>
          
          <img
            src={otherParty?.profileImage || '/default-avatar.png'}
            alt={otherParty?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          
          <div>
            <h3 className="font-semibold">
              {otherParty?.businessName || otherParty?.name || 'User'}
            </h3>
            <p className="text-xs text-gray-500">
              {room?.productTitle}
            </p>
          </div>
        </div>

        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <FiMoreVertical />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {loading && messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <>
            {/* Date Separator Example - You can implement actual date grouping */}
            {messages.length > 0 && (
              <div className="text-center mb-4">
                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                  {formatDate(messages[0].createdAt)}
                </span>
              </div>
            )}

            {messages.map((msg, index) => {
              const prevMsg = index > 0 ? messages[index - 1] : null
              const showAvatar = !prevMsg || prevMsg.senderId !== msg.senderId

              return (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  isOwn={msg.senderId === user?.id}
                  showAvatar={showAvatar}
                />
              )
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 border-t bg-white">
        <div className="flex items-end space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*,.pdf,.doc,.docx"
            className="hidden"
          />
          
          <button
            type="button"
            onClick={handleFileSelect}
            className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition"
            disabled={sending}
          >
            <FiPaperclip size={20} />
          </button>

          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              rows="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              disabled={sending}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>

          <button
            type="submit"
            disabled={(!newMessage.trim() && !fileInputRef.current?.files?.length) || sending}
            className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <FiSend size={20} />
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatWindow