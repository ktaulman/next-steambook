'use client';
import { createContext, useContext, useState, useMemo, PropsWithChildren, SetStateAction, Dispatch, Context } from 'react'
import { SearchResult } from '../interfaces/search-interfaces';


interface SearchProviderContext {
    results: SearchResultsState;
    selected: SearchSelectedState;
}
interface SearchResultsState {
    results: SearchResult[] | [];
    setResults: Dispatch<SetStateAction<SearchResult[] | []>>;
}
interface SearchSelectedState {
    selected: SearchResult | null;
    setSelected: Dispatch<SetStateAction<SearchResult | null>>
}
interface ResultsState { 
    
}

interface _SearchProviderContext { 
        results: SearchResult[] | [];
        setResults: Dispatch<SetStateAction<SearchResult[] | []>>;
        selected: SearchResult | null;
        setSelected: Dispatch<SetStateAction<SearchResult | null>>
}

export const SearchContext = createContext<_SearchProviderContext | null>(null);


export function SearchProvider({ children }: PropsWithChildren) {
    //setup React Hooks
    const [results, setResults] = useState<SearchResult[] | []>([])
    const [selected, setSelected] = useState<SearchResult | null>(null);
    //Wrapper in Memo and pass value as dependency to prevent re-renders
    const resultsContext = useMemo(() => ({ results, setResults }), [results])
    const selectedContext = useMemo(() => ({ selected, setSelected }), [selected])

    return (
        <SearchContext.Provider value={{ ...resultsContext,...selectedContext }}>
            {children}
        </SearchContext.Provider>
    )
}


