'use client';
import Image from 'next/image'

interface SteambookReviewChipProps {
    scoreStars: string;
    totalReviews: number | string;
}

export default function SteambookReviewChip({ scoreStars, totalReviews }: SteambookReviewChipProps) {
    return (
        <div className='flex rounded-full bg-[#56CF7E] text-black items-center w-[180px]'>
            <Image
                src={'/steambook.svg'}
                width={20} height={20} alt='steam small logo'
            />
            <p className="text-xs pl-1 justify-self-end">
                {scoreStars} Stars, {totalReviews.toLocaleString()} Reviews
            </p>

        </div>
    )
}