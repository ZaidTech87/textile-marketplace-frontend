import { useState, useEffect } from 'react'
import { productService } from '../services/productService'

export const useProducts = (initialParams = {}) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const [params, setParams] = useState(initialParams)

  useEffect(() => {
    loadProducts(true)
  }, [params])

  const loadProducts = async (reset = false) => {
    setLoading(true)
    try {
      const currentPage = reset ? 0 : page
      const response = await productService.getProducts({
        page: currentPage,
        ...params
      })
      
      if (reset) {
        setProducts(response.content)
        setPage(1)
      } else {
        setProducts(prev => [...prev, ...response.content])
        setPage(prev => prev + 1)
      }
      
      setHasMore(!response.last)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    if (!loading && hasMore) {
      loadProducts()
    }
  }

  const updateParams = (newParams) => {
    setParams(prev => ({ ...prev, ...newParams }))
  }

  const resetParams = () => {
    setParams(initialParams)
  }

  return {
    products,
    loading,
    error,
    hasMore,
    loadMore,
    updateParams,
    resetParams,
    params
  }
}