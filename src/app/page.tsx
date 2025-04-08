import { Suspense } from "react";
import TrendingNewChart from "./_features/dashboard/components/TrendingNewChart";

export default async function Page() {
    return (
        <div>
            <h1 className="font-bold text-3xl dark:text-white"> Dashboard Page</h1>
            <Suspense fallback={<h1>Loading..</h1>}>
                <TrendingNewChart />
            </Suspense>
        </div>

    )
}