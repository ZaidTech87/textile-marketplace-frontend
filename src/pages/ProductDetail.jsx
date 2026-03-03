import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { productService } from '../services/productService'
import { chatService } from '../services/chatService'
import { useAuth } from '../hooks/useAuth'
import Loader from '../components/common/Loader'
import Button from '../components/common/Button'
import toast from 'react-hot-toast'
import { FiMessageCircle, FiHeart, FiShare2 } from 'react-icons/fi'
import { formatPrice, formatDate } from '../utils/formatters'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    try {
      const data = await productService.getProductById(id)
      setProduct(data)
    } catch (error) {
      toast.error('Failed to load product')
      navigate('/marketplace')
    } finally {
      setLoading(false)
    }
  }

  const handleChat = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to chat with seller')
      navigate('/login')
      return
    }

    try {
      const room = await chatService.getOrCreateRoom(product.id)
      navigate(`/chat?room=${room.id}`)
    } catch (error) {
      toast.error('Failed to start chat')
    }
  }

  const handleShare = () => {
    navigator.share?.({
      title: product.title,
      text: product.description,
      url: window.location.href
    }).catch(() => {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    })
  }

  if (loading) return <Loader fullScreen />

  if (!product) return null

  const images = [product.coverImage, ...(product.additionalImages || [])]

  return (
    <div className="container-custom py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-square">
            <img
              src={images[selectedImage] || '/default-product.jpg'}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary-600' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {product.qualityGrade}
            </span>
            <span className="text-gray-500">
              {product.views} views
            </span>
          </div>

          <div className="text-4xl font-bold text-primary-600 mb-4">
            {formatPrice(product.price, product.priceUnit)}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="text-sm text-gray-500">Fabric Type</div>
              <div className="font-medium">{product.fabricType}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">MOQ</div>
              <div className="font-medium">{product.moq} {product.priceUnit}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Stock</div>
              <div className="font-medium">{product.stockQuantity} {product.priceUnit}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Location</div>
              <div className="font-medium">{product.sellerCity}</div>
            </div>
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="flex gap-4 mb-8">
            <Button
              onClick={handleChat}
              className="flex-1 flex items-center justify-center gap-2"
            >
              <FiMessageCircle />
              Chat with Seller
            </Button>
            <Button
              variant="outline"
              onClick={handleShare}
              className="flex items-center justify-center gap-2"
            >
              <FiShare2 />
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2"
            >
              <FiHeart />
            </Button>
          </div>

          {/* Seller Info */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Seller Information</h3>
            <div className="flex items-start gap-4">
              <img
                src={product.sellerProfileImage || '/default-avatar.png'}
                alt={product.sellerName}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold">{product.sellerBusinessName || product.sellerName}</h4>
                <p className="text-gray-600 text-sm mb-2">{product.sellerCity}</p>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">⭐</span>
                  <span>{product.sellerRating?.toFixed(1)}</span>
                  <span className="text-gray-500">({product.sellerTotalReviews} reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Table */}
          <div className="border-t mt-6 pt-6">
            <h3 className="text-lg font-semibold mb-4">Product Details</h3>
            <table className="w-full">
              <tbody className="divide-y">
                <tr>
                  <td className="py-2 text-gray-600">Category</td>
                  <td className="py-2 font-medium">{product.category}</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">Fabric Type</td>
                  <td className="py-2 font-medium">{product.fabricType}</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">Loom Type</td>
                  <td className="py-2 font-medium">{product.loomType || 'Handloom'}</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">Design Pattern</td>
                  <td className="py-2 font-medium">{product.designPattern}</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">Color</td>
                  <td className="py-2 font-medium">{product.color}</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">Width</td>
                  <td className="py-2 font-medium">{product.widthInInches} inches</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">Weight</td>
                  <td className="py-2 font-medium">{product.weightGsm} GSM</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">Listed on</td>
                  <td className="py-2 font-medium">{formatDate(product.createdAt)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail