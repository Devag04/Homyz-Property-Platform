"use client"

import { useEffect } from "react"

function About() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const animateNumber = (elementId, start, end, duration, suffix = "") => {
      const element = document.getElementById(elementId)
      if (!element) return

      let startTime = null

      const step = (currentTime) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        const currentValue = Math.floor(progress * (end - start) + start)
        element.textContent = currentValue + suffix

        if (progress < 1) {
          requestAnimationFrame(step)
        }
      }

      requestAnimationFrame(step)
    }

    // Initialize animations after a short delay to ensure DOM is ready
    setTimeout(() => {
      animateNumber("happy-families-count", 0, 500, 2000, "+") // 2000ms = 2 seconds
      animateNumber("years-experience-count", 0, 15, 2000, "+")
      animateNumber("expert-agents-count", 0, 50, 2000, "+")
      animateNumber("success-rate-count", 0, 98, 2000, "%")
    }, 500)
  }, []) // Empty dependency array means this runs once on mount

  return (
    <section id="about" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Text Content Div - Left Side */}
          <div className="w-full lg:w-2/5 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">About DreamHome Realty</h2>
            <p className="text-base text-gray-600 dark:text-gray-300 mb-4">
              With over 15 years of experience in the real estate industry, we have helped thousands of families find
              their perfect home. Our team of dedicated professionals is committed to providing exceptional service and
              expert guidance throughout your home buying journey.
            </p>
            <p className="text-base text-gray-600 dark:text-gray-300 mb-6">
              We believe that finding the right home is more than just a transaction—it's about finding a place where
              memories are made and dreams come true.
            </p>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center bg-white dark:bg-gray-700 p-3 rounded-lg shadow">
                <div id="happy-families-count" className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  0+
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">Happy Families</div>
              </div>
              <div className="text-center bg-white dark:bg-gray-700 p-3 rounded-lg shadow">
                <div id="years-experience-count" className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  0+
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">Years Experience</div>
              </div>
              <div className="text-center bg-white dark:bg-gray-700 p-3 rounded-lg shadow">
                <div id="expert-agents-count" className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  0+
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">Expert Agents</div>
              </div>
              <div className="text-center bg-white dark:bg-gray-700 p-3 rounded-lg shadow">
                <div id="success-rate-count" className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  0%
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Image Content Div - Right Side */}
          <div className="w-full lg:w-3/5 relative">
            <img
              src="/placeholder.svg?height=500&width=600&text=Real Estate Team"
              alt="DreamHome Realty Team"
              className="rounded-lg shadow-lg w-full h-96 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
