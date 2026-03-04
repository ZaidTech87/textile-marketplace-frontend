import React from 'react'
import { formatTime } from '../../utils/formatters'
import { FiCheck, FiCheckCircle } from 'react-icons/fi'  // FiCheckDouble ki jagah FiCheckCircle use karo

const ChatMessage = ({ message, isOwn, showAvatar = true }) => {
  const getStatusIcon = () => {
    if (message.isRead) {
      return <FiCheckCircle className="text-blue-500" />  // FiCheckDouble ki jagah FiCheckCircle
    } else if (message.isDelivered) {
      return <FiCheck className="text-gray-400" />  // Single check for delivered
    } else {
      return <FiCheck className="text-gray-300" />  // Single check for sent
    }
  }

  if (message.messageType === 'IMAGE') {
    return (
      <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`flex max-w-[70%] ${isOwn ? 'flex-row-reverse' : ''}`}>
          {showAvatar && !isOwn && (
            <img
              src={message.senderImage || '/default-avatar.png'}
              alt={message.senderName}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0 mr-2"
            />
          )}
          <div>
            <div className={`rounded-lg overflow-hidden ${
              isOwn ? 'bg-primary-600' : 'bg-gray-200'
            }`}>
              <img
                src={message.mediaUrl}
                alt="Shared"
                className="max-w-full max-h-64 object-contain cursor-pointer hover:opacity-90 transition"
                onClick={() => window.open(message.mediaUrl, '_blank')}
              />
            </div>
            <div className={`flex items-center mt-1 text-xs ${
              isOwn ? 'justify-end' : 'justify-start'
            }`}>
              <span className="text-gray-500 mr-1">{formatTime(message.createdAt)}</span>
              {isOwn && getStatusIcon()}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-[70%] ${isOwn ? 'flex-row-reverse' : ''}`}>
        {showAvatar && !isOwn && (
          <img
            src={message.senderImage || '/default-avatar.png'}
            alt={message.senderName}
            className="w-8 h-8 rounded-full object-cover flex-shrink-0 mr-2"
          />
        )}
        <div>
          <div
            className={`px-4 py-2 rounded-lg ${
              isOwn
                ? 'bg-primary-600 text-white rounded-br-none'
                : 'bg-gray-100 text-gray-900 rounded-bl-none'
            }`}
          >
            <p className="text-sm whitespace-pre-wrap break-words">{message.message}</p>
          </div>
          <div className={`flex items-center mt-1 text-xs ${
            isOwn ? 'justify-end' : 'justify-start'
          }`}>
            <span className="text-gray-500 mr-1">{formatTime(message.createdAt)}</span>
            {isOwn && getStatusIcon()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatMessage