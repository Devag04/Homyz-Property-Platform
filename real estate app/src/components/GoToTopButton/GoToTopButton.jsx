"use client"

import { useState, useEffect, useCallback } from "react"

function GoToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = useCallback(() => {
    if (typeof window === "undefined") return // Guard against server-side execution
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [])

  const scrollToTop = useCallback(() => {
    if (typeof window === "undefined") return // Guard against server-side execution
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    window.addEventListener("scroll", toggleVisibility)
    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [toggleVisibility])

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg transition-opacity duration-300 z-50 ${
        isVisible ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      aria-label="Go to top"
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
        className="lucide lucide-arrow-up"
      >
        <path d="m5 12 7-7 7 7" />
        <path d="M12 19V5" />
      </svg>
    </button>
  )
}

export default GoToTopButton
