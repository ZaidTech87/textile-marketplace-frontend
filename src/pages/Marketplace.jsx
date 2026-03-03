import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/product/ProductGrid'
import ProductFilters from '../components/product/ProductFilters'
import { useProducts } from '../hooks/useProducts'
import { FiFilter } from 'react-icons/fi'

const Marketplace = () => {
  const [searchParams] = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  
  // Get filter params from URL
  const initialFilters = {
    category: searchParams.get('category') || '',
    fabricType: searchParams.get('fabricType') || '',
    qualityGrade: searchParams.get('qualityGrade') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    city: searchParams.get('city') || '',
    area: searchParams.get('area') || ''
  }

  const { 
    products, 
    loading, 
    hasMore, 
    loadMore,
    updateParams,
    params,
    totalElements 
  } = useProducts(initialFilters)

  const handleFilterChange = (filters) => {
    updateParams({ ...filters, page: 0 })
    setShowFilters(false)
  }

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
          <p className="text-gray-600">
            {totalElements > 0 ? `${totalElements} products available` : 'Loading...'}
          </p>
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden btn-outline flex items-center gap-2 mt-4 md:mt-0"
        >
          <FiFilter />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block md:w-80 lg:w-96`}>
          <div className="sticky top-24">
            <ProductFilters 
              onFilterChange={handleFilterChange}
              currentFilters={params}
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <ProductGrid 
            products={products}
            loading={loading}
            hasMore={hasMore}
            onLoadMore={loadMore}
          />
        </div>
      </div>
    </div>
  )
}

export default Marketplace