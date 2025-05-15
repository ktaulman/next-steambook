'use client';
import Link from 'next/link';
import Image from 'next/image'
import { PlusCircleIcon, ListBulletIcon, ArrowTrendingUpIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const LINKS = [
    {
        text: 'Post Review',
        href: '/create',
        icon: <PlusCircleIcon className='size-6' />
    },
    {
        text: 'My Reviews',
        href: '/reviews',
        icon: <ListBulletIcon className='size-6' />
    },
    {
        text: 'Community',
        href: '/community',
        icon: <ArrowTrendingUpIcon className='size-6' />
    },
    {
        text: 'Profile',
        href: '/profile',
        icon: <UserCircleIcon className='size-6' />
    },
]

export default function SideNav() {

    return (

        <div className='flex flex-col items-start gap-6 mt-10 px-4 '>
            {/* Logo */}
            <div className="h-[50px] w-full mb-20">

                <Image
                    src="/steambook.svg"
                    width={50}
                    height={50}
                    alt="Logo"
                />
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-10">
                {
                    LINKS.map(({ text, href, icon }) => (
                        <Link key={href} className='flex items-center hover:font-bold  gap-4 text-sm  ' href={href}>{icon} {text} </Link>
                    ))
                }

            </nav>
        </div>)

}