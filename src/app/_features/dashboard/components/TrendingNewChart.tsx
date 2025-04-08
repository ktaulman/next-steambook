import Chart from '@/app/_components/charts/Chart'
import { sql } from '@/app/_db/db'


async function getTopNewGames() {
    try {
        const timeAtThirtyMinutesAgo = new Date(Date.now() - (30 * 60 * 1000))
        const results = await sql`
            SELECT *
            FROM steambook.top_new_apps
            WHERE "time" >= ${timeAtThirtyMinutesAgo}
            ORDER BY "time" 
            LIMIT 20
            `
        return results;
    } catch (e) {
        console.log(e) //TODO: implement error logging 
        return []
    }
}

export default async function TrendingNewChart() {
    const newGames = await getTopNewGames();
    if (!newGames || newGames.length === 0) return <h2>No Results Found</h2> //If there's no results to

    const headers = Object.keys(newGames[0])


    return (
        <Chart>
            <Chart.Title>Chart</Chart.Title>
            <Chart.Grid>
                <Chart.GridBody>
                    <Chart.GridRow>
                        {
                            headers.map(el => (<Chart.GridHeader>
                                {el}
                            </Chart.GridHeader>))
                        }

                    </Chart.GridRow>

                    {
                        newGames
                            .map((el, i) => (<Chart.GridRow>
                                {
                                    Object.values(el).map((cellValue, index) => {
                                        console.log({ cellValue })
                                        return (
                                            <Chart.GridCell key={cellValue + '_Grid_Cell'}> {JSON.stringify(cellValue)}</Chart.GridCell>
                                        )
                                    })
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