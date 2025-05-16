import { HandThumbDownIcon, HandThumbUpIcon, HandRaisedIcon } from "@heroicons/react/24/solid"
import { PropsWithChildren } from "react"



export function HighScoreChip({ children }: PropsWithChildren) {
    return (<div className='flex justify-start items-center  bg-green-600 rounded-xl px-2 w-16 py-1'>
        <HandThumbUpIcon color='white' className=' w-4 ' />
        <p className='text-xs text-white flex-1 flex justify-center' > {children} </p>
    </div>)
}
export function MediumScoreChip({ children }: PropsWithChildren) {
    return (<div className='flex justify-start items-center  bg-orange-400 rounded-xl px-2 w-16 py-1'>
        <HandThumbUpIcon color='white' className=' w-4' />
        <p className=' flex-1 flex justify-center text-xs  text-white' > {children} </p>
    </div>)
}
export function LowScoreChip({ children }: PropsWithChildren) {
    return (<div className='flex justify-start items-center  bg-red-500 rounded-xl px-2 w-16 py-1'>
        <HandRaisedIcon color='white' className=' w-4' />
        <p className=' flex-1 flex justify-center text-xs  text-white' > {children} </p>
    </div>)
}

