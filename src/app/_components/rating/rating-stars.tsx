'use client'
import { StarIcon as StarIconOutlined } from "@heroicons/react/24/outline"
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid"
import { motion } from 'motion/react'
import { useState } from "react"

interface StarProps {
    value: number;
    selectedRating: number;
    handleClick: (value: number) => void
}


function Star({ value, handleClick, selectedRating }: StarProps) {
    return (
        <label className=' w-12 h-12 cursor-pointer dark:text-white'>
            <input type='radio' onClick={() => handleClick(value)} value={value} name='review_starRating' className=' absolute opacity-0 cursor-none ' />
            {selectedRating === value ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.3 } }}
                >
                    <StarIconSolid className='text-amber-300' />
                </motion.div>

            ) : (
                <motion.span>
                    <StarIconOutlined className='text-amber-300' />
                </motion.span>

            )}
        </label>
    )

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