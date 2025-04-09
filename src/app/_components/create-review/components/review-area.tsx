'use client';

import { ChangeEventHandler, PropsWithChildren, useState } from 'react'

function ReviewTextAreaLabel() {
    return <label htmlFor='review_text' className='block font-bold text-2xl mb-3'>Review</label>
}
function ReviewTextArea({ maxLength, onChange }: { maxLength: number, onChange: ChangeEventHandler<HTMLTextAreaElement> }) {
    return <textarea onChange={onChange} name='review_text' id='review_text' className='w-100 border-2 h-80 p-2' maxLength={maxLength} />
}
function ReviewCharacterCounter({ maxLength, characterCount }: { maxLength: number, characterCount: number }) {
    return <p className={`${(maxLength - characterCount) < 10 ? "text-red-400" : ''}`}>{maxLength - characterCount}</p>
}

export default function ReviewArea() {
    const [characterCount, setCharacterCount] = useState(0);
    function updateCharacterCounter(e) {
        return setCharacterCount(e.target.value.length)
    }
    const MAX_LENGTH = 240;
    return (<div>
        <ReviewTextAreaLabel />
        <ReviewTextArea maxLength={MAX_LENGTH} onChange={updateCharacterCounter} />
        <ReviewCharacterCounter maxLength={MAX_LENGTH} characterCount={characterCount} />
    </div>)
}


function TextAreaLabel() {
    return <label htmlFor='review_text' className='block font-bold text-2xl mb-3'>Review</label>
}
function TextArea({ maxLength, onChange }: { maxLength: number, onChange: ChangeEventHandler<HTMLTextAreaElement> }) {
    return <textarea onChange={onChange} name='review_text' id='review_text' className='w-100 border-2 h-80 p-2' maxLength={maxLength} />
}
function CharacterCounter({ maxLength, characterCount }: { maxLength: number, characterCount: number }) {
    return <p className={`${(maxLength - characterCount) < 10 ? "text-red-400" : ''}`}>{maxLength - characterCount}</p>
}
function ReviewEditor({ children }: PropsWithChildren) {
    return <div>{children}</div>
}
ReviewEditor.TextAreaLabel = TextAreaLabel;
ReviewEditor.TextArea = TextArea;
ReviewEditor.CharacterCounter = CharacterCounter; 


