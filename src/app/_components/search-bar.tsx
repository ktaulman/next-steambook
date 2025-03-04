'use client';
import { usePathname } from 'next/navigation'
import { useDebouncedCallback } from "use-debounce";
import { useState } from 'react';
import SteamReviewChip from '@/app/_components/chips/steam-review-chip';
import SteambookReviewChip from '@/app/_components/chips/steambook-review-chip';
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

    return (
        <div className='relative '>

            <div className='relative flex flex-1 w-[600px]' onClick={() => console.log()}>
                <label htmlFor='search' className='sr-only text-sm text-black'>Search</label>
                {!selected ? (
                    <input
                        className='block w-full rounded-md border border-gray-200 py-[9px] pl-2 outline-2 h-24 text-xl'
                        placeholder='Search Game Here'
                        onChange={e => handleChange(e.target.value)}
                        // onBlur={() => setMatches([])}
                        onFocus={e => handleChange(e.target.value)}
                    />
                ) : (
                    <div className='block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 h-24'>
                        {
                            'Select '
                        }
                        <button className=''> X </button>
                    </div>
                )}


            </div>
            {/* RESULTS */}
            {matches.length > 0 && (
                <div className='mt-2 absolute flex flex-col min-h-[130px] gap-5 bg-white z-30 border-2 border-black rounded'>

                    {matches.map(({ id, name, imgSrc, scorePercentage }) => {
                        return (
                            <div className='flex w-full justify-between hover:cursor-pointer hover:opacity-90 hover:font-semibold  p-4 max-w-[600px]'>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='font-semibold'>
                                        {name}
                                    </h2>
                                    <SteamReviewChip
                                        scorePercentage={`${scorePercentage}%`}
                                        totalReviews={100000}
                                    />
                                    <SteambookReviewChip
                                        scoreStars="4.5"
                                        totalReviews={100}
                                    />
                                </div>
                                <img src={imgSrc} className=' h-24' />

                            </div>
                        )
                    })}
                </div>
            )}

        </div>

    )

}