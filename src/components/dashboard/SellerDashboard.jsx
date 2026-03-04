import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { productService } from '../../services/productService'
import { chatService } from '../../services/chatService'
import StatsCard from './StatsCard'
import Loader from '../common/Loader'
import { formatPrice, formatNumber } from '../../utils/formatters'
import { FiPackage, FiMessageCircle, FiEye, FiTrendingUp } from 'react-icons/fi'

const SellerDashboard = () => {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalViews: 0,
    totalChats: 0,
    unreadMessages: 0,
    recentProducts: [],
    recentChats: []
  })

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [products, chats, unreadCount] = await Promise.all([
        productService.getMyProducts(),
        chatService.getRooms(),
        chatService.getUnreadCount()
      ])

      const totalViews = products.reduce((sum, p) => sum + (p.views || 0), 0)
      const activeProducts = products.filter(p => p.status === 'ACTIVE')

      setStats({
        totalProducts: activeProducts.length,
        totalViews,
        totalChats: chats.length,
        unreadMessages: unreadCount,
        recentProducts: products.slice(0, 5),
        recentChats: chats.slice(0, 5)
      })
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Seller Dashboard</h1>
        <p className="text-primary-100">
          Manage your products and connect with buyers
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Products"
          value={stats.totalProducts}
          icon={<FiPackage />}
          color="blue"
          link="/my-products"
          linkText="View All"
        />
        <StatsCard
          title="Total Views"
          value={formatNumber(stats.totalViews)}
          icon={<FiEye />}
          color="green"
        />
        <StatsCard
          title="Total Chats"
          value={stats.totalChats}
          icon={<FiMessageCircle />}
          color="purple"
          link="/chat"
          linkText="View Chats"
        />
        <StatsCard
          title="Unread Messages"
          value={stats.unreadMessages}
          icon={<FiTrendingUp />}
          color="red"
          link="/chat"
          linkText="Check Now"
        />
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Products</h2>
          <Link to="/my-products" className="text-primary-600 hover:text-primary-700 text-sm">
            View All →
          </Link>
        </div>

        {stats.recentProducts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No products yet</p>
            <Link to="/upload" className="btn-primary">
              Add Your First Product
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {stats.recentProducts.map(product => (
              <div key={product.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition">
                <div className="flex items-center space-x-3">
                  <img
                    src={product.coverImage || '/default-product.jpg'}
                    alt={product.title}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium">{product.title}</h3>
                    <p className="text-sm text-gray-500">
                      {formatPrice(product.price, product.priceUnit)} • {product.views} views
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    product.status === 'ACTIVE' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {product.status}
                  </span>
                  <Link
                    to={`/product/${product.id}`}
                    className="p-2 text-gray-600 hover:text-primary-600"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Chats */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Conversations</h2>
          <Link to="/chat" className="text-primary-600 hover:text-primary-700 text-sm">
            View All →
          </Link>
        </div>

        {stats.recentChats.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No conversations yet</p>
        ) : (
          <div className="space-y-3">
            {stats.recentChats.map(chat => (
              <Link
                key={chat.id}
                to={`/chat?room=${chat.id}`}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={chat.buyerImage || '/default-avatar.png'}
                    alt={chat.buyerName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{chat.buyerName}</h3>
                    <p className="text-sm text-gray-500">
                      {chat.productTitle} • {chat.lastMessage}
                    </p>
                  </div>
                </div>
                {chat.unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {chat.unreadCount} new
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/upload"
          className="bg-primary-50 p-4 rounded-lg text-center hover:bg-primary-100 transition"
        >
          <div className="text-2xl mb-2">➕</div>
          <h3 className="font-medium">Add New Product</h3>
          <p className="text-sm text-gray-600">List a new product for ₹9</p>
        </Link>
        <Link
          to="/my-products"
          className="bg-green-50 p-4 rounded-lg text-center hover:bg-green-100 transition"
        >
          <div className="text-2xl mb-2">📦</div>
          <h3 className="font-medium">Manage Products</h3>
          <p className="text-sm text-gray-600">Edit or update your listings</p>
        </Link>
        <Link
          to="/profile"
          className="bg-purple-50 p-4 rounded-lg text-center hover:bg-purple-100 transition"
        >
          <div className="text-2xl mb-2">⚙️</div>
          <h3 className="font-medium">Profile Settings</h3>
          <p className="text-sm text-gray-600">Update business details</p>
        </Link>
      </div>
    </div>
  )
}

export default SellerDashboard