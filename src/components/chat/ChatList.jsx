import React from 'react'
import { formatDate, formatTime } from '../../utils/formatters'
import { FiMessageCircle } from 'react-icons/fi'

const ChatList = ({ rooms, activeRoom, onSelectRoom, currentUserId, loading }) => {
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (rooms.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        <div className="text-6xl mb-4">💬</div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Conversations Yet</h3>
        <p className="text-sm text-gray-500 mb-4">
          Start chatting with sellers by visiting product pages
        </p>
        <a
          href="/marketplace"
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Browse Marketplace →
        </a>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Messages</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {rooms.map((room) => {
          const isSeller = room.sellerId === currentUserId
          const otherParty = isSeller ? room.buyer : room.seller
          const unreadCount = isSeller ? room.sellerUnreadCount : room.buyerUnreadCount

          return (
            <button
              key={room.id}
              onClick={() => onSelectRoom(room)}
              className={`w-full p-4 flex items-start space-x-3 hover:bg-gray-50 transition border-b ${
                activeRoom?.id === room.id ? 'bg-primary-50' : ''
              }`}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={otherParty?.profileImage || '/default-avatar.png'}
                  alt={otherParty?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-900 truncate">
                    {otherParty?.businessName || otherParty?.name || 'User'}
                  </h3>
                  {room.lastMessageTime && (
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {formatTime(room.lastMessageTime)}
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 truncate mb-1">
                  {room.productTitle}
                </p>

                <p className="text-sm text-gray-500 truncate">
                  {room.lastMessage || 'No messages yet'}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ChatList