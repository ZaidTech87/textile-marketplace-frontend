import React, { useState } from 'react'
import Modal, { ConfirmModal, SuccessModal, FormModal } from './components/common/Modal'
import Button from './components/common/Button'
import Input from './components/common/Input'

const ExamplePage = () => {
  const [isBasicModalOpen, setIsBasicModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setLoading(false)
    setIsConfirmModalOpen(false)
    setIsSuccessModalOpen(true)
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-2xl font-bold mb-4">Modal Examples</h1>
      
      <div className="space-x-4">
        <Button onClick={() => setIsBasicModalOpen(true)}>
          Open Basic Modal
        </Button>
        
        <Button onClick={() => setIsConfirmModalOpen(true)} variant="outline">
          Open Confirm Modal
        </Button>
        
        <Button onClick={() => setIsFormModalOpen(true)} variant="secondary">
          Open Form Modal
        </Button>
      </div>

      {/* Basic Modal */}
      <Modal
        isOpen={isBasicModalOpen}
        onClose={() => setIsBasicModalOpen(false)}
        title="Basic Modal"
      >
        <p className="text-gray-600">
          This is a basic modal with close button. You can put any content here.
        </p>
        <div className="mt-4">
          <Input placeholder="Enter something..." />
        </div>
      </Modal>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirm}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmVariant="danger"
        loading={loading}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Success!"
        message="Your product has been deleted successfully."
        buttonText="Done"
      />

      {/* Form Modal */}
      <FormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={() => {
          console.log('Form submitted')
          setIsFormModalOpen(false)
        }}
        title="Add New Category"
        submitText="Create"
      >
        <div className="space-y-4">
          <Input
            label="Category Name"
            placeholder="e.g., Silk Fabric"
            required
          />
          <Input
            label="Description"
            placeholder="Enter category description"
          />
        </div>
      </FormModal>
    </div>
  )
}

export default ExamplePage