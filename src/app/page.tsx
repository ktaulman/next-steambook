import { Suspense } from "react";
import TrendingNewChart from "./(pages)/(home)/components/trending-new/TrendingNewChart";
import TrendingNewChartHeader from "./(pages)/(home)/components/trending-new/TrendingNewChartHeader";
import TrendingNewChartBody from "./(pages)/(home)/components/trending-new/TrendingNewChartBody";
import TrendingNewSkeleton from "./(pages)/(home)/components/trending-new/TrendingNewSkeleton";

export default async function Page() {
    return (
        <div className='py-6 w-full h-full'>
            <TrendingNewChart>
                <TrendingNewChartHeader />
                <Suspense fallback={<TrendingNewSkeleton />}>
                    <TrendingNewChartBody />
                </Suspense>
            </TrendingNewChart>

        </div>

    )
}