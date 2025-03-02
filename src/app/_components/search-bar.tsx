'use client';
import { usePathname } from 'next/navigation'
import { useDebouncedCallback } from "use-debounce";
import { useState } from 'react';

export default function SearchBar() {
    const path = usePathname();
    const [matches, setMatches] = useState([])

    const handleChange = useDebouncedCallback(async (term: string) => {
        if (term.length === 0) return setMatches([])
        const url = `/suggest?term=${term}&f=games&cc=US`
        const data = await fetch(url)
        const { results } = await data.json();
        setMatches(results)
    }, 400)
    return (
        <div className='relative'>
            Game Search:
            <div className='relative flex flex-1 max-w-[600px]'>
                <label htmlFor='search' className='sr-only text-sm text-black'>Search</label>
                <input
                    className='block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2'
                    placeholder=''
                    onChange={e => handleChange(e.target.value)}
                    onBlur={() => setMatches([])}
                    onFocus={e => handleChange(e.target.value)}
                />


            </div>
            {/* RESULTS */}
            {matches.length > 0 && (
                <div className='absolute flex flex-col min-h-[130px] gap-5 bg-white'>

                    {matches.map(({ id, name, imgSrc }) => {
                        return (
                            <div className='flex  hover:cursor-pointer hover:opacity-90 hover:font-semibold'>
                                <div>

                                    <img src={imgSrc} className=' h-24' />
                                    <p className=' '>
                                        {name}
                                    </p>
                                </div>

                            </div>
                        )
                    })}
                </div>
            )}

        </div>

    )

}