"use client"

import { useState, useEffect, useCallback } from "react"

function Header({ favoritesCount, updateCartCount, toggleFavoritesModal }) {
  const [currentTheme, setCurrentTheme] = useState("light")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false) // State to control dropdown visibility

  const navItems = [
    { name: "Home", id: "introduction" },
    { name: "About", id: "about" },
    { name: "Properties", id: "properties" },
    { name: "Contact", id: "contact" },
  ]

  const scrollToSection = useCallback((sectionId) => {
    if (typeof document === "undefined") return // Guard against server-side execution
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsDropdownOpen(false) // Close dropdown after clicking a link
    }
  }, [])

  const toggleTheme = useCallback(() => {
    if (typeof window === "undefined") return
    const htmlElement = document.documentElement
    const newTheme = currentTheme === "dark" ? "light" : "dark"
    if (newTheme === "dark") {
      htmlElement.classList.add("dark")
    } else {
      htmlElement.classList.remove("dark")
    }
    localStorage.setItem("theme", newTheme)
    setCurrentTheme(newTheme)
  }, [currentTheme])

  // Effect to initialize theme from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return
    const savedTheme = localStorage.getItem("theme")
    const themeToApply = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    setCurrentTheme(themeToApply)
    if (themeToApply === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev)
  }, [])

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
              {/* Original house icon SVG */}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">DreamHome Realty</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 ml-auto items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => {
                toggleFavoritesModal()
              }}
              className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium ml-4"
            >
              {/* Shopping Cart Icon SVG */}
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
                className="w-6 h-6"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <span
                id="cart-count"
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {favoritesCount}
              </span>
            </button>
            <button
              onClick={toggleTheme}
              className="ml-4 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300"
            >
              <span id="theme-icon">
                {currentTheme === "dark" ? (
                  // Sun Icon SVG
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
                    className="w-5 h-5"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="M4.93 4.93l1.41 1.41" />
                    <path d="M17.66 17.66l1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="M6.34 17.66l-1.41 1.41" />
                    <path d="M19.07 4.93l-1.41 1.41" />
                  </svg>
                ) : (
                  // Moon Icon SVG
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
                    className="w-5 h-5"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                )}
              </span>
            </button>
          </nav>

          {/* Mobile Menu Trigger and Dropdown */}
          <div className="md:hidden relative">
            <button
              onClick={toggleDropdown}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle navigation menu"
            >
              {/* Hamburger Icon SVG */}
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
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 z-50">
                <nav className="flex flex-col">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-left w-full"
                    >
                      {item.name}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      toggleFavoritesModal()
                      setIsDropdownOpen(false) // Close dropdown after action
                    }}
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-left w-full flex items-center"
                  >
                    {/* Shopping Cart Icon SVG for mobile */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 mr-2"
                    >
                      <circle cx="8" cy="21" r="1" />
                      <circle cx="19" cy="21" r="1" />
                      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                    </svg>
                    Favorites
                    <span
                      id="cart-count-mobile"
                      className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {favoritesCount}
                    </span>
                  </button>
                  <button
                    onClick={toggleTheme}
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-left w-full flex items-center"
                  >
                    <span className="mr-2">
                      {currentTheme === "dark" ? (
                        // Sun Icon SVG for mobile
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5"
                        >
                          <circle cx="12" cy="12" r="4" />
                          <path d="M12 2v2" />
                          <path d="M12 20v2" />
                          <path d="M4.93 4.93l1.41 1.41" />
                          <path d="M17.66 17.66l1.41 1.41" />
                          <path d="M2 12h2" />
                          <path d="M20 12h2" />
                          <path d="M6.34 17.66l-1.41 1.41" />
                          <path d="M19.07 4.93l-1.41 1.41" />
                        </svg>
                      ) : (
                        // Moon Icon SVG for mobile
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5"
                        >
                          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                        </svg>
                      )}
                    </span>
                    Toggle Theme
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
