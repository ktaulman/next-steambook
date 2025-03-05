'use client';
import { usePathname } from 'next/navigation'
import { useDebouncedCallback } from "use-debounce";
import { useState } from 'react';
import SteamReviewChip from '@/app/_components/chips/steam-review-chip';
import SteambookReviewChip from '@/app/_components/chips/steambook-review-chip';
import { XCircleIcon } from '@heroicons/react/24/outline';

interface SearchResult {
    id: number;
    name: string;
    scorePercentage: number;
    totalReviews: number;
    imgSrc: string;
}

interface SearchResultCardProps extends SearchResult {
    disableHover: boolean
}


function SearchResultCard({ id, name, scorePercentage, totalReviews, imgSrc, disableHover }: SearchResultCardProps) {
    return (
        <div key={id} className={`flex w-full justify-between ${!disableHover ? 'hover:cursor-pointer' : ''} hover:opacity-90 ${!disableHover ? 'hover:font-semibold' : ''}  p-4 max-w-[600px]`}>
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
    const [selected, setSelected] = useState(null);

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

    return (
        <div className='relative '>

            <div className='relative flex flex-1 w-[650px] items-start h-46'>
                {!selected ? (
                    <input
                        className='block w-full rounded-md  py-[9px] pl-3 outline-none h-24 text-xl focus:font-bold'
                        placeholder='Search Game Here'
                        onChange={e => handleChange(e.target.value)}
                        // onBlur={() => setMatches([])}
                        onFocus={e => handleChange(e.target.value)}
                    />
                ) : (
                    <div className='block w-full rounded-md  py-[9px] pl-0 pt-4 text-sm outline-none h-36 flex'>
                        <SearchResultCard
                            id={selected.id} name={selected.name} imgSrc={selected.imgSrc} scorePercentage={selected.scorePercentage} totalReviews={selected.totalReviews}
                        />
                        <button className='text-red-800 w-8 h-8 cursor-pointer hover:text-red-500' onClick={() => setSelected(null)}> <XCircleIcon /> {''}</button>
                    </div>
                )}


            </div>
            {/* RESULTS */}
            {matches.length > 0 && (
                <div className='-mt-16 absolute flex flex-col min-h-[130px] w-[600px] gap-5 bg-white z-30  rounded'>

                    {matches.map(({ id, name, imgSrc, scorePercentage, totalReviews }, i) => {

                        return (
                            <div key={id + 'div_wrapper'} onClick={() => handleSearchResultCardClick(i)}>
                                <SearchResultCard id={id} name={name} imgSrc={imgSrc} scorePercentage={scorePercentage} totalReviews={totalReviews} />
                            </div>
                        )
                    })}
                </div>
            )}

        </div>

    )

}