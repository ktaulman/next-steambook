import Chart from "@/app/_components/charts/Chart";
import { PropsWithChildren } from "react";
import TrendingNewChartRefreshButton from "./TrendingNewChartRefreshButton";

export default async function TrendingNewChart({
  children,
}: PropsWithChildren) {
  return (
    <Chart>
      {/* <Chart.Title>Top New Games</Chart.Title> */}
      <Chart.Grid>{children}</Chart.Grid>
      <TrendingNewChartRefreshButton />
    </Chart>
  );
}
