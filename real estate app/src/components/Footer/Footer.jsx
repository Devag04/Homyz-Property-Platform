// Moved from src/app/components/Footer/Footer.jsx
"use client"

function Footer() {
  const handleSocialClick = (platform) => {
    alert(`This would open our ${platform} page! Follow us for the latest property updates.`)
  }

  return (
    <footer id="contact" className="bg-gray-800 dark:bg-gray-950 text-white dark:text-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold">DreamHome Realty</h3>
            </div>
            <p className="text-gray-300 dark:text-gray-400 mb-6 max-w-md">
              Your trusted partner in finding the perfect home. We make real estate transactions simple, transparent,
              and stress-free.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => window.open("https://x.com/DivyanshAg04")}
                className="bg-gray-700 dark:bg-gray-800 p-2 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-700 transition duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </button>
              <button
                onClick={() => window.open("https://www.facebook.com/profile.php?id=61578765534110")}
                className="bg-gray-700 dark:bg-gray-800 p-2 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-700 transition duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495v-9.294H9.692V11.41h3.128V8.797c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.313h3.587l-.467 3.296h-3.12V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
                </svg>
              </button>
              <button
                onClick={() => window.open("https://www.linkedin.com/in/divyansh-agarwal04/")}
                className="bg-gray-700 dark:bg-gray-800 p-2 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-700 transition duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </button>

              <button
                onClick={() => window.open("https://www.instagram.com/divyanshagarwal706/")}
                className="bg-gray-700 dark:bg-gray-800 p-2 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-700 transition duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.34 3.608 1.316.975.976 1.254 2.243 1.316 3.608.058 1.267.07 1.647.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.34 2.633-1.316 3.608-.976.975-2.243 1.254-3.608 1.316-1.267.058-1.647.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.34-3.608-1.316-.975-.976-1.254-2.243-1.316-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.34-2.633 1.316-3.608.976-.975 2.243-1.254 3.608-1.316C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.775.129 4.602.397 3.603 1.396 2.605 2.395 2.337 3.568 2.28 4.845.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.058 1.277.326 2.45 1.324 3.449.999.998 2.172 1.266 3.449 1.324C8.332 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 1.277-.058 2.45-.326 3.449-1.324.998-.999 1.266-2.172 1.324-3.449.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.058-1.277-.326-2.45-1.324-3.449-.999-.998-2.172-1.266-3.449-1.324C15.668.014 15.259 0 12 0zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </button>

            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <span className="text-gray-300 dark:text-gray-400">info@dreamhomerealty.in</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <span className="text-gray-300 dark:text-gray-400">+91 9876764543</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 mr-3 mt-1 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="text-gray-300 dark:text-gray-400">
                  Plot No. 1, Sector 10
                  <br />
                  Dwarka, New Delhi 110075
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => document.getElementById("introduction").scrollIntoView({ behavior: "smooth" })}
                  className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-100 transition duration-300 text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById("about").scrollIntoView({ behavior: "smooth" })}
                  className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-100 transition duration-300 text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById("properties").scrollIntoView({ behavior: "smooth" })}
                  className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-100 transition duration-300 text-left"
                >
                  Properties
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert("Services page would open here!")}
                  className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-100 transition duration-300 text-left"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert("Contact form would open here!")}
                  className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-100 transition duration-300 text-left"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert("Privacy Policy would open here!")}
                  className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-100 transition duration-300 text-left"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 dark:border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300 dark:text-gray-400">© 2025 DreamHome Realty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
