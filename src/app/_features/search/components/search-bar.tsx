'use client';
import { useState, useContext } from 'react';
import { motion } from "motion/react"
import { usePathname } from 'next/navigation'
import { useDebouncedCallback } from "use-debounce";
import { SteamReviewChip, SteambookReviewChip } from '@/app/_components';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { SearchResult, SearchResultCardProps } from '../interfaces/search-interfaces'
import { SearchContext } from '../context/search-provider';

function SearchResultCard({ id, name, scorePercentage, totalReviews, imgSrc, disableHover }: SearchResultCardProps) {

    return (
        <div key={id} className={`flex w-full justify-between ${!disableHover ? 'hover:cursor-pointer' : ''} hover:opacity-90 ${!disableHover ? 'hover:font-semibold' : ''}  p-4 max-w-[600px] bg-white `}>
            <div className='flex flex-col gap-5'>
                <h2 className='font-semibold text-base'>
                    {name}
                </h2>
                <SteamReviewChip
                    scorePercentage={`${scorePercentage}%`}
                    totalReviews={totalReviews}
                />
                {/* <SteambookReviewChip
                    scoreStars="4.5"
                    totalReviews={100}
                /> */}
            </div>
            <img src={imgSrc} className=' h-24' />

        </div>)
}



export default function SearchBarWithContext() {
    const { results, selected } = useContext(SearchContext)

    const handleChange = useDebouncedCallback(async (term: string) => {
        if (term.length === 0) return results.setResults([])
        const url = `/suggest?term=${term}&f=games&cc=US`
        const data = await fetch(url)
        const res = await data.json();
        results.setResults(res.results)
    }, 600)

    const handleBoxClick = () => {
        if (selected !== null) selected.setSelected(null);
    }
    const handleSearchResultCardClick = (i: number) => {
        const card = results.results[i]
        selected.setSelected({ ...card })
        results.setResults([])
    }
    //Animations

    return (
        <div className='relative h-30  '>

            {selected.selected === null ? (
                <input
                    className='block w-full  pl-3 outline-none h-24 text-xl focus:font-bold border-b-2 border-b-black'
                    placeholder='Search Game Here'
                    onChange={e => handleChange(e.target.value)}
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
                        id={selected.selected.id}
                        name={selected.selected.name}
                        imgSrc={selected.selected.imgSrc}
                        scorePercentage={selected.selected.scorePercentage}
                        totalReviews={selected.selected.totalReviews}
                        disableHover={true}
                    />
                    <button className='text-red-800 w-8 h-8 cursor-pointer hover:text-red-500' onClick={() => selected.setSelected(null)}> <XCircleIcon /> {''}</button>
                </motion.div>
            )}



            {/* RESULTS */}
            {results.results.length > 0 && (
                <div className=' absolute flex flex-col  min-h-[130px]  gap-0  z-30  w-full px-6'>

                    {results.results.map(({ id, name, imgSrc, scorePercentage, totalReviews }, i) => {

                        return (
                            <div key={id + 'div_wrapper bg-white '} onClick={() => handleSearchResultCardClick(i)}>
                                <SearchResultCard 
                                id={id} 
                                    name={name}
                                    imgSrc={imgSrc} 
                                scorePercentage={scorePercentage} 
                                totalReviews={totalReviews} />
                            </div>
                        )
                    })}
                </div>
            )}

        </div>

    )

}