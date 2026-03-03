import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useChat } from '../hooks/useChat'
import { useAuth } from '../hooks/useAuth'
import ChatList from '../components/chat/ChatList'
import ChatWindow from '../components/chat/ChatWindow'
import Loader from '../components/common/Loader'

const Chat = () => {
  const [searchParams] = useSearchParams()
  const roomId = searchParams.get('room')
  const { user } = useAuth()
  const { 
    rooms, 
    activeRoom, 
    loading,
    selectRoom,
    loadRooms 
  } = useChat()

  const [showList, setShowList] = useState(!roomId)

  useEffect(() => {
    loadRooms()
  }, [])

  useEffect(() => {
    if (roomId && rooms.length > 0) {
      const room = rooms.find(r => r.id.toString() === roomId)
      if (room) {
        selectRoom(room)
        setShowList(false)
      }
    }
  }, [roomId, rooms])

  if (loading) return <Loader fullScreen />

  return (
    <div className="h-[calc(100vh-64px)] bg-white">
      <div className="flex h-full">
        {/* Chat List - Desktop always visible, mobile toggle */}
        <div className={`
          ${showList ? 'block' : 'hidden'} 
          md:block w-full md:w-80 lg:w-96 border-r
        `}>
          <ChatList 
            rooms={rooms}
            activeRoom={activeRoom}
            onSelectRoom={(room) => {
              selectRoom(room)
              setShowList(false)
            }}
            currentUserId={user?.id}
          />
        </div>

        {/* Chat Window */}
        <div className={`
          ${!showList ? 'block' : 'hidden'} 
          md:block flex-1
        `}>
          {activeRoom ? (
            <ChatWindow 
              room={activeRoom}
              onBack={() => setShowList(true)}
            />
          ) : (
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
          )}
        </div>
      </div>
    </div>
  )
}

export default Chat