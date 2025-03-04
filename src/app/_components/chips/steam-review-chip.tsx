'use client';
import Image from 'next/image'

interface SteamReviewChipProps {
    scorePercentage: string;
    totalReviews: number | string;
}

export default function SteamReviewChip({ scorePercentage, totalReviews }: SteamReviewChipProps) {
    return (
        <div className='flex rounded-full bg-[#136FA1] text-white items-center w-[180px]'>
            <Image
                src={'/logo_steam.svg'}
                width={20} height={20} alt='steam small logo'
            />
            <p className="text-xs pl-1 justify-self-end">
                {scorePercentage}, {totalReviews.toLocaleString()} Reviews
            </p>

        </div>
    )
}