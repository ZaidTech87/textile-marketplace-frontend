import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiCheckCircle, FiPackage, FiHome } from 'react-icons/fi'

const PaymentSuccess = () => {
  const location = useLocation()
  const { productId, orderId } = location.state || {}

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <FiCheckCircle className="text-4xl text-green-600" />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Your product has been successfully listed on the marketplace.
        </p>

        {/* Payment Details */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
          <div className="text-sm text-gray-600 mb-2">Payment Details:</div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-mono text-sm">{orderId || 'ORD123456'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-semibold">₹9.00 + GST</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {productId ? (
            <Link
              to={`/product/${productId}`}
              className="btn-primary flex items-center justify-center gap-2 w-full"
            >
              <FiPackage />
              View Your Product
            </Link>
          ) : (
            <Link
              to="/my-products"
              className="btn-primary flex items-center justify-center gap-2 w-full"
            >
              <FiPackage />
              Go to My Products
            </Link>
          )}
          
          <Link
            to="/"
            className="btn-outline flex items-center justify-center gap-2 w-full"
          >
            <FiHome />
            Back to Home
          </Link>
        </div>

        {/* Next Steps */}
        <div className="mt-6 pt-6 border-t">
          <h3 className="font-medium mb-3">What's Next?</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>✓ Your product is now live on marketplace</li>
            <li>✓ Buyers can now chat with you</li>
            <li>✓ You'll get notifications for inquiries</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess