import React from 'react'
import { Link } from 'react-router-dom'
import { FiMessageCircle, FiHeart } from 'react-icons/fi'
import { formatPrice, formatNumber } from '../../utils/formatters'

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden group">
      <Link to={`/product/${product.id}`}>
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.coverImage || '/default-product.jpg'}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
          
          {/* Quality Badge */}
          {product.qualityGrade && (
            <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              {product.qualityGrade}
            </span>
          )}

          {/* Wishlist Button */}
          <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition">
            <FiHeart className="text-gray-600" />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">
            {product.title}
          </h3>
          
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xl font-bold text-primary-600">
              {formatPrice(product.price, product.priceUnit)}
            </span>
            {product.moq && (
              <span className="text-xs text-gray-500">
                MOQ: {product.moq} {product.priceUnit}
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <span>👁️ {formatNumber(product.views)} views</span>
            <span>💬 {formatNumber(product.chatCount)} chats</span>
          </div>

          {/* Seller Info */}
          <div className="flex items-center pt-3 border-t">
            <img
              src={product.sellerProfileImage || '/default-avatar.png'}
              alt={product.sellerName}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="ml-2 text-sm text-gray-600">
              {product.sellerBusinessName || product.sellerName}
            </span>
            {product.sellerRating > 0 && (
              <span className="ml-auto text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                ⭐ {product.sellerRating.toFixed(1)}
              </span>
            )}
          </div>

          {/* Chat Button */}
          <button className="mt-3 w-full btn-outline text-sm py-2 flex items-center justify-center gap-2">
            <FiMessageCircle />
            Chat with Seller
          </button>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard