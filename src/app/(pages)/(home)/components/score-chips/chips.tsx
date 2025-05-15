import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/solid"
import { PropsWithChildren } from "react"



export function HighScoreChip({ children }: PropsWithChildren) {
    return (<>
        <HandThumbUpIcon color='green' className='h-4 w-4' />
        <p className='text-sm font-extrabold text-green-600' > {children} </p>
    </>)
}
export function MediumScoreChip({ children }: PropsWithChildren) {
    return (<>
        <HandThumbUpIcon color='orange' className='h-4 w-4' />
        <p className='text-sm font-extrabold text-orange-600' > {children} </p>
    </>)
}
export function LowScoreChip({ children }: PropsWithChildren) {
    return (<>
        <HandThumbDownIcon color='red' className='h-4 w-4' />
        <p className='text-sm font-extrabold text-red-600' > {children} </p>
    </>)
}

