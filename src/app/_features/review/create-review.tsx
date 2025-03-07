'use client';
import { useContext } from 'react';
import SearchForm from "@/app/_features/search/components/search-form"

import { RatingStars, ReviewArea, Button } from "@/app/_components";
import SearchBarWithContext from "@/app/_features/search/components/search-bar";
import { SearchContext } from "../search/context/search-provider";

export default function CreateReview() {
    const { selected } = useContext(SearchContext);
    return <SearchForm selected={selected.selected} >
        <SearchBarWithContext />
        <RatingStars />
        <ReviewArea />
        <Button />
    </SearchForm>
} 