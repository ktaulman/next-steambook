'use client'
import { StarIcon as StarIconOutlined } from "@heroicons/react/24/outline"
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid"

import { useState } from "react"

interface StarProps {
    value: number;
    selectedRating: number;
    handleClick: (value: number) => void
}


function Star({ value, handleClick, selectedRating }: StarProps) {
    return (
        <label className=' w-12 h-12'>
            <input type='radio' onClick={() => handleClick(value)} value={value} name='star' className=' absolute opacity-0 cursor-none ' />
            {selectedRating === value ? (<StarIconSolid className='text-amber-300' />) : (<StarIconOutlined className='text-amber-300' />)}
        </label>
    )

    // return <StarIcon className='hover:bg-black w-10'/>
}


export default function RatingStars() {
    const [selectedRating, setSelectedRating] = useState(-1)
    function handleClick(value: number) {
        return setSelectedRating(value)
    }
    return (
        <div className='flex gap-1 w-full relative '>
            {Array(5).fill('').map((_, i) => {
                return <Star key={`star-${i}`} handleClick={handleClick} value={i + 1} selectedRating={selectedRating} />
            })}

        </div>
    )
}