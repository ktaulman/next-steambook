import { Suspense } from "react";
import TrendingNewChart from "./components/TrendingNewChart";

export default async function Page() {
    return (
        <div className='py-6 w-[50%]'>
            <Suspense fallback={<h1>Loading..</h1>}>
                <TrendingNewChart />
            </Suspense>
        </div>

    )
}