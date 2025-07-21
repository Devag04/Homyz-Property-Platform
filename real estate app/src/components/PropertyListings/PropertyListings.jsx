"use client"

import { useState, useEffect } from "react"
import PropertyDetailsModal from "../PropertyDetailsModal/PropertyDetailsModal.jsx"
import { addFavorite, getFavorites } from "../../app/lib/favorites.js" // Import getFavorites to check favorited state

function PropertyListings({ updateCartCount }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [filters, setFilters] = useState({ city: "", bedrooms: 0, area: 0 })
  const [currentFavoritedIds, setCurrentFavoritedIds] = useState(new Set())

  const allProperties = [
    {
      id: 1,
      image: "/i7.jpg",
      title: "Spacious Apartment in Dwarka",
      price: "4,50,00,000",
      beds: 3,
      baths: 2,
      sqft: "1,900",
      location: "Dwarka, New Delhi",
      city: "dwarka",
      bedrooms: 3,
      areaSqft: 1900,
      description:
        "A charming family apartment located in a well-connected sector of Dwarka, offering ample space and modern amenities. Close to metro and markets.",
      type: "Apartment",
      yearBuilt: 2005,
      lotSize: "N/A",
      amenities: ["Reserved Parking", "24/7 Security", "Community Park"],
    },
    {
      id: 2,
      image: "/i8.jpeg",
      title: "Luxury Flat in Connaught Place",
      price: "7,50,00,000",
      beds: 2,
      baths: 1,
      sqft: "1,200",
      location: "Connaught Place, New Delhi",
      city: "connaught-place",
      bedrooms: 2,
      areaSqft: 1200,
      description:
        "Sleek and stylish flat in the heart of Delhi, offering a vibrant urban lifestyle. Ideal for professionals seeking convenience and luxury.",
      type: "Apartment",
      yearBuilt: 2018,
      lotSize: "N/A",
      amenities: ["Gym Access", "Concierge Service", "Central AC"],
    },
    {
      id: 3,
      image: "/i9.webp",
      title: "Grand Penthouse in Vasant Kunj",
      price: "12,00,00,000",
      beds: 4,
      baths: 3,
      sqft: "2,800",
      location: "Vasant Kunj, New Delhi",
      city: "vasant-kunj",
      bedrooms: 4,
      areaSqft: 2800,
      description:
        "Experience unparalleled luxury in this expansive penthouse with panoramic city views. Features high-end finishes and private terrace.",
      type: "Penthouse",
      yearBuilt: 2020,
      lotSize: "N/A",
      amenities: ["Private Terrace", "Modular Kitchen", "Smart Home System"],
    },
    {
      id: 4,
      image: "/i10.webp",
      title: "Elegant Villa in Sainik Farms",
      price: "9,50,00,000",
      beds: 3,
      baths: 2,
      sqft: "2,200",
      location: "Sainik Farms, New Delhi",
      city: "sainik-farms",
      bedrooms: 3,
      areaSqft: 2200,
      description:
        "Stunning villa in the exclusive Sainik Farms, offering lush green surroundings and a serene lifestyle. Perfect for a private retreat.",
      type: "Villa",
      yearBuilt: 2010,
      lotSize: "0.5 acres",
      amenities: ["Large Garden", "Private Pool", "Servant Quarters"],
    },
    {
      id: 5,
      image: "/i2.jpeg",
      title: "Cozy Home in Greater Noida",
      price: "3,80,00,000",
      beds: 2,
      baths: 1,
      sqft: "1,400",
      location: "Greater Noida, UP",
      city: "greater-noida",
      bedrooms: 2,
      areaSqft: 1400,
      description:
        "Secluded home nestled in a peaceful locality of Greater Noida, offering tranquility and modern comforts. Ideal for families.",
      type: "House",
      yearBuilt: 2015,
      lotSize: "0.15 acres",
      amenities: ["Gated Community", "Clubhouse Access", "Power Backup"],
    },
    {
      id: 6,
      image: "/i4.avif",
      title: "Heritage Bungalow in Lutyens' Delhi",
      price: "6,80,00,000",
      beds: 3,
      baths: 2,
      sqft: "2,100",
      location: "Lutyens' Delhi, New Delhi",
      city: "lutyens-delhi",
      bedrooms: 3,
      areaSqft: 2100,
      description:
        "Beautifully preserved bungalow in a historic district, blending classic charm with modern updates. A true piece of Delhi's heritage.",
      type: "Bungalow",
      yearBuilt: 1940,
      lotSize: "0.2 acres",
      amenities: ["Spacious Lawns", "Classic Architecture", "Prime Location"],
    },
  ]

  // Update favorited IDs when component mounts or favorites change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const favorites = getFavorites()
      setCurrentFavoritedIds(new Set(favorites.map((fav) => fav.id)))
    }
  }, [updateCartCount]) // Re-run when cart count updates (implies favorites changed)

  const filteredProperties = allProperties.filter((property) => {
    const { city, bedrooms, area } = filters
    let shouldShow = true

    if (city && property.city !== city) {
      shouldShow = false
    }

    if (bedrooms > 0 && property.bedrooms < bedrooms) {
      shouldShow = false
    }

    if (area > 0 && property.areaSqft < area) {
      shouldShow = false
    }

    return shouldShow
  })

  const handleViewDetails = (property) => {
    setSelectedProperty(property)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProperty(null)
  }

  const handleContact = (property) => {
    alert(
      `Contact us about: ${property.title}\n\nPhone: +91 9876764543\nEmail: info@dreamhomerealty.in\n\nWe'll get back to you within 24 hours!`,
    )
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: name === "bedrooms" || name === "area" ? Number.parseInt(value) || 0 : value,
    }))
  }

  const handleClearFilters = () => {
    setFilters({ city: "", bedrooms: 0, area: 0 })
  }

  const handleLoadMore = () => {
    alert(
      "More properties would be loaded here! In a real application, this would fetch additional properties from a database.",
    )
  }

  const handleAddToFavorites = (property) => {
    if (typeof window !== "undefined") {
      const added = addFavorite(property)
      if (added) {
        updateCartCount()
        setCurrentFavoritedIds((prev) => new Set(prev).add(property.id)) // Update local state for heart icon
        alert(`${property.title} added to favorites!`)
      } else {
        alert(`${property.title} is already in your favorites!`)
      }
    }
  }

  return (
    <section id="properties" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Property Listings</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Browse through our extensive collection of premium properties
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Filter Properties</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="city-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                City
              </label>
              <select
                id="city-filter"
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">All Cities</option>
                <option value="dwarka">Dwarka</option>
                <option value="connaught-place">Connaught Place</option>
                <option value="vasant-kunj">Vasant Kunj</option>
                <option value="sainik-farms">Sainik Farms</option>
                <option value="greater-noida">Greater Noida</option>
                <option value="lutyens-delhi">Lutyens' Delhi</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="bedrooms-filter"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Bedrooms
              </label>
              <select
                id="bedrooms-filter"
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleFilterChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">Any</option>
                <option value="1">1+ Bedroom</option>
                <option value="2">2+ Bedrooms</option>
                <option value="3">3+ Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
              </select>
            </div>
            <div>
              <label htmlFor="area-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Area (sqft)
              </label>
              <select
                id="area-filter"
                name="area"
                value={filters.area}
                onChange={handleFilterChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">Any</option>
                <option value="1000">1000+ sqft</option>
                <option value="1500">1500+ sqft</option>
                <option value="2000">2000+ sqft</option>
                <option value="2500">2500+ sqft</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            {/* Apply Filters button is no longer needed as filtering happens on change */}
            <button
              onClick={handleClearFilters}
              className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-6 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-300"
            >
              Clear All
            </button>
          </div>

          {/* Results Message */}
          <div
            id="results-message"
            className="mt-4 text-sm text-gray-600 dark:text-gray-300"
            style={{ display: "block" }} // Always show, update text dynamically
          >
            Showing {filteredProperties.length} of {allProperties.length} properties
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              data-property-id={property.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 border border-gray-200 dark:border-gray-700"
            >
              <div className="relative">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-700 bg-opacity-90 p-2 rounded-full">
                  <svg
                    onClick={() => handleAddToFavorites(property)}
                    className={`w-5 h-5 ${currentFavoritedIds.has(property.id) ? "text-red-500" : "text-gray-600 dark:text-gray-300"} hover:text-red-500 cursor-pointer transition duration-300`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{property.title}</h3>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-3">₹{property.price}</p>
                <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-3">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                    </svg>
                    {property.beds} beds
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {property.baths} baths
                  </span>
                  <span>{property.sqft} sqft</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  {property.location}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewDetails(property)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleAddToFavorites(property)}
                    className="px-4 py-2 border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 transition duration-300"
                  >
                    Add to Favorites
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={handleLoadMore}
            className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-8 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
          >
            Load More Properties
          </button>
        </div>
      </div>
      {isModalOpen && <PropertyDetailsModal property={selectedProperty} onClose={handleCloseModal} />}
    </section>
  )
}

export default PropertyListings
