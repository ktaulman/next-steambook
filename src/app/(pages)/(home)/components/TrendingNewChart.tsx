import Chart from '@/app/_components/charts/Chart'
import { HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/solid';
import { Box, Typography } from '@mui/material';
import { getScore } from '../utils';
import { getTopNewGames } from '../db/getTopNewGames';
import { refreshTopNewGames } from "../db/refreshTopNewGames"
import TrendingNewChartRefreshButton from './TrendingNewChartRefreshButton';


export default async function TrendingNewChart() {
    const newGames = await getTopNewGames();


    // if (!newGames || newGames.length === 0) return <h2>No Results Found</h2> //If there's no results to
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
                                        <Chart.GridCell key={'cell_title' + i}><a style={{ letterSpacing: '1.25px', fontWeight: 600 }} href={store_href} target="_blank">{title}</a></Chart.GridCell>
                                        <Chart.GridCell key={'cell_date' + i}>
                                            <Typography component='p' variant="body2">

                                                {readableDate}
                                            </Typography>
                                        </Chart.GridCell>
                                        <Chart.GridCell key={'cell_score' + i}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: "80%" }}>

                                                {highScore && (
                                                    <>
                                                        <HandThumbUpIcon color='green' className='h-4 w-4' />
                                                        <Typography variant='body2' component='p' fontWeight={600} sx={{ color: 'green' }}>{score}</Typography>
                                                    </>
                                                )}
                                                {mediumScore && (
                                                    <>
                                                        <HandThumbUpIcon color='orange' className='h-4 w-4' />
                                                        <Typography variant='body2' component='p' fontWeight={600} sx={{ color: 'orange' }}>{score}</Typography>
                                                    </>
                                                )}
                                                {lowScore && (
                                                    <>
                                                        <HandThumbDownIcon color='red' className='h-4 w-4' />
                                                        <Typography variant='body2' component='p' fontWeight={600} sx={{ color: 'red' }}>{score}</Typography>
                                                    </>
                                                )}
                                            </Box>

                                        </Chart.GridCell>
                                        <Chart.GridCell key={'cell_reviews' + i}>
                                            <Box sx={{ display: 'flex', justifyContent: "center", width: '100%' }}>
                                                <Typography component='p' variant={'body2'}>
                                                    {number_reviews}
                                                </Typography>
                                            </Box>
                                        </Chart.GridCell>
                                    </Chart.GridRow>
                                )
                            }
                            )
                    }
                </Chart.GridBody>
            </Chart.Grid>

            <TrendingNewChartRefreshButton disabled={newGames.length > 0} onClick={refreshTopNewGames} />


        </Chart>
    )
}