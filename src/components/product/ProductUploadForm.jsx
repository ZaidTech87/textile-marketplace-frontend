import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { productService } from '../../services/productService'
import Button from '../common/Button'
import Input from '../common/Input'
import toast from 'react-hot-toast'
import { FiUpload, FiX } from 'react-icons/fi'
import { PRODUCT_CATEGORIES, FABRIC_TYPES, QUALITY_GRADES, PRICE_UNITS } from '../../utils/constants'

const ProductUploadForm = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
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
  const [coverPreview, setCoverPreview] = useState('')
  const [additionalPreviews, setAdditionalPreviews] = useState([])

  // Cover image dropzone
  const { getRootProps: getCoverRootProps, getInputProps: getCoverInputProps } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]
      setCoverImage(file)
      setCoverPreview(URL.createObjectURL(file))
    }
  })

  // Additional images dropzone
  const { getRootProps: getAdditionalRootProps, getInputProps: getAdditionalInputProps } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 5,
    onDrop: (acceptedFiles) => {
      const newFiles = [...additionalImages, ...acceptedFiles].slice(0, 5)
      setAdditionalImages(newFiles)
      
      const newPreviews = newFiles.map(file => URL.createObjectURL(file))
      setAdditionalPreviews(newPreviews)
    }
  })

  const removeAdditionalImage = (index) => {
    const newImages = additionalImages.filter((_, i) => i !== index)
    const newPreviews = additionalPreviews.filter((_, i) => i !== index)
    
    setAdditionalImages(newImages)
    setAdditionalPreviews(newPreviews)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!coverImage) {
      toast.error('Please upload a cover image')
      return
    }

    if (!formData.title) {
      toast.error('Please enter product title')
      return
    }

    if (!formData.price) {
      toast.error('Please enter price')
      return
    }

    setLoading(true)
    try {
      // Create draft product
      const product = await productService.createDraft(formData)

      // Upload images
      await productService.uploadImages(product.id, coverImage, additionalImages)
      
      toast.success('Product created successfully!')
      navigate(`/payment/${product.id}`)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
                src={coverPreview}
                alt="Cover"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  setCoverImage(null)
                  setCoverPreview('')
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
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
            {additionalPreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Additional ${index + 1}`}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeAdditionalImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
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
          label="Product Title *"
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
              Price * (₹)
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

      {/* Submit Button */}
      <Button
        type="submit"
        loading={loading}
        fullWidth
        size="lg"
      >
        Continue to Payment (₹9)
      </Button>
    </form>
  )
}

export default ProductUploadForm