import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const [showConfirm, setShowConfirm] = useState(false)
  const navigate = useNavigate()

  const handleLogoutConfirm = () => {
    localStorage.removeItem('token')
    toast.success("Logged out successfully!")
    setShowConfirm(false)
    navigate("/") 
  }

  return (
    <div>
      {/* Logout Button */}
      <button 
        onClick={() => setShowConfirm(true)}
        className="bg-primary/80 px-6 py-2 text-gray-200 hover:bg-primary hover:text-white mt-4 rounded-md hoverEffect"
      >
        Log Out
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-80 p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-800">Confirm Logout</h2>
            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to log out?
            </p>

            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-5 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="px-5 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Logout
