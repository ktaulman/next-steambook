'use client'
import Chart from "@/app/_components/charts/Chart"
import { useState } from "react"


export default function TrendingNewChartRefreshButton({ disabled, onClick }: { disabled: boolean, onClick: () => void }) {
    console.log('Trending New CLIENT COMPONENT')
    const [pending, setPending] = useState(false)
    function handleClick() {
        setPending(true)
        setTimeout(async () => {

            await onClick();
            setPending(false)
        }, 2000)
    }
    if (pending) return <Chart.GridButton>Loading...</Chart.GridButton>
    return (
        <Chart.GridButton disabled={disabled} onClick={async () => handleClick()}> Refresh</Chart.GridButton>
    )
}