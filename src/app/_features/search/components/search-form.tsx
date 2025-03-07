
import { ReactNode } from "react";
import { createReview } from '../server-actions/actions'
import { SearchResult } from "../interfaces/search-interfaces";

export default function SearchForm({ children, id }: { children: ReactNode, id: string }) {
    const createReviewWithSelected = createReview.bind(null, id)
    return <form action={createReviewWithSelected} className="p-10 flex flex-col justify-between gap-6">
        <h1 className='font-bold text-3xl'>Post Review</h1>
        {children}
    </form>
}