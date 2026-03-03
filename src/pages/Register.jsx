import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import toast from 'react-hot-toast'
import { authService } from '../services/authService'
import { USER_TYPES } from '../utils/constants'
import { validateMobile } from '../utils/validators'

const Register = () => {
  const navigate = useNavigate()
  const [mobile, setMobile] = useState('')
  const [userType, setUserType] = useState(USER_TYPES.BUYER)
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    if (!validateMobile(mobile)) {
      toast.error('Please enter valid 10-digit mobile number')
      return
    }

    setLoading(true)
    try {
      await authService.sendOtp(mobile, userType)
      navigate('/verify-otp', { 
        state: { mobile, userType, isNewUser: true } 
      })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary-600">Textile B2B</h2>
          <p className="text-gray-600 mt-2">Create your account</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number
          </label>
          <PhoneInput
            country={'in'}
            value={mobile}
            onChange={setMobile}
            inputStyle={{ 
              width: '100%', 
              height: '45px',
              fontSize: '16px'
            }}
            containerStyle={{ width: '100%' }}
            placeholder="Enter 10-digit mobile number"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            I want to register as
          </label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setUserType(USER_TYPES.SELLER)}
              className={`flex-1 py-2 px-4 rounded-lg border transition ${
                userType === USER_TYPES.SELLER
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Seller
            </button>
            <button
              type="button"
              onClick={() => setUserType(USER_TYPES.BUYER)}
              className={`flex-1 py-2 px-4 rounded-lg border transition ${
                userType === USER_TYPES.BUYER
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Buyer
            </button>
          </div>
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition disabled:opacity-50 font-medium"
        >
          {loading ? 'Sending OTP...' : 'Register'}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  )
}

export default Register