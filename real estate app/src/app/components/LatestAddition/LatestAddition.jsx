"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import PropertyDetailsModal from "../PropertyDetailsModal/PropertyDetailsModal.jsx"
import { addFavorite, getFavorites } from "../../lib/favorites.js"

function LatestAddition({ updateCartCount }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [currentFavoritedIds, setCurrentFavoritedIds] = useState(new Set())

  const autoPlayIntervalRef = useRef(null)
  const carouselContainerRef = useRef(null)
  const carouselTrackRef = useRef(null) // Ref for the inner div that moves

  const latestProperties = [
    {
      id: 1,
      image: "/placeholder.svg?height=300&width=400&text=Contemporary Villa",
      title: "Contemporary Villa in South Delhi",
      price: "25,00,00,000",
      beds: 4,
      baths: 3,
      sqft: "3,200",
      location: "South Delhi, New Delhi",
      description:
        "An exquisite contemporary villa in a prestigious South Delhi locality, featuring state-of-the-art amenities and lush green surroundings.",
      type: "Villa",
      yearBuilt: 2022,
      lotSize: "0.75 acres",
      amenities: ["Private Garden", "Home Theater", "Smart Home System"],
    },
    {
      id: 2,
      image: "/placeholder.svg?height=300&width=400&text=High-Rise Apartment",
      title: "High-Rise Apartment in Gurugram",
      price: "8,50,00,000",
      beds: 2,
      baths: 2,
      sqft: "1,800",
      location: "Gurugram, Haryana",
      description:
        "Sophisticated urban living in a prime Gurugram location. This luxury apartment offers spacious interiors and access to exclusive building amenities.",
      type: "Apartment",
      yearBuilt: 2018,
      lotSize: "N/A",
      amenities: ["Gym Access", "Rooftop Lounge", "24/7 Security"],
    },
    {
      id: 3,
      image: "/placeholder.svg?height=300&width=400&text=Family Home Noida",
      title: "Family Home in Noida Extension",
      price: "6,50,00,000",
      beds: 3,
      baths: 2,
      sqft: "2,400",
      location: "Noida Extension, UP",
      description:
        "A warm and inviting family home with a beautifully landscaped garden, perfect for outdoor activities and family gatherings.",
      type: "House",
      yearBuilt: 2015,
      lotSize: "0.3 acres",
      amenities: ["Large Garden", "Two-Car Garage", "Updated Kitchen"],
    },
    {
      id: 4,
      image: "/placeholder.svg?height=300&width=400&text=Luxury Condo",
      title: "Luxury Condo in DLF Cybercity",
      price: "12,00,00,000",
      beds: 3,
      baths: 2,
      sqft: "2,100",
      location: "DLF Cybercity, Gurugram",
      description:
        "Experience modern living in this elegant condominium. Enjoy resort-style amenities and proximity to major business hubs.",
      type: "Condo",
      yearBuilt: 2019,
      lotSize: "N/A",
      amenities: ["Community Pool", "Fitness Center", "Business Lounge"],
    },
    {
      id: 5,
      image: "/placeholder.svg?height=300&width=400&text=Farmhouse Chattarpur",
      title: "Cozy Farmhouse in Chattarpur",
      price: "4,50,00,000",
      beds: 2,
      baths: 1,
      sqft: "1,500",
      location: "Chattarpur, New Delhi",
      description:
        "A rustic yet charming farmhouse, perfect for a peaceful retreat. Surrounded by nature with easy access to city amenities.",
      type: "Farmhouse",
      yearBuilt: 2000,
      lotSize: "2 acres",
      amenities: ["Private Lawn", "Scenic Views", "Outdoor Seating"],
    },
    {
      id: 6,
      image: "/placeholder.svg?height=300&width=400&text=Designer Loft",
      title: "Designer Loft in Hauz Khas",
      price: "7,50,00,000",
      beds: 2,
      baths: 2,
      sqft: "1,900",
      location: "Hauz Khas, New Delhi",
      description:
        "Unique industrial-style loft in a vibrant city neighborhood. Features high ceilings, exposed brick, and open-concept living.",
      type: "Loft",
      yearBuilt: 1995,
      lotSize: "N/A",
      amenities: ["High Ceilings", "Exposed Brick", "Close to Metro"],
    },
  ]

  // Update favorited IDs when component mounts or favorites change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const favorites = getFavorites()
      setCurrentFavoritedIds(new Set(favorites.map((fav) => fav.id)))
    }
  }, [updateCartCount]) // Re-run when cart count updates (implies favorites changed)

  const GAP_WIDTH = 16 // Tailwind's gap-4 is 16px

  const getCurrentSlidesToShow = useCallback(() => {
    if (typeof window === "undefined") return 3 // Fallback for server-side
    return window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1
  }, [])

  const getMoveAmount = useCallback(() => {
    if (typeof window === "undefined" || !carouselContainerRef.current) return 0
    const containerWidth = carouselContainerRef.current.offsetWidth
    const slidesToShow = getCurrentSlidesToShow()

    if (slidesToShow === 1) {
      return containerWidth
    } else {
      return (containerWidth - (slidesToShow - 1) * GAP_WIDTH) / slidesToShow + GAP_WIDTH
    }
  }, [getCurrentSlidesToShow])

  const applyTransform = useCallback(() => {
    if (typeof window === "undefined" || !carouselTrackRef.current) return
    const moveAmount = getMoveAmount()
    carouselTrackRef.current.style.transform = `translateX(-${currentSlideIndex * moveAmount}px)`
  }, [currentSlideIndex, getMoveAmount])

  const nextSlide = useCallback(() => {
    const totalSlides = latestProperties.length
    const slidesToShow = getCurrentSlidesToShow()
    const maxSlide = Math.max(0, totalSlides - slidesToShow) // Ensure maxSlide is not negative

    setCurrentSlideIndex((prevIndex) => (prevIndex >= maxSlide ? 0 : prevIndex + 1))
  }, [latestProperties.length, getCurrentSlidesToShow])

  const prevSlide = useCallback(() => {
    const totalSlides = latestProperties.length
    const slidesToShow = getCurrentSlidesToShow()
    const maxSlide = Math.max(0, totalSlides - slidesToShow)

    setCurrentSlideIndex((prevIndex) => (prevIndex <= 0 ? maxSlide : prevIndex - 1))
  }, [latestProperties.length, getCurrentSlidesToShow])

  const goToSlide = useCallback((slideIndex) => {
    setCurrentSlideIndex(slideIndex)
  }, [])

  const updateDots = useCallback(() => {
    if (typeof window === "undefined") return
    const dots = document.querySelectorAll(".carousel-dot")
    dots.forEach((dot, index) => {
      if (index === currentSlideIndex) {
        dot.classList.add("bg-blue-600")
        dot.classList.remove("bg-gray-300")
      } else {
        dot.classList.add("bg-gray-300")
        dot.classList.remove("bg-blue-600")
      }
    })
  }, [currentSlideIndex])

  const handleResize = useCallback(() => {
    setCurrentSlideIndex(0) // Reset current slide to 0 on resize
  }, [])

  const startAutoPlay = useCallback(() => {
    if (typeof window === "undefined") return null
    return setInterval(() => {
      nextSlide()
    }, 4000)
  }, [nextSlide])

  const stopAutoPlay = useCallback(() => {
    if (typeof window === "undefined" || !autoPlayIntervalRef.current) return
    clearInterval(autoPlayIntervalRef.current)
    autoPlayIntervalRef.current = null
  }, [])

  // Effect for applying transform and updating dots when slide index changes
  useEffect(() => {
    applyTransform()
    updateDots()
  }, [currentSlideIndex, applyTransform, updateDots])

  // Effect for carousel initialization and event listeners
  useEffect(() => {
    if (typeof window === "undefined") return

    // Initial setup
    applyTransform()
    updateDots()

    stopAutoPlay()
    autoPlayIntervalRef.current = startAutoPlay()

    const carouselContainer = carouselContainerRef.current
    if (carouselContainer) {
      carouselContainer.addEventListener("mouseenter", stopAutoPlay)
      carouselContainer.addEventListener("mouseleave", startAutoPlay)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      if (carouselContainer) {
        carouselContainer.removeEventListener("mouseenter", stopAutoPlay)
        carouselContainer.removeEventListener("mouseleave", startAutoPlay)
      }
      window.removeEventListener("resize", handleResize)
      stopAutoPlay()
    }
  }, [applyTransform, updateDots, startAutoPlay, stopAutoPlay, handleResize]) // Dependencies for initial setup and cleanup

  const handleViewDetails = (property) => {
    setSelectedProperty(property)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProperty(null)
    // Add a small delay to allow modal to fully close and DOM to settle
    setTimeout(() => {
      if (typeof window !== "undefined") {
        // Re-initialize carousel after modal closes
        applyTransform()
        updateDots()
        stopAutoPlay()
        autoPlayIntervalRef.current = startAutoPlay()
      }
    }, 100)
  }

  const totalSlides = latestProperties.length
  const getMaxDots = useCallback(() => {
    const slidesToShow = getCurrentSlidesToShow()
    return Math.max(1, totalSlides - slidesToShow + 1)
  }, [totalSlides, getCurrentSlidesToShow])

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
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Latest Additions</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Check out our newest property listings that just hit the market
          </p>
        </div>

        <div id="carousel-container" ref={carouselContainerRef} className="relative">
          <div className="overflow-hidden rounded-lg">
            <div
              id="property-carousel"
              ref={carouselTrackRef}
              className="flex transition-transform duration-500 ease-in-out gap-4"
            >
              {latestProperties.map((property) => (
                <div
                  key={property.id}
                  className="flex-shrink-0 w-full md:w-[calc(50%-8px)] lg:w-[calc(33.33%-10.67px)]"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 h-full">
                    <div className="relative">
                      <img
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        New
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{property.title}</h3>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">₹{property.price}</p>
                      <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-4">
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
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{property.location}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewDetails(property)}
                          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleAddToFavorites(property)}
                          className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 transition duration-300"
                        >
                          Add to Favorites
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 bg-opacity-90 hover:bg-opacity-100 text-gray-800 dark:text-gray-100 p-3 rounded-full shadow-lg transition duration-300 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 bg-opacity-90 hover:bg-opacity-100 text-gray-800 dark:text-gray-100 p-3 rounded-full shadow-lg transition duration-300 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: getMaxDots() }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`carousel-dot w-3 h-3 rounded-full transition duration-300 ${
                  index === currentSlideIndex ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => {
              if (typeof document !== "undefined") {
                document.getElementById("properties").scrollIntoView({ behavior: "smooth" })
              }
            }}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
          >
            View All Properties
          </button>
        </div>
      </div>
      {isModalOpen && <PropertyDetailsModal property={selectedProperty} onClose={handleCloseModal} />}
    </section>
  )
}

export default LatestAddition
