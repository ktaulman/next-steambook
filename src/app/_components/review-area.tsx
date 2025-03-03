export default function ReviewArea() {
    return (<div>
        <label htmlFor='review_text' className='block font-bold text-2xl mb-3'>Review</label>
        <textarea id='review_text' className='w-100 border-2 h-80' />
    </div>)
}