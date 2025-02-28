'use client';
import { usePathname } from 'next/navigation'
import { useDebouncedCallback } from "use-debounce";


export default function SearchBar() {
    const path = usePathname();

    const handleChange = useDebouncedCallback(async (term: string) => {
        console.log('attemping fetch')
        console.log({ path })
        const fetch_url = new URL('')
        console.log({ fetch_url })
        fetch_url.searchParams.set('term', term)
        console.log({ fetch_url })
        // const results = await fetch(fetch_url.href)
        // console.log(results)
    }, 100)
    return (
        <div className='relative flex flex-1 max-w-[600px]'>
            <label htmlFor='search' className='sr-only text-sm text-black'>Search</label>
            <input
                className='block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2'
                placeholder=''
                onChange={e => handleChange(e.target.value)}
            />
        </div>

    )

}