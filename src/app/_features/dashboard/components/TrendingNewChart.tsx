import Chart from '@/app/_components/charts/Chart'

export default function TrendingNewChart() {
    const results = fetch('/top-new')
    console.log(results)
    return (
        <Chart>
            <Chart.Title>Chart</Chart.Title>
            <Chart.Grid>
                <Chart.GridBody>
                    <Chart.GridRow>
                        <Chart.GridHeader>
                            1
                        </Chart.GridHeader>
                        <Chart.GridHeader>
                            2
                        </Chart.GridHeader>
                        <Chart.GridHeader>
                            3
                        </Chart.GridHeader>
                    </Chart.GridRow>

                    {
                        Array(5).fill(null)
                            .map((el, i) => (<Chart.GridRow>
                                {
                                    Array(3).fill(null).map((el, index) => (
                                        <Chart.GridCell> {i} x {index}</Chart.GridCell>
                                    ))
                                }
                            </Chart.GridRow>
                            )
                            )
                    }
                </Chart.GridBody>
            </Chart.Grid>
        </Chart>
    )
}