import React, { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { getToken, setToken, setUser, removeToken, removeUser } from '../utils/storage'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getToken()
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setUserState(decoded)
      } catch (error) {
        removeToken()
        removeUser()
      }
    }
    setLoading(false)
  }, [])

  const login = (token, userData) => {
    setToken(token)
    setUser(userData)
    setUserState(userData)
  }

  const logout = () => {
    removeToken()
    removeUser()
    setUserState(null)
  }

  const updateUser = (userData) => {
    setUser(userData)
    setUserState(userData)
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout,
      updateUser,
      isAuthenticated: !!user,
      isSeller: user?.userType === 'SELLER',
      isBuyer: user?.userType === 'BUYER'
    }}>
      {children}
    </AuthContext.Provider>
  )
}