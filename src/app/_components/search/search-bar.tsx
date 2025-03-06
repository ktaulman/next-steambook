'use client';
import { usePathname } from 'next/navigation'
import { useDebouncedCallback } from "use-debounce";
import { useState } from 'react';
import SteamReviewChip from '@/app/_components/chips/steam-review-chip';
import SteambookReviewChip from '@/app/_components/chips/steambook-review-chip';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { motion } from "motion/react"

interface SearchResult {
    id: number;
    name: string;
    scorePercentage: number;
    totalReviews: number;
    imgSrc: string;
}

interface SearchResultCardProps extends SearchResult {
    disableHover?: boolean
}


function SearchResultCard({ id, name, scorePercentage, totalReviews, imgSrc, disableHover }: SearchResultCardProps) {
    return (
        <div key={id} className={`flex w-full justify-between ${!disableHover ? 'hover:cursor-pointer' : ''} hover:opacity-90 ${!disableHover ? 'hover:font-semibold' : ''}  p-4 max-w-[600px] bg-white `}>
            <div className='flex flex-col gap-2'>
                <h2 className='font-semibold'>
                    {name}
                </h2>
                <SteamReviewChip
                    scorePercentage={`${scorePercentage}%`}
                    totalReviews={totalReviews}
                />
                <SteambookReviewChip
                    scoreStars="4.5"
                    totalReviews={100}
                />
            </div>
            <img src={imgSrc} className=' h-24' />

        </div>)
}



export default function SearchBar() {
    const path = usePathname();
    const [matches, setMatches] = useState([])
    const [selected, setSelected] = useState<SearchResult | null>(null);

    const handleChange = useDebouncedCallback(async (term: string) => {
        if (term.length === 0) return setMatches([])
        const url = `/suggest?term=${term}&f=games&cc=US`
        const data = await fetch(url)
        const { results } = await data.json();
        setMatches(results)
    }, 400)

    const handleBoxClick = () => {
        if (selected !== null) setSelected(null);
    }
    const handleSearchResultCardClick = (i: number) => {
        setSelected(matches[i])
        setMatches([])
    }
    //Animations

    return (
        <div className='relative h-30  '>

            {!selected ? (
                <input
                    className='block w-full  pl-3 outline-none h-24 text-xl focus:font-bold border-b-2 border-b-black'
                    placeholder='Search Game Here'
                    onChange={e => handleChange(e.target.value)}
                    // onBlur={() => setMatches([])}
                    onFocus={e => handleChange(e.target.value)}
                />
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        transition: { duration: 0.3 }
                    }}

                    className='w-full rounded-md  py-[9px] pl-0 pt-4 text-sm outline-none  flex '>
                    <SearchResultCard
                        id={selected.id}
                        name={selected.name}
                        imgSrc={selected.imgSrc}
                        scorePercentage={selected.scorePercentage}
                        totalReviews={selected.totalReviews}
                        disableHover={true}
                    />
                    <button className='text-red-800 w-8 h-8 cursor-pointer hover:text-red-500' onClick={() => setSelected(null)}> <XCircleIcon /> {''}</button>
                </motion.div>
            )}



            {/* RESULTS */}
            {matches.length > 0 && (
                <div className=' absolute flex flex-col  min-h-[130px]  gap-0  z-30  w-full px-6'>

                    {matches.map(({ id, name, imgSrc, scorePercentage, totalReviews }, i) => {

                        return (
                            <div key={id + 'div_wrapper bg-white '} onClick={() => handleSearchResultCardClick(i)}>
                                <SearchResultCard id={id} name={name} imgSrc={imgSrc} scorePercentage={scorePercentage} totalReviews={totalReviews} />
                            </div>
                        )
                    })}
                </div>
            )}

        </div>

    )

}