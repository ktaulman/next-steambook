'use server';

import { SearchResult } from "../interfaces/search-interfaces";

export async function createReview(selected:SearchResult, formData: FormData) {
    console.log(selected) //handed down to <Form>, can attach an object. 
    const rawFormData = {
        text: formData.get('review_text'), //comes from the <RatingsStar/> Component
        starRating: formData.get('review_starRating')
    }

    console.log(rawFormData)

}