"use client"

import { useState, useEffect, useCallback } from "react"
import { Menu, Sun, Moon, ShoppingCart } from "lucide-react" // Import Lucide icons
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

function Header({ favoritesCount, updateCartCount, toggleFavoritesModal }) {
  const [currentTheme, setCurrentTheme] = useState("light")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
      setIsMobileMenuOpen(false) // Close mobile menu after clicking a link
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
          <div className="flex items-center">
            <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
              {/* Replaced inline SVG with Lucide icon for consistency */}
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
                setIsMobileMenuOpen(false) // Close mobile menu if opened via sheet
              }}
              className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium ml-4"
            >
              <ShoppingCart className="w-6 h-6" />
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
                {currentTheme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </span>
            </button>
          </nav>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden flex items-center">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-auto">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <nav className="flex flex-col gap-4 pt-8">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-left py-2"
                    >
                      {item.name}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      toggleFavoritesModal()
                      setIsMobileMenuOpen(false)
                    }}
                    className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-left py-2 flex items-center"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
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
                    className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-left py-2"
                  >
                    <span className="mr-2">
                      {currentTheme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </span>
                    Toggle Theme
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
