import Chart from '@/app/_components/charts/Chart'
import { sql } from '@/app/_db/db'
import { HandThumbDownIcon, HandThumbUpIcon, DocumentChartBarIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';


async function getTopNewGames() {
    try {
        const timeAtThirtyMinutesAgo = new Date(Date.now() - (30 * 60 * 1000))
        const results = await sql`
            SELECT title, store_href, release_date, score, number_reviews
            FROM steambook.top_new_apps
            WHERE "time" >= ${timeAtThirtyMinutesAgo}
            ORDER BY "release_date" DESC
            LIMIT 20
            `
        // SELECT title, store_href, store_imgSrc,release_date, score, number_reviews
        return results;
    } catch (e) {
        console.log(e) //TODO: implement error logging 
        return []
    }
}

function getScore(score: number): { highScore: boolean, mediumScore: boolean, lowScore: boolean } {
    const result = { highScore: false, mediumScore: false, lowScore: false }
    if (score >= 80) result.highScore = true;
    else if (score <= 79 && score >= 65) result.mediumScore = true;
    else result.lowScore = true;
    return result
}

export default async function TrendingNewChart() {
    const newGames = await getTopNewGames();
    if (!newGames || newGames.length === 0) return <h2>No Results Found</h2> //If there's no results to

    return (
        <Chart>
            <Chart.Title>Top New Games</Chart.Title>
            <Chart.Grid>
                <Chart.GridBody>
                    <Chart.GridRow>
                        {
                            ['Title', 'Release Date', 'Score', "Reviews"].map((el, i) => (
                                <Chart.GridHeader key={i}>
                                    {el}
                                </Chart.GridHeader>
                            ))
                        }
                    </Chart.GridRow>

                    {
                        newGames
                            .map(({ title, store_href, release_date, score, number_reviews }, i) => {
                                //make date transform here
                                const readableDate = new Date(release_date).toLocaleDateString()

                                const { highScore, mediumScore, lowScore } = getScore(score);

                                return (
                                    <Chart.GridRow hoverable key={'new_row' + i}>
                                        <Chart.GridCell key={'cell_title' + i}><a href={store_href} target="_blank">{title}</a></Chart.GridCell>
                                        <Chart.GridCell key={'cell_date' + i}>{readableDate}</Chart.GridCell>
                                        <Chart.GridCell key={'cell_score' + i}>
                                            {highScore && <HandThumbUpIcon color='green' className='h-6 w-6' />}
                                            {mediumScore && <HandThumbUpIcon color='orange' className='h-6 w-6' />}
                                            {lowScore && <HandThumbDownIcon color='red' className='h-6 w-6' />}
                                            {score}
                                        </Chart.GridCell>
                                        <Chart.GridCell key={'cell_reviews' + i}>{number_reviews}<DocumentChartBarIcon className='h-6 w-6' /></Chart.GridCell>
                                    </Chart.GridRow>
                                )
                            }
                            )
                    }
                </Chart.GridBody>
            </Chart.Grid>
        </Chart>
    )
}