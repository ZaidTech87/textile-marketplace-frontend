import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { userService } from '../services/userService'
import Loader from '../components/common/Loader'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import toast from 'react-hot-toast'
import { FiCamera } from 'react-icons/fi'

const Profile = () => {
  const { user, updateUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    city: '',
    localArea: '',
    gstNumber: '',
    businessAddress: '',
    businessDescription: ''
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        businessName: user.businessName || '',
        city: user.city || '',
        localArea: user.localArea || '',
        gstNumber: user.gstNumber || '',
        businessAddress: user.businessAddress || '',
        businessDescription: user.businessDescription || ''
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const updated = await userService.updateProfile(formData)
      updateUser(updated)
      toast.success('Profile updated successfully')
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    try {
      const updated = await userService.uploadImage(file)
      updateUser(updated)
      toast.success('Profile image updated')
    } catch (error) {
      toast.error('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  if (!user) return <Loader fullScreen />

  return (
    <div className="container-custom py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Profile Image */}
        <div className="p-6 border-b">
          <div className="flex items-center">
            <div className="relative">
              <img
                src={user.profileImage || '/default-avatar.png'}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <label
                htmlFor="profile-image"
                className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full cursor-pointer hover:bg-primary-700 transition"
              >
                <FiCamera size={16} />
              </label>
              <input
                type="file"
                id="profile-image"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
            </div>
            <div className="ml-6">
              <h2 className="text-xl font-semibold">{user.name || 'Update your name'}</h2>
              <p className="text-gray-600">{user.mobileNumber}</p>
              <p className="text-sm text-primary-600 mt-1">
                {user.userType === 'SELLER' ? 'Seller Account' : 'Buyer Account'}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {user.userType === 'SELLER' && (
                  <Input
                    label="Business Name"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                  />
                )}
                <Input
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
                <Input
                  label="Local Area"
                  name="localArea"
                  value={formData.localArea}
                  onChange={handleChange}
                />
              </div>
            </div>

            {user.userType === 'SELLER' && (
              <>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Business Details</h3>
                  <div className="space-y-4">
                    <Input
                      label="GST Number (Optional)"
                      name="gstNumber"
                      value={formData.gstNumber}
                      onChange={handleChange}
                    />
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Business Address
                      </label>
                      <textarea
                        name="businessAddress"
                        value={formData.businessAddress}
                        onChange={handleChange}
                        rows="3"
                        className="input-field"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Business Description
                      </label>
                      <textarea
                        name="businessDescription"
                        value={formData.businessDescription}
                        onChange={handleChange}
                        rows="4"
                        className="input-field"
                        placeholder="Tell buyers about your business..."
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-end">
              <Button
                type="submit"
                loading={loading}
                size="lg"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile