'use client'
import { StarIcon as StarIconOutlined } from "@heroicons/react/24/outline"
import { StarIcon as StarIconSolid} from "@heroicons/react/24/solid"

import { useState } from "react"

interface StarProps {
    value:number;
    selectedRating:number;
    handleClick:(value:number)=>void
}


function Star ({value,handleClick,selectedRating}:StarProps){
    return (
     <div className="relative w-8 h-8">
        <label className=' w-24 h-24'>
            <input type='radio' onClick={()=>handleClick(value)} value={value} name='star' className='opacity-0'/>
            {selectedRating===value?(<StarIconSolid  />):(<StarIconOutlined  />)}
        </label>
    </div>)

    // return <StarIcon className='hover:bg-black w-10'/>
} 


export default function RatingStars(){
    const [selectedRating,setSelectedRating]=useState(-1)
    function handleClick(value:number){
        return setSelectedRating(value)
    }
    return(
        <div className='flex gap-1 w-full relative '>
            {Array(5).fill('').map((_,i)=>{
                return <Star key={`star-${i}`}handleClick={handleClick} value={i+1} selectedRating={selectedRating}/>
            })}
           
        </div>
    )
}