import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { productService } from '../services/productService'
import { paymentService } from '../services/paymentService'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import toast from 'react-hot-toast'
import { FiUpload, FiX } from 'react-icons/fi'
import { PRODUCT_CATEGORIES, FABRIC_TYPES, QUALITY_GRADES, PRICE_UNITS } from '../utils/constants'

const ProductUpload = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 1: Form, 2: Payment
  const [loading, setLoading] = useState(false)
  const [productId, setProductId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    fabricType: '',
    qualityGrade: '',
    price: '',
    priceUnit: 'meter',
    moq: 1,
    stockQuantity: 0,
    designPattern: '',
    color: '',
    widthInInches: '',
    weightGsm: ''
  })

  const [coverImage, setCoverImage] = useState(null)
  const [additionalImages, setAdditionalImages] = useState([])

  // Dropzone for cover image
  const { getRootProps: getCoverRootProps, getInputProps: getCoverInputProps } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setCoverImage(acceptedFiles[0])
    }
  })

  // Dropzone for additional images
  const { getRootProps: getAdditionalRootProps, getInputProps: getAdditionalInputProps } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 5,
    onDrop: (acceptedFiles) => {
      setAdditionalImages(prev => [...prev, ...acceptedFiles].slice(0, 5))
    }
  })

  const removeAdditionalImage = (index) => {
    setAdditionalImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    
    if (!coverImage) {
      toast.error('Please upload a cover image')
      return
    }

    setLoading(true)
    try {
      // Create draft product
      const product = await productService.createDraft(formData)
      setProductId(product.id)

      // Upload images
      await productService.uploadImages(product.id, coverImage, additionalImages)
      
      setStep(2)
    } catch (error) {
      toast.error('Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = async () => {
    setLoading(true)
    try {
      // Create Razorpay order
      const order = await paymentService.createOrder(productId)

      // Initialize Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Textile B2B',
        description: 'Product Listing Fee',
        order_id: order.id,
        handler: async (response) => {
          try {
            // Verify payment
            await paymentService.verifyPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            })
            
            toast.success('Payment successful! Your product is now live.')
            navigate('/my-products')
          } catch (error) {
            toast.error('Payment verification failed')
          }
        },
        prefill: {
          contact: '',
          email: ''
        },
        theme: {
          color: '#2563eb'
        }
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      toast.error('Failed to initiate payment')
    } finally {
      setLoading(false)
    }
  }

  if (step === 2) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">💰</div>
          <h2 className="text-2xl font-bold mb-4">Pay ₹9 to List Your Product</h2>
          <p className="text-gray-600 mb-6">
            Your product details have been saved. Pay the listing fee to make it live on the marketplace.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex justify-between mb-2">
              <span>Listing Fee</span>
              <span className="font-semibold">₹9.00</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary-600">₹9.00</span>
            </div>
          </div>
          <Button
            onClick={handlePayment}
            loading={loading}
            fullWidth
            size="lg"
          >
            Pay ₹9 & List Product
          </Button>
          <button
            onClick={() => setStep(1)}
            className="mt-4 text-gray-600 hover:text-gray-800"
          >
            ← Back to Edit
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Upload Product</h1>
      
      <form onSubmit={handleSubmitForm} className="space-y-6">
        {/* Image Upload Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Product Images</h2>
          
          {/* Cover Image */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image *
            </label>
            {!coverImage ? (
              <div
                {...getCoverRootProps()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary-500 transition"
              >
                <input {...getCoverInputProps()} />
                <FiUpload className="mx-auto text-3xl text-gray-400 mb-2" />
                <p className="text-gray-600">Drag & drop cover image here</p>
                <p className="text-sm text-gray-500">or click to browse</p>
              </div>
            ) : (
              <div className="relative w-48">
                <img
                  src={URL.createObjectURL(coverImage)}
                  alt="Cover"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setCoverImage(null)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <FiX />
                </button>
              </div>
            )}
          </div>

          {/* Additional Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Images (Max 5)
            </label>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {additionalImages.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Additional ${index + 1}`}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeAdditionalImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
              
              {additionalImages.length < 5 && (
                <div
                  {...getAdditionalRootProps()}
                  className="border-2 border-dashed border-gray-300 rounded-lg aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-primary-500 transition"
                >
                  <input {...getAdditionalInputProps()} />
                  <FiUpload className="text-2xl text-gray-400 mb-1" />
                  <span className="text-xs text-gray-500">Add Image</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          
          <Input
            label="Product Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g., Pure Banarasi Silk Fabric"
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="input-field"
              placeholder="Describe your product in detail..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Select Category</option>
                {PRODUCT_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fabric Type *
              </label>
              <select
                name="fabricType"
                value={formData.fabricType}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Select Fabric</option>
                {FABRIC_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quality Grade *
              </label>
              <select
                name="qualityGrade"
                value={formData.qualityGrade}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Select Quality</option>
                {QUALITY_GRADES.map(grade => (
                  <option key={grade.id} value={grade.name}>{grade.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Design Pattern
              </label>
              <Input
                name="designPattern"
                value={formData.designPattern}
                onChange={handleChange}
                placeholder="e.g., Floral, Geometric"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color
              </label>
              <Input
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="e.g., Red, Blue"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Width (inches)
              </label>
              <Input
                type="number"
                name="widthInInches"
                value={formData.widthInInches}
                onChange={handleChange}
                placeholder="44"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight (GSM)
              </label>
              <Input
                type="number"
                name="weightGsm"
                value={formData.weightGsm}
                onChange={handleChange}
                placeholder="80"
              />
            </div>
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Pricing & Stock</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price *
              </label>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="1"
                step="0.01"
                placeholder="1200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit *
              </label>
              <select
                name="priceUnit"
                value={formData.priceUnit}
                onChange={handleChange}
                className="input-field"
              >
                {PRICE_UNITS.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                MOQ *
              </label>
              <Input
                type="number"
                name="moq"
                value={formData.moq}
                onChange={handleChange}
                required
                min="1"
                placeholder="10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Quantity *
              </label>
              <Input
                type="number"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                required
                min="0"
                placeholder="50"
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          loading={loading}
          fullWidth
          size="lg"
        >
          Continue to Payment (₹9)
        </Button>
      </form>
    </div>
  )
}

export default ProductUpload