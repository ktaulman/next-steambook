import { Suspense } from "react";
import TrendingNewChart from "./(pages)/(home)/components/trending-new/TrendingNewChart";
import TrendingNewChartHeader from "./(pages)/(home)/components/trending-new/TrendingNewChartHeader";
import TrendingNewChartBody from "./(pages)/(home)/components/trending-new/TrendingNewChartBody";
import TrendingNewSkeleton from "./(pages)/(home)/components/trending-new/TrendingNewSkeleton";

export default async function Page(props: {
  searchParams?: Promise<{
    sort?: string;
    sortDirection?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const sort = searchParams?.sort || "";
  const sortDirection = searchParams?.sortDirection || "";
  return (
    <main className="w-full h-full flex">
      <section className="w-1/2">
        <TrendingNewChart>
          <TrendingNewChartHeader sort={sort} sortDirection={sortDirection} />
          <Suspense fallback={<TrendingNewSkeleton />}>
            <TrendingNewChartBody sort={sort} sortDirection={sortDirection} />
          </Suspense>
        </TrendingNewChart>
      </section>
    </main>
  );
}
