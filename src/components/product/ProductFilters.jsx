import React, { useState } from 'react'
import { FiFilter, FiX } from 'react-icons/fi'
import { PRODUCT_CATEGORIES, FABRIC_TYPES, QUALITY_GRADES } from '../../utils/constants'

const ProductFilters = ({ onFilterChange, currentFilters = {} }) => {
  const [filters, setFilters] = useState({
    category: currentFilters.category || '',
    fabricType: currentFilters.fabricType || '',
    qualityGrade: currentFilters.qualityGrade || '',
    minPrice: currentFilters.minPrice || '',
    maxPrice: currentFilters.maxPrice || '',
    city: currentFilters.city || '',
    area: currentFilters.area || ''
  })

  const [isExpanded, setIsExpanded] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const handleApply = () => {
    onFilterChange(filters)
  }

  const handleReset = () => {
    const resetFilters = {
      category: '',
      fabricType: '',
      qualityGrade: '',
      minPrice: '',
      maxPrice: '',
      city: '',
      area: ''
    }
    setFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FiFilter className="text-gray-500" />
          <h3 className="font-semibold">Filters</h3>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-700 md:hidden"
        >
          {isExpanded ? <FiX /> : 'Expand'}
        </button>
      </div>

      {/* Filters Content */}
      <div className={`space-y-4 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {PRODUCT_CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Fabric Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fabric Type
          </label>
          <select
            name="fabricType"
            value={filters.fabricType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Fabrics</option>
            {FABRIC_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Quality Grade */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quality
          </label>
          <select
            name="qualityGrade"
            value={filters.qualityGrade}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Qualities</option>
            {QUALITY_GRADES.map(grade => (
              <option key={grade.id} value={grade.name}>{grade.name}</option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Range (₹)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
              placeholder="Min"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="0"
            />
            <span>-</span>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              placeholder="Max"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="0"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            name="city"
            value={filters.city}
            onChange={handleChange}
            placeholder="e.g., Varanasi"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Local Area
          </label>
          <input
            type="text"
            name="area"
            value={filters.area}
            onChange={handleChange}
            placeholder="e.g., Chowk"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <button
            onClick={handleApply}
            className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
          >
            Apply Filters
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductFilters
