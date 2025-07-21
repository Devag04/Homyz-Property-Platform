"use client"

import { useEffect } from "react"

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

function PropertyDetailsModal({ property, onClose }) {
  useEffect(() => {
    if (typeof window === "undefined") return

    const scrollbarWidth = getScrollbarWidth()
    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight

    document.body.style.overflow = "hidden"
    document.body.style.paddingRight = `${scrollbarWidth}px`

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [])

  if (!property) {
    return null
  }

  const handleContactAgent = () => {
    alert(
      `Contact us about: ${property.title}\n\nPhone: +91 9876764543\nEmail: info@dreamhomerealty.in\n\nWe'll get back to you within 24 hours!`,
    )
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-gray-800 dark:bg-black bg-opacity-75 dark:bg-opacity-80 flex items-center justify-center z-[100]">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl p-6 relative mx-4 max-h-[90vh] overflow-y-auto">
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

        <img
          src={property.image || "/placeholder.svg?height=400&width=600&text=Property Image"}
          alt={property.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">{property.title}</h3>
        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">₹{property.price}</p>

        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{property.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-300 mb-6">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            <span>{property.beds} beds</span>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>{property.baths} baths</span>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1a1 1 0 00-1 1v3a1 1 0 01-1 1H8a1 1 0 01-1-1v-3a1 1 0 00-1-1H3a1 1 0 01-.707-1.707l7-7z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>{property.sqft} sqft</span>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>{property.location}</span>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
            <span>Built: {property.yearBuilt}</span>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L4 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-8-3zm0 10.99c-.73 0-1.4-.18-2-.48V10h4v2.51c-.6.3-1.27.48-2 .48z" />
            </svg>
            <span>Type: {property.type}</span>
          </div>
          {property.lotSize && (
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 13H6c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zm0 2v4H6v-4h12zM12 2L4 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-8-3zm0 10.99c-.73 0-1.4-.18-2-.48V10h4v2.51c-.6.3-1.27.48-2 .48z" />
              </svg>
              <span>Lot Size: {property.lotSize}</span>
            </div>
          )}
        </div>

        {property.amenities && property.amenities.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Amenities:</h4>
            <div className="flex flex-wrap gap-2">
              {property.amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-4">
          <button
            onClick={handleContactAgent}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Contact Agent
          </button>
          <button
            onClick={onClose}
            className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-6 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetailsModal
