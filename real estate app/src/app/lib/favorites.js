export const getFavorites = () => {
  if (typeof window === "undefined") {
    return []
  }
  try {
    const storedFavorites = localStorage.getItem("dreamhome_favorites")
    return storedFavorites ? JSON.parse(storedFavorites) : []
  } catch (error) {
    console.error("Error parsing favorites from localStorage", error)
    return []
  }
}

export const saveFavorites = (favorites) => {
  if (typeof window === "undefined") {
    return
  }
  try {
    localStorage.setItem("dreamhome_favorites", JSON.stringify(favorites))
  } catch (error) {
    console.error("Error saving favorites to localStorage", error)
  }
}

export const addFavorite = (property) => {
  const currentFavorites = getFavorites()
  const isAlreadyFavorited = currentFavorites.some((fav) => fav.id === property.id)
  if (!isAlreadyFavorited) {
    const newFavorites = [...currentFavorites, property]
    saveFavorites(newFavorites)
    return true // Indicate success
  }
  return false // Indicate already favorited
}

export const removeFavorite = (propertyId) => {
  const currentFavorites = getFavorites()
  const newFavorites = currentFavorites.filter((p) => p.id !== propertyId)
  saveFavorites(newFavorites)
}
