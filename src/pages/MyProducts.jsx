import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { productService } from '../services/productService'
import Loader from '../components/common/Loader'
import Button from '../components/common/Button'
import toast from 'react-hot-toast'
import { FiEdit2, FiTrash2, FiEye } from 'react-icons/fi'
import { formatPrice, formatDate } from '../utils/formatters'

const MyProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const data = await productService.getMyProducts()
      setProducts(data)
    } catch (error) {
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return
    }

    setDeletingId(id)
    try {
      await productService.deleteProduct(id)
      setProducts(prev => prev.filter(p => p.id !== id))
      toast.success('Product deleted successfully')
    } catch (error) {
      toast.error('Failed to delete product')
    } finally {
      setDeletingId(null)
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      ACTIVE: { color: 'bg-green-100 text-green-800', text: 'Active' },
      PENDING_PAYMENT: { color: 'bg-yellow-100 text-yellow-800', text: 'Pending Payment' },
      INACTIVE: { color: 'bg-gray-100 text-gray-800', text: 'Inactive' },
      SOLD: { color: 'bg-blue-100 text-blue-800', text: 'Sold' }
    }
    const config = statusConfig[status] || statusConfig.INACTIVE
    return <span className={`badge ${config.color}`}>{config.text}</span>
  }

  if (loading) return <Loader fullScreen />

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Products</h1>
        <Link to="/upload" className="btn-primary">
          + Add New Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <img 
            src="/empty-state.svg" 
            alt="No products" 
            className="w-48 mx-auto mb-4 opacity-50"
          />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No Products Yet
          </h3>
          <p className="text-gray-500 mb-6">
            Start by uploading your first product
          </p>
          <Link to="/upload" className="btn-primary inline-block">
            Upload Product
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Listed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={product.coverImage || '/default-product.jpg'}
                          alt={product.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {product.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.fabricType} • {product.qualityGrade}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">
                        {formatPrice(product.price, product.priceUnit)}
                      </div>
                      <div className="text-sm text-gray-500">
                        MOQ: {product.moq} {product.priceUnit}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {product.stockQuantity} {product.priceUnit}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(product.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <FiEye className="mr-1 text-gray-400" />
                        {product.views}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(product.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Link
                          to={`/product/${product.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          <FiEye />
                        </Link>
                        <Link
                          to={`/edit-product/${product.id}`}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                        >
                          <FiEdit2 />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          disabled={deletingId === product.id}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                        >
                          {deletingId === product.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600" />
                          ) : (
                            <FiTrash2 />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyProducts