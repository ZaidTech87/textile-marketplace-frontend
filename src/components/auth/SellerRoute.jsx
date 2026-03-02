import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import toast from 'react-hot-toast'

const SellerRoute = ({ children }) => {
  const { isSeller } = useAuth()

  if (!isSeller) {
    toast.error('This page is only accessible to sellers')
    return <Navigate to="/" />
  }

  return children
}

export default SellerRoute