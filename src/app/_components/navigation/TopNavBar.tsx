'use client';
import Link from 'next/link';
import Image from 'next/image'
import { PlusCircleIcon, ListBulletIcon, ArrowTrendingUpIcon, UserCircleIcon, HomeIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import TopNavBarStyles from './TopNavBarStyles.module.css'
import { usePathname } from 'next/navigation';

const LINKS = [
    {
        text: 'Home',
        href: '/',
        icon: <HomeIcon className='size-6' />
    },
    {
        text: 'Create Review',
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
]

export default function TopNavBar() {
    const pathname = usePathname();

    return (

        <header className={TopNavBarStyles.root}>
            {/* Logo */}
            <div className={TopNavBarStyles.logo}>


                <Image
                    src="/steambook.svg"
                    width={40}
                    height={40}
                    alt="Logo"
                />
                Steambook
            </div>

            {/* Links */}
            <nav className={TopNavBarStyles.nav}>
                {
                    LINKS.map(({ text, href, icon }) => {

                        const activeStyling = href === pathname ? TopNavBarStyles.active : '';
                        return (
                            <Link key={href} className={`${TopNavBarStyles.link} ${activeStyling}`} href={href}>

                                {icon}
                                {text}

                            </Link>
                        )
                    })
                }

            </nav>
            <div className={TopNavBarStyles.user}>
                <UserCircleIcon className={TopNavBarStyles.userIcon} />
                <span className='flex-1'>
                    Steve Smith
                </span>
                <ArrowRightStartOnRectangleIcon className='size-5 justify-self-end font-extrabold' />
            </div>

        </header>)

}