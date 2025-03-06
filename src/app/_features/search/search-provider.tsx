'use client';
import { createContext, useContext, useState, useMemo, PropsWithChildren } from 'react'

export const SearchContext = createContext(null);

export function SearchProvider({ children }: PropsWithChildren) {
    const [matches, setMatches] = useState([])
    const [selected, setSelected] = useState<SearchResult | null>(null);

    return (
        <SearchContext.Provider value={searchValue}>
            {children}
        </SearchContext.Provider>
    )
}