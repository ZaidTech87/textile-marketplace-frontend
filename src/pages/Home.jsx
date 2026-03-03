import React from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/product/ProductCard'
import Loader from '../components/common/Loader'

const Home = () => {
  const { products, loading } = useProducts({ page: 0, size: 8 })

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Connect with Local Textile Weavers
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              Direct B2B marketplace for authentic handloom and textile products
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/marketplace"
                className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
              >
                Browse Products
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition"
              >
                Start Selling
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container-custom py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/marketplace"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition inline-block"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Silk', icon: '🧵', color: 'bg-red-100', query: 'silk' },
              { name: 'Cotton', icon: '👕', color: 'bg-blue-100', query: 'cotton' },
              { name: 'Linen', icon: '🧶', color: 'bg-green-100', query: 'linen' },
              { name: 'Wool', icon: '🧣', color: 'bg-yellow-100', query: 'wool' },
              { name: 'Saree', icon: '👗', color: 'bg-purple-100', query: 'saree' },
              { name: 'Prints', icon: '🎨', color: 'bg-pink-100', query: 'print' },
            ].map((category, index) => (
              <Link
                key={index}
                to={`/marketplace?fabricType=${category.query}`}
                className={`${category.color} p-6 rounded-lg text-center hover:shadow-lg transition`}
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <div className="font-medium">{category.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container-custom py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">1️⃣</span>
            </div>
            <h3 className="text-xl font-bold mb-2">For Buyers</h3>
            <p className="text-gray-600">
              Browse products, chat with sellers, and place orders directly
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">2️⃣</span>
            </div>
            <h3 className="text-xl font-bold mb-2">For Sellers</h3>
            <p className="text-gray-600">
              List your products for just ₹9 and reach genuine buyers
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">3️⃣</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Connect Directly</h3>
            <p className="text-gray-600">
              Real-time chat for direct communication and negotiation
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary-50 py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600">500+</div>
              <div className="text-gray-600">Active Sellers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600">5000+</div>
              <div className="text-gray-600">Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600">50+</div>
              <div className="text-gray-600">Cities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600">10k+</div>
              <div className="text-gray-600">Happy Buyers</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home