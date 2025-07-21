"use client"

import { useState, useEffect, useCallback } from "react"
import Header from "../components/Header/Header.jsx"
import Introduction from "../components/Introduction/Introduction.jsx"
import About from "../components/About/About.jsx"
import LatestAddition from "../components/LatestAddition/LatestAddition.jsx"
import PropertyListings from "../components/PropertyListings/PropertyListings.jsx"
import Footer from "../components/Footer/Footer.jsx"
import FavoritesModal from "../components/FavoritesModal/FavoritesModal.jsx"
import GoToTopButton from "../components/GoToTopButton/GoToTopButton.jsx"
import { getFavorites, removeFavorite } from "../lib/favorites.js"
import { jsPDF } from "jspdf" // Changed from require to import

function Home() {
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false)
  const [favoritesCount, setFavoritesCount] = useState(0)

  const updateCartCount = useCallback(() => {
    if (typeof window !== "undefined") {
      setFavoritesCount(getFavorites().length)
    }
  }, [])

  const toggleFavoritesModal = useCallback(() => {
    setIsFavoritesModalOpen((prev) => !prev)
  }, [])

  const handleRemoveFavorite = useCallback(
    (propertyId) => {
      removeFavorite(propertyId)
      updateCartCount()
      toggleFavoritesModal()
    },
    [updateCartCount, toggleFavoritesModal],
  )

  const downloadFavoritesPdf = useCallback(() => {
    if (typeof window === "undefined") return

    const currentFavorites = getFavorites()
    if (currentFavorites.length === 0) {
      alert("Your favorites list is empty. Add some properties first!")
      return
    }

    const doc = new jsPDF()
    let yPos = 20
    const margin = 15
    const lineHeight = 7
    const pageHeight = doc.internal.pageSize.height
    const contentWidth = doc.internal.pageSize.width - margin * 2

    const primaryBlue = [37, 99, 235]
    const darkBlue = [29, 78, 216]
    const darkGray = [55, 65, 81]
    const lightGray = [229, 231, 235]

    const addPageHeader = () => {
      doc.setFont("helvetica", "bold")
      doc.setFontSize(20)
      doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
      doc.text("DreamHome Realty", margin, yPos)
      yPos += 10
      doc.setFontSize(16)
      doc.text("Your Favorited Properties", margin, yPos)
      yPos += 15
      doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2])
      doc.line(margin, yPos, doc.internal.pageSize.width - margin, yPos)
      yPos += 10
      doc.setTextColor(0, 0, 0)
    }

    const addPageFooter = () => {
      doc.setFont("helvetica", "normal")
      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      doc.text(
        `Page ${doc.internal.getNumberOfPages()} of ${doc.internal.getNumberOfPages()}`,
        doc.internal.pageSize.width - margin,
        pageHeight - 10,
        { align: "right" },
      )
      doc.text("© 2024 DreamHome Realty. All rights reserved.", margin, pageHeight - 10)
      doc.setTextColor(0, 0, 0)
    }

    addPageHeader()

    currentFavorites.forEach((property, index) => {
      let estimatedLines = 6
      if (property.type) estimatedLines++
      if (property.yearBuilt) estimatedLines++
      if (property.lotSize) estimatedLines++
      if (property.description) estimatedLines += doc.splitTextToSize(property.description, contentWidth - 5).length + 1
      if (property.amenities && property.amenities.length > 0)
        estimatedLines += doc.splitTextToSize(property.amenities.join(", "), contentWidth - 5).length + 1

      const propertyBlockHeight = estimatedLines * lineHeight + 30
      if (yPos + propertyBlockHeight > pageHeight - 30) {
        addPageFooter()
        doc.addPage()
        yPos = 20
        addPageHeader()
      }

      doc.setFont("helvetica", "bold")
      doc.setFontSize(14)
      doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2])
      doc.text(`${index + 1}. ${property.title}`, margin, yPos)
      yPos += lineHeight + 5

      doc.setFont("helvetica", "normal")
      doc.setFontSize(12)
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
      doc.text(`Price: ₹${property.price}`, margin + 5, yPos)
      yPos += lineHeight
      doc.text(`Location: ${property.location}`, margin + 5, yPos)
      yPos += lineHeight
      doc.text(`Bedrooms: ${property.beds}`, margin + 5, yPos)
      yPos += lineHeight
      doc.text(`Bathrooms: ${property.baths}`, margin + 5, yPos)
      yPos += lineHeight
      doc.text(`Area: ${property.sqft} sqft`, margin + 5, yPos)
      yPos += lineHeight
      if (property.type) {
        doc.text(`Type: ${property.type}`, margin + 5, yPos)
        yPos += lineHeight
      }
      if (property.yearBuilt) {
        doc.text(`Year Built: ${property.yearBuilt}`, margin + 5, yPos)
        yPos += lineHeight
      }
      if (property.lotSize) {
        doc.text(`Lot Size: ${property.lotSize}`, margin + 5, yPos)
        yPos += lineHeight
      }

      if (property.description) {
        doc.setFont("helvetica", "bold")
        doc.text("Description:", margin + 5, yPos)
        yPos += lineHeight
        doc.setFont("helvetica", "normal")
        const splitDescription = doc.splitTextToSize(property.description, contentWidth - 5)
        doc.text(splitDescription, margin + 10, yPos)
        yPos += splitDescription.length * lineHeight
      }

      if (property.amenities && property.amenities.length > 0) {
        doc.setFont("helvetica", "bold")
        doc.text("Amenities:", margin + 5, yPos)
        yPos += lineHeight
        doc.setFont("helvetica", "normal")
        const amenitiesText = property.amenities.join(", ")
        const splitAmenities = doc.splitTextToSize(amenitiesText, contentWidth - 5)
        doc.text(splitAmenities, margin + 10, yPos)
        yPos += splitAmenities.length * lineHeight
      }
      yPos += 10

      doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2])
      doc.line(margin, yPos, doc.internal.pageSize.width - margin, yPos)
      yPos += 10
      doc.setTextColor(0, 0, 0)
    })

    const contactSectionHeight = 5 * lineHeight + 30
    if (yPos + contactSectionHeight > pageHeight - 30) {
      addPageFooter()
      doc.addPage()
      yPos = 20
      addPageHeader()
    }

    doc.setFont("helvetica", "bold")
    doc.setFontSize(16)
    doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
    doc.text("Contact Our Agent", margin, yPos)
    yPos += 10
    doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2])
    doc.line(margin, yPos, doc.internal.pageSize.width - margin, yPos)
    yPos += 10

    doc.setFont("helvetica", "normal")
    doc.setFontSize(12)
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
    doc.text("DreamHome Realty", margin, yPos)
    yPos += lineHeight
    doc.text("Email: info@dreamhomerealty.com", margin, yPos)
    yPos += lineHeight
    doc.text("Phone: +91 9876764543", margin, yPos)
    yPos += lineHeight
    doc.text("Address: Plot No. 1, Sector 10, Dwarka, New Delhi 110075", margin, yPos)
    yPos += lineHeight + 10

    addPageFooter()

    doc.save("favorited_properties.pdf")

    alert("Your beautifully formatted favorited properties PDF has been downloaded!")
  }, [])

  useEffect(() => {
    updateCartCount()
  }, [updateCartCount])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header
        favoritesCount={favoritesCount}
        updateCartCount={updateCartCount}
        toggleFavoritesModal={toggleFavoritesModal}
      />
      <Introduction />
      <About />
      <LatestAddition updateCartCount={updateCartCount} />
      <PropertyListings updateCartCount={updateCartCount} />
      <Footer />
      <FavoritesModal
        isOpen={isFavoritesModalOpen}
        onClose={toggleFavoritesModal}
        onRemoveFavorite={handleRemoveFavorite}
        onDownloadPdf={downloadFavoritesPdf}
      />
      <GoToTopButton />
    </div>
  )
}

export default Home
