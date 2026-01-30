import { createContext, useContext, useState, type ReactNode } from 'react'

interface SearchContextValue {
    search: string
    setSearch: (value: string) => void
}

const SearchContext = createContext<SearchContextValue | null>(null)

export function SearchProvider({ children }: { children: ReactNode }) {
    const [search, setSearch] = useState('')
    return (
        <SearchContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchContext.Provider>
    )
}

export function useSearch(): SearchContextValue {
    const ctx = useContext(SearchContext)
    if (!ctx) {
        throw new Error('useSearch deve ser usado dentro de SearchProvider')
    }
    return ctx
}
