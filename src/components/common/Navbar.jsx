import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useChat } from '../../hooks/useChat'
import { FiLogOut, FiUser, FiPackage, FiMessageCircle, FiMenu, FiX } from 'react-icons/fi'

const Navbar = () => {
  const { user, isAuthenticated, isSeller, logout } = useAuth()
  const { unreadCount } = useChat()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-600">
            Textile B2B
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/marketplace" className="hover:text-primary-600 transition">
              Marketplace
            </Link>

            {isAuthenticated ? (
              <>
                {isSeller && (
                  <>
                    <Link to="/upload" className="hover:text-primary-600 transition">
                      Sell
                    </Link>
                    <Link to="/my-products" className="hover:text-primary-600 transition">
                      <FiPackage size={20} />
                    </Link>
                  </>
                )}
                
                <Link to="/chat" className="hover:text-primary-600 transition relative">
                  <FiMessageCircle size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Link>
                
                <Link to="/profile" className="hover:text-primary-600 transition">
                  <FiUser size={20} />
                </Link>
                
                <button 
                  onClick={handleLogout}
                  className="hover:text-primary-600 transition"
                >
                  <FiLogOut size={20} />
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 hover:text-primary-600"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            <Link 
              to="/marketplace" 
              className="block py-2 hover:text-primary-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Marketplace
            </Link>

            {isAuthenticated ? (
              <>
                {isSeller && (
                  <>
                    <Link 
                      to="/upload" 
                      className="block py-2 hover:text-primary-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sell Product
                    </Link>
                    <Link 
                      to="/my-products" 
                      className="block py-2 hover:text-primary-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Products
                    </Link>
                  </>
                )}
                
                <Link 
                  to="/chat" 
                  className="block py-2 hover:text-primary-600 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Chat
                  {unreadCount > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Link>
                
                <Link 
                  to="/profile" 
                  className="block py-2 hover:text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                
                <button 
                  onClick={() => {
                    handleLogout()
                    setIsMenuOpen(false)
                  }}
                  className="block w-full text-left py-2 hover:text-primary-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="block py-2 text-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar