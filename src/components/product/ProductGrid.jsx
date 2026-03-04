import React from 'react'
import ProductCard from './ProductCard'
import Loader from '../common/Loader'

const ProductGrid = ({ products, loading, hasMore, onLoadMore }) => {
  if (loading && products.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-4">
            <div className="aspect-square bg-gray-200 rounded-lg mb-4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4 animate-pulse" />
            <div className="h-8 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <img 
          src="/empty-state.svg" 
          alt="No products" 
          className="w-48 mx-auto mb-4 opacity-50"
        />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No Products Found
        </h3>
        <p className="text-gray-500">
          Try adjusting your filters or check back later
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="btn-outline px-8 py-3"
          >
            {loading ? 'Loading...' : 'Load More Products'}
          </button>
        </div>
      )}

      {!hasMore && products.length > 0 && (
        <p className="text-center text-gray-500 mt-8">
          You've reached the end of the list
        </p>
      )}
    </div>
  )
}

export default ProductGrid