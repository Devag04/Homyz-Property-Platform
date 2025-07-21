"use client"

import { useState, useEffect, useCallback } from "react"

function Header({ favoritesCount, updateCartCount, toggleFavoritesModal }) {
  const [currentTheme, setCurrentTheme] = useState("light")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = useCallback((sectionId) => {
    if (typeof document === "undefined") return
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false) // close on mobile after click
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

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">DreamHome Realty</h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 ml-auto items-center">
            <button onClick={() => scrollToSection("introduction")} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Home</button>
            <button onClick={() => scrollToSection("about")} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">About</button>
            <button onClick={() => scrollToSection("properties")} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Properties</button>
            <button onClick={() => scrollToSection("contact")} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Contact</button>

            <button onClick={toggleFavoritesModal} className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium ml-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" className="lucide lucide-shopping-cart">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{favoritesCount}</span>
            </button>

            <button onClick={toggleTheme} className="ml-4 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300">
              <span>
                {currentTheme === "dark" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" className="lucide lucide-sun">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" /><path d="M12 20v2" /><path d="M4.93 4.93l1.41 1.41" /><path d="M17.66 17.66l1.41 1.41" />
                    <path d="M2 12h2" /><path d="M20 12h2" /><path d="M6.34 17.66l-1.41 1.41" /><path d="M19.07 4.93l-1.41 1.41" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" className="lucide lucide-moon">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                )}
              </span>
            </button>
          </nav>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700 dark:text-gray-300 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden flex flex-col space-y-2 pb-4 px-2">
            <button onClick={() => scrollToSection("introduction")} className="text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Home</button>
            <button onClick={() => scrollToSection("about")} className="text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">About</button>
            <button onClick={() => scrollToSection("properties")} className="text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Properties</button>
            <button onClick={() => scrollToSection("contact")} className="text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Contact</button>
            <button onClick={toggleFavoritesModal} className="text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Favorites ({favoritesCount})</button>
            <button onClick={toggleTheme} className="text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Toggle {currentTheme === "dark" ? "Light" : "Dark"} Mode
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
