"use client"

import { useEffect, useState } from "react"
import { getFavorites } from "../../app/lib/favorites.js"

// Utility to get scrollbar width
const getScrollbarWidth = () => {
  if (typeof window === "undefined") return 0 // Guard against server-side execution
  const outer = document.createElement("div")
  outer.style.visibility = "hidden"
  outer.style.overflow = "scroll"
  outer.style.msOverflowStyle = "scrollbar"
  document.body.appendChild(outer)

  const inner = document.createElement("div")
  outer.appendChild(inner)

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth

  outer.parentNode.removeChild(outer)

  return scrollbarWidth
}

function FavoritesModal({ isOpen, onClose, onRemoveFavorite, onDownloadPdf }) {
  const [favoritedProperties, setFavoritedProperties] = useState([])

  useEffect(() => {
    if (typeof window === "undefined") return

    const scrollbarWidth = getScrollbarWidth()
    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight

    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.body.style.paddingRight = `${scrollbarWidth}px`
      setFavoritedProperties(getFavorites())
    } else {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [isOpen])

  const handleContactAboutFavorites = () => {
    alert("Proceeding to contact form for favorited properties!")
    onClose()
  }

  if (!isOpen) {
    return null
  }

  return (
    <div
      id="favorites-modal"
      className="fixed inset-0 bg-gray-800 dark:bg-black bg-opacity-75 dark:bg-opacity-80 flex items-center justify-center z-100"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-[calc(100%-2rem)] max-w-2xl p-6 relative mx-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Your Favorited Properties</h3>
        <ul id="favorites-list" className="space-y-4 max-h-96 overflow-y-auto">
          {favoritedProperties.length === 0 ? (
            <li className="text-gray-600 dark:text-gray-300">No properties favorited yet.</li>
          ) : (
            favoritedProperties.map((property) => (
              <li
                key={property.id}
                className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
              >
                <div className="flex items-center">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-12 h-12 object-cover rounded mr-3"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-100">{property.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">₹{property.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveFavorite(property.id)}
                  className="remove-favorite-btn bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition duration-300"
                >
                  Remove
                </button>
              </li>
            ))
          )}
        </ul>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={handleContactAboutFavorites}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Contact About Favorites
          </button>
          <button
            onClick={onDownloadPdf}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  )
}

export default FavoritesModal
