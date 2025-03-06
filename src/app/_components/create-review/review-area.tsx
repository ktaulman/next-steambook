'use client';

import { useState } from 'react'



export default function ReviewArea() {
    const [characterCount, setCharacterCount] = useState(0);
    function updateCharacterCounter(e) {
        return setCharacterCount(e.target.value.length)
    }
    const MAX_LENGTH = 240;
    return (<div>
        <label htmlFor='review_text' className='block font-bold text-2xl mb-3'>Review</label>
        <textarea onChange={updateCharacterCounter} name='review_text' id='review_text' className='w-100 border-2 h-80 p-2' maxLength={MAX_LENGTH} />
        <p className={`${(MAX_LENGTH - characterCount) < 10 ? "text-red-400" : ''}`}>{MAX_LENGTH - characterCount}</p>
    </div>)
}