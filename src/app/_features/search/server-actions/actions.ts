'use server';
export async function createReview(formData: FormData) {
    const rawFormData = {
        text: formData.get('review_text'),
        starRating: formData.get('review_starRating')
    }

    console.log(rawFormData)

}