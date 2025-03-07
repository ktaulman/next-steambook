
import { ReactNode } from "react";
import { createReview } from '../server-actions/actions'
import { SearchResult } from "../interfaces/search-interfaces";

export default function SearchForm({ children, selected }: { children: ReactNode, selected: SearchResult }) {
    const createReviewWithSelected = createReview.bind('selected', selected)
    return <form action={createReview} className="p-10 flex flex-col justify-between gap-6">
        <h1 className='font-bold text-3xl'>Post Review</h1>
        {children}
    </form>
}