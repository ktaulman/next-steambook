
'use client'

export default function Spinner() {

    return (
        <div className='h-8 w-8 border-sky-500 border-slate-600 border-[5px] animate-spin rounded-full border-t-transparent'>
            <div className='sr-only'>
                Loading...
            </div>
        </div>
    );
}