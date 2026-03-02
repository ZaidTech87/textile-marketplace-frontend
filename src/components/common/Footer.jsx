import React from 'react'
import { Link } from 'react-router-dom'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">About Textile B2B</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Connecting local textile weavers directly with buyers. 
              Empowering artisans and promoting traditional craftsmanship.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/marketplace" className="text-gray-300 hover:text-white transition">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-white transition">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-white transition">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <FiMail className="mt-1 text-gray-400" />
                <span className="text-gray-300">support@textileb2b.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <FiPhone className="mt-1 text-gray-400" />
                <span className="text-gray-300">+91 98765 43210</span>
              </li>
              <li className="flex items-start space-x-3">
                <FiMapPin className="mt-1 text-gray-400" />
                <span className="text-gray-300">
                  Varanasi, Uttar Pradesh<br />
                  India - 221001
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Textile B2B Marketplace. 
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer