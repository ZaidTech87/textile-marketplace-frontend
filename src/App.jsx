import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import PrivateRoute from './components/auth/PrivateRoute'
import SellerRoute from './components/auth/SellerRoute'

// Pages
import Home from './pages/Home'
import Marketplace from './pages/Marketplace'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
import ProductUpload from './pages/ProductUpload'
import MyProducts from './pages/MyProducts'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

// Hooks
import { useAuth } from './hooks/useAuth'
import './App.css'

function App() {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route path="/upload" element={
            <PrivateRoute>
              <SellerRoute>
                <ProductUpload />
              </SellerRoute>
            </PrivateRoute>
          } />
          
          <Route path="/my-products" element={
            <PrivateRoute>
              <SellerRoute>
                <MyProducts />
              </SellerRoute>
            </PrivateRoute>
          } />
          
          <Route path="/chat" element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          } />
          
          <Route path="/chat/:roomId" element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          } />
          
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App