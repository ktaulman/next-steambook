'use client';
import Link from 'next/link';
import Image from 'next/image'
import { PlusCircleIcon, ListBulletIcon, ArrowTrendingUpIcon, UserCircleIcon, HomeIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import sideNavStyles from './sideNavStyles.module.css'
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

export default function SideNav() {
    const pathname = usePathname();
    console.log({ pathname })
    return (

        <aside className={sideNavStyles.root}>
            {/* Logo */}
            <Link href='/' className={sideNavStyles.logo}>


                <Image
                    src="/steambook.svg"
                    width={40}
                    height={40}
                    alt="Logo"
                />
                Steambook
            </Link>

            {/* Links */}
            <nav className={sideNavStyles.nav}>
                {
                    LINKS.map(({ text, href, icon }) => {

                        const activeStyling = href === pathname ? sideNavStyles.active : '';
                        return (
                            <Link key={href} className={`${sideNavStyles.link} ${activeStyling}`} href={href}>

                                {icon}
                                {text}

                            </Link>
                        )
                    })
                }

            </nav>
            <div className={sideNavStyles.footer}>
                <UserCircleIcon className={sideNavStyles.userIconFooter} />
                <span className='flex-1'>
                    Steve Smith
                </span>
                <ArrowRightStartOnRectangleIcon className='size-5 justify-self-end font-extrabold' />
            </div>

        </aside>)

}