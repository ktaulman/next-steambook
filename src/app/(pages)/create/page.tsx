import SearchBar from '@/app/_components/search-bar'
import RatingStars from '@/app/_components/rating-stars';
import ReviewArea from '@/app/_components/review-area';
export default function Page() {

  return (
    <form className="p-10 flex flex-col justify-between gap-10">
      <h1 className='font-bold text-3xl' className="font-bold text-2xl">Post Review</h1>
      <SearchBar />
      <RatingStars />
      <ReviewArea />
      <button type='submit' className=' bg-green-200 py-3 px-1 font-bold rounded border-2 border-black w-48 hover:scale-105 hover:cursor-pointer'>Submit</button>
    </form>
  );
}
