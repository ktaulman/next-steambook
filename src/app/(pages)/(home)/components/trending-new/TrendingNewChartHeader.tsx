'use client'
import Chart from "@/app/_components/charts/Chart"
import { ArrowsUpDownIcon } from "@heroicons/react/16/solid";
import { usePathname } from "next/navigation"
import { useState } from "react";
import styles from '../../styles.module.css'
// up arrow ,down arrow, make headers {title, column,direction}

export default function TrendingNewChartHeader() {
    const INITIAL_HEADER_STATE = [
        {
            title: 'Title',
            column: 'title',
            direction: null
        },
        {
            title: 'Release',
            column: 'release_date',
            direction: null
        },
        {
            title: 'Score',
            column: 'score',
            direction: null
        },
        {
            title: 'Reviews',
            column: '',
            direction: null
        },
    ]
    const pathname = usePathname();
    const [hovering, setHovering] = useState(false);
    function showSorting() {
        return setHovering(true);
    }
    function hideSorting() {
        return setHovering(false)
    }
    return (
        <Chart.GridHead>

            <Chart.GridRow>
                {
                    INITIAL_HEADER_STATE.map(({ title, direction, column }, i) => {

                        return (
                            <Chart.GridHeader key={`${i}`}>
                                <div className={`${hovering ? styles.hovering : styles.notHovering} flex`} onMouseEnter={showSorting} onMouseLeave={hideSorting}>


                                    {title}
                                    {hovering && (
                                        <ArrowsUpDownIcon className="size-5 ml-2 cursor-pointer" />
                                    )}
                                    {/* {!direction && <ArrowsUpDownIcon className='size-5 ml-2' />} */}
                                </div>



                            </Chart.GridHeader>
                        )
                    })
                }
            </Chart.GridRow>
        </Chart.GridHead>
    )
}