import { getUserReviews } from "./db/getUserReviews"

export default async function Page() {
    const data = await getUserReviews();


    return (
        <h1 className='font-bold text-3xl'>Reviews</h1>
    )
}