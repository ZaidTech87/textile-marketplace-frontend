import React, { useState } from 'react'
import ProductGrid from '../components/product/ProductGrid'
import ProductFilters from '../components/product/ProductFilters'
import { useProducts } from '../hooks/useProducts'

const Marketplace = () => {
  const [showFilters, setShowFilters] = useState(false)
  const { 
    products, 
    loading, 
    hasMore, 
    loadMore,
    updateParams,
    params 
  } = useProducts()

  const handleFilterChange = (filters) => {
    updateParams({ ...filters, page: 0 })
  }

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden btn-outline"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block md:w-64`}>
          <ProductFilters 
            onFilterChange={handleFilterChange}
            currentFilters={params}
          />
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