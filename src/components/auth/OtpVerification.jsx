import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import OtpInput from 'react-otp-input'
import toast from 'react-hot-toast'
import { authService } from '../../services/authService'
import { useAuth } from '../../hooks/useAuth'

const OtpVerification = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const { mobile, userType } = location.state || {}
  
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    if (!mobile) {
      navigate('/login')
    }
  }, [mobile, navigate])

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [timeLeft])

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter 6-digit OTP')
      return
    }

    setLoading(true)
    try {
      const response = await authService.verifyOtp(mobile, otp)
      login(response.token, response.user)
      toast.success('Login successful!')
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setCanResend(false)
    setTimeLeft(60)
    setOtp('')
    
    try {
      await authService.sendOtp(mobile, userType)
      toast.success('OTP resent successfully')
    } catch (error) {
      toast.error('Failed to resend OTP')
      setCanResend(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary-600">Verify OTP</h2>
          <p className="text-gray-600 mt-2">
            Enter the 6-digit code sent to <br />
            <span className="font-semibold">+91 {mobile}</span>
          </p>
        </div>

        <div className="mb-6 flex justify-center">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => (
              <input
                {...props}
                className="w-12 h-12 mx-1 text-center text-2xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            )}
          />
        </div>

        <button
          onClick={handleVerify}
          disabled={loading || otp.length !== 6}
          className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition disabled:opacity-50 font-medium"
        >
          {loading ? 'Verifying...' : 'Verify & Login'}
        </button>

        <div className="text-center mt-4">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Resend OTP if you didn't receive it
            </button>
          ) : (
            <p className="text-gray-500">
              Resend OTP in {timeLeft} seconds
            </p>
          )}
        </div>

        <button
          onClick={() => navigate('/login')}
          className="w-full mt-4 text-gray-600 hover:text-gray-800"
        >
          ← Change Mobile Number
        </button>
      </div>
    </div>
  )
}

export default OtpVerification
// hello hey tata bye bye what are you doing now days donta do it again tmeet me tomorroaw 