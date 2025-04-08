import Chart from '@/app/_components/charts/Chart'
import { sql } from '@/app/_db/db'
import Link from 'next/link';


async function getTopNewGames() {
    try {
        const timeAtThirtyMinutesAgo = new Date(Date.now() - (30 * 60 * 1000))
        const results = await sql`
            SELECT title, store_href, release_date, score, number_reviews
            FROM steambook.top_new_apps
            WHERE "time" >= ${timeAtThirtyMinutesAgo}
            ORDER BY "time" 
            LIMIT 20
            `
        // SELECT title, store_href, store_imgSrc,release_date, score, number_reviews
        return results;
    } catch (e) {
        console.log(e) //TODO: implement error logging 
        return []
    }
}

export default async function TrendingNewChart() {
    const newGames = await getTopNewGames();
    if (!newGames || newGames.length === 0) return <h2>No Results Found</h2> //If there's no results to
    return (
        <Chart>
            <Chart.Title>Top New</Chart.Title>
            <Chart.Grid>
                <Chart.GridBody>
                    {/* Header Row */}
                    <Chart.GridRow>
                        <Chart.GridHeader>Title</Chart.GridHeader>
                        <Chart.GridHeader>Release Date</Chart.GridHeader>
                        <Chart.GridHeader>Score</Chart.GridHeader>
                        <Chart.GridHeader>Reviews</Chart.GridHeader>
                    </Chart.GridRow>
                    {/* Content Rows */}
                    {
                        newGames
                            .map(({ title, store_href, release_date, score, number_reviews }) => (
                                <Chart.GridRow>
                                    <Chart.GridCell><a href={store_href}>{title}</a></Chart.GridCell>
                                    <Chart.GridCell>{release_date}</Chart.GridCell>
                                    <Chart.GridCell>{score}</Chart.GridCell> {/**/}
                                    <Chart.GridCell>{number_reviews}</Chart.GridCell> {/**/}
                                </Chart.GridRow>
                            )
                            )
                    }
                </Chart.GridBody>
            </Chart.Grid>
        </Chart>
    )
}