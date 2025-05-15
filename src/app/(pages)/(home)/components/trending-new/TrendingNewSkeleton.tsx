import Chart from "@/app/_components/charts/Chart";

export default function TrendingNewSkeleton() {
    const rows = [0, 1, 2, 3]
    return <Chart.GridBody>
        <Chart.GridRow>
            <Chart.GridCell>Loading.....</Chart.GridCell>
        </Chart.GridRow>
    </Chart.GridBody>
}