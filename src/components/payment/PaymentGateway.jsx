import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { paymentService } from '../../services/paymentService'
import Button from '../common/Button'
import toast from 'react-hot-toast'

const PaymentGateway = ({ productId, amount = 9, onSuccess }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)
    try {
      // Create Razorpay order
      const order = await paymentService.createOrder(productId)

      // Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Textile B2B',
        description: 'Product Listing Fee',
        image: '/logo.png',
        order_id: order.id,
        handler: async (response) => {
          try {
            // Verify payment
            await paymentService.verifyPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              paymentMethod: 'UPI/Card'
            })

            toast.success('Payment successful!')
            
            if (onSuccess) {
              onSuccess()
            } else {
              navigate('/payment/success', { 
                state: { productId, orderId: response.razorpay_order_id }
              })
            }
          } catch (error) {
            toast.error('Payment verification failed')
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        theme: {
          color: '#2563eb'
        },
        modal: {
          ondismiss: () => {
            setLoading(false)
          }
        }
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      toast.error('Failed to initiate payment')
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Payment Details</h2>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Listing Fee</span>
          <span className="font-semibold">₹{amount}.00</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">GST (18%)</span>
          <span className="font-semibold">₹{(amount * 0.18).toFixed(2)}</span>
        </div>
        <div className="border-t pt-2 mt-2 flex justify-between font-bold">
          <span>Total</span>
          <span className="text-primary-600">₹{(amount * 1.18).toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-4">
        <Button
          onClick={handlePayment}
          loading={loading}
          fullWidth
          size="lg"
        >
          Pay ₹{(amount * 1.18).toFixed(2)} via Razorpay
        </Button>

        <p className="text-xs text-center text-gray-500">
          🔒 Secure payment powered by Razorpay
        </p>
      </div>

      <div className="mt-6 pt-6 border-t">
        <h3 className="font-medium mb-3">We Accept:</h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-gray-100 rounded text-sm">UPI</span>
          <span className="px-2 py-1 bg-gray-100 rounded text-sm">Credit Card</span>
          <span className="px-2 py-1 bg-gray-100 rounded text-sm">Debit Card</span>
          <span className="px-2 py-1 bg-gray-100 rounded text-sm">Net Banking</span>
          <span className="px-2 py-1 bg-gray-100 rounded text-sm">Wallet</span>
        </div>
      </div>
    </div>
  )
}

export default PaymentGateway