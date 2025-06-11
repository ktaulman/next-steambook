"use client";
import Chart from "@/app/_components/charts/Chart";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import {
  ArrowsUpDownIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/solid";
// up arrow ,down arrow, make headers {title, column,direction}
const INITIAL_HEADER_STATE = [
  {
    title: "Title",
    column: "title",
  },
  {
    title: "Release",
    column: "release_date",
  },
  {
    title: "Score",
    column: "score",
  },
  {
    title: "Reviews",
    column: "number_reviews",
  },
];

export default function TrendingNewChartHeader({
  sort,
  sortDirection,
}: {
  sort: string;
  sortDirection: string;
}) {
  const pathname = usePathname();
  const { replace } = useRouter();

  const searchParams = useSearchParams();
  function handleSortingClick(column) {
    console.log("clicked");
    //STEP 1: Generate new
    const params = new URLSearchParams(searchParams);
    //click notSelect column --> ASC
    if (sort === column && sortDirection === "ASC") {
      console.log("if");
      params.set("sort", column);
      params.set("sortDirection", "DESC");
    } else if (sort === column && sortDirection === "DESC") {
      console.log("else if");
      params.delete("sort");
      params.delete("sortDirection");
    } else {
      console.log("else");
      params.set("sort", column);
      params.set("sortDirection", "ASC");
    }
    replace(`${pathname}?${params.toString()}`);
    //click select column ASC ---> DESC
    //click select Column DESC --> reset
  }

  return (
    <Chart.GridHead>
      <Chart.GridRow>
        {INITIAL_HEADER_STATE.map(({ title, column }, i) => {
          return (
            <Chart.GridHeader key={`${i}`}>
              <div className="flex">
                {title}
                <button onClick={() => handleSortingClick(column)}>
                  {(!sort || sort !== column) && (
                    <ArrowsUpDownIcon className="size-5 ml-2 opacity-10 hover:opacity-100 cursor-pointer" />
                  )}
                  {sort === column && sortDirection === "ASC" && (
                    <ArrowUpIcon className="size-4 ml-2 font-bold" />
                  )}
                  {sort === column && sortDirection === "DESC" && (
                    <ArrowDownIcon className="size-4 ml-2 font-bold" />
                  )}
                </button>
              </div>
            </Chart.GridHeader>
          );
        })}
      </Chart.GridRow>
    </Chart.GridHead>
  );
}
