'use client';
import Link from 'next/link';
import Image from 'next/image'
import { PlusCircleIcon, ListBulletIcon, ArrowTrendingUpIcon, UserCircleIcon } from '@heroicons/react/24/outline';
export default function SideNav() {
    return (

        <div className='flex flex-col items-start gap-6 mt-10 px-4 '>
            {/* Logo */}
            <div className="h-[150px] w-full">

                <Image
                    src="/steambook.svg"
                    width={70}
                    height={70}
                    alt="Logo"
                />
            </div>

            {/* Links */}
            <nav>

                <Link href='/create' className='flex hover:font-bold flexx gap-4'><PlusCircleIcon className='size-8' />Post Review</Link>
                <Link href='/reviews' className='flex hover:font-bold flexx gap-4' > <ListBulletIcon className="size-8" />My Reviews</Link>
                <Link href='/community' className='flex hover:font-bold flexx gap-4' ><ArrowTrendingUpIcon className='size-8' />Community</Link>
                <Link href='profile' className='flex hover:font-bold flexx gap-4'><UserCircleIcon className='size-8' />  Profile</Link>
            </nav>
        </div>)

}