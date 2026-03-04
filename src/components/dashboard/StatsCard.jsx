import React from 'react'
import { Link } from 'react-router-dom'

const StatsCard = ({ 
  title, 
  value, 
  icon, 
  color = 'blue',
  link,
  linkText = 'View Details'
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600',
    yellow: 'bg-yellow-50 text-yellow-600'
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <div className="text-xl">{icon}</div>
        </div>
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <h3 className="text-gray-600 font-medium mb-2">{title}</h3>
      {link && (
        <Link to={link} className="text-sm text-primary-600 hover:text-primary-700">
          {linkText} →
        </Link>
      )}
    </div>
  )
}

export default StatsCard