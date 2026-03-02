import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

const Loader = ({ fullScreen = false, text = 'Loading...' }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
        <div className="text-center">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#2563eb"
            ariaLabel="three-dots-loading"
            visible={true}
          />
          <p className="mt-4 text-gray-600">{text}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center py-8">
      <ThreeDots
        height="40"
        width="40"
        radius="9"
        color="#2563eb"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  )
}

export default Loader