import { useEffect, useState, createContext, useContext } from "react"

function saveFavorites(animeIds: number[]) {
    localStorage.setItem("favorites", JSON.stringify(animeIds))
}

function getFavorites() {
    const favorites = localStorage.getItem("favorites")
    return favorites ? JSON.parse(favorites) : []
}

interface FavoriteContextValue {
    favorites: number[]
    setFavorites: (favorites: (prev: number[]) => number[]) => void
}
const FavoriteContext = createContext<FavoriteContextValue | null>(null)

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<number[]>(getFavorites())
    useEffect(() => {
        saveFavorites(favorites)
    }, [favorites])
    return (
        <FavoriteContext.Provider value={{ favorites, setFavorites }}>
            {children}
        </FavoriteContext.Provider>
    )
}

export function useFavorite(): FavoriteContextValue {
    const ctx = useContext(FavoriteContext)
    if (!ctx) {
        throw new Error('useFavorite deve ser usado dentro de FavoriteContext')
    }
    return ctx
}