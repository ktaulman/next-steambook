import { Suspense } from "react";
import TrendingNewChart from "./_features/dashboard/components/TrendingNewChart"; 

export default async function Page() {
    return (
        <div className='py-6'>
            <Suspense fallback={<h1>Loading..</h1>}>
                <TrendingNewChart />
            </Suspense>
        </div>

    )
}