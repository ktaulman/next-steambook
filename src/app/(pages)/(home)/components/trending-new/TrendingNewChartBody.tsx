import { listTopNewGrame } from "../../db/listTopNewGames"
import Chart from "@/app/_components/charts/Chart";
import { getScore } from "../../utils";
import { HighScoreChip, MediumScoreChip, LowScoreChip } from "../score-chips/chips";
export default async function TrendingNewChartBody() {
    const newGames = await listTopNewGrame();

    return (
        <Chart.GridBody>
            {
                newGames
                    .map(({ title, store_href, release_date, score, number_reviews }, i) => {
                        //make date transform here
                        const readableDate = new Date(release_date).toLocaleDateString()

                        const { highScore, mediumScore, lowScore } = getScore(score);
                        return (


                            <Chart.GridRow hoverable key={'new_row' + i}>
                                <Chart.GridCell key={'cell_title' + i}><a className='hover:text-sky-700' href={store_href} target="_blank">{title}</a></Chart.GridCell>
                                <Chart.GridCell key={'cell_date' + i}>
                                    {readableDate}
                                </Chart.GridCell>
                                <Chart.GridCell key={'cell_score' + i}>
                                    <div className='flex'>

                                        {highScore && (
                                            <HighScoreChip>{score}</HighScoreChip>
                                        )}
                                        {mediumScore && (
                                            <MediumScoreChip>{score}</MediumScoreChip>
                                        )}
                                        {lowScore && (
                                            <LowScoreChip>{score}</LowScoreChip>
                                        )}
                                    </div>
                                </Chart.GridCell>
                                <Chart.GridCell key={'cell_reviews' + i}>
                                    {number_reviews}
                                </Chart.GridCell>
                            </Chart.GridRow>

                        )
                    }
                    )
            }
        </Chart.GridBody>
    )
}