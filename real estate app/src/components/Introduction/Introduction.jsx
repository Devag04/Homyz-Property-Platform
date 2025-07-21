// Moved from src/app/components/Introduction/Introduction.jsx
"use client"

function Introduction() {
  const scrollToProperties = () => {
    const element = document.getElementById("properties")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToAbout = () => {
    const element = document.getElementById("about")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="introduction" className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Find Your Dream Home</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Discover the perfect property that matches your lifestyle and budget. We make home buying simple, fast, and
          stress-free.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={scrollToProperties}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
          >
            Browse Properties
          </button>
          <button
            onClick={scrollToAbout}
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}

export default Introduction
