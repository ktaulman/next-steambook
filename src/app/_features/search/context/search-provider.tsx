'use client';
import { createContext, useContext, useState, useMemo, PropsWithChildren } from 'react'
import { SearchResult } from '../interfaces/search-interfaces';

export const SearchContext = createContext(null);

export function SearchProvider({ children }: PropsWithChildren) {
    const [results, setResults] = useState<SearchResult[] | []>([])
    const [selected, setSelected] = useState<null | SearchResult>(null);
    const resultsContext = useMemo(() => ({ results, setResults }), [results])
    const selectedContext = useMemo(() => ({ selected, setSelected }), [selected])
    
    return (
        <SearchContext.Provider value={{ results: { ...resultsContext }, selected: { ...selectedContext } }}>
            {children}
        </SearchContext.Provider>
    )
}