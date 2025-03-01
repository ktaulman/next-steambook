import SearchBar from '@/app/_components/search-bar'
import RatingStars from '@/app/_components/rating-stars';
import ReviewArea from './_components/review-area';
export default function Page() {

  return (
    <div className="p-10 flex flex-col justify-between gap-10">
      <h1>PAGE</h1>
      <SearchBar />
      <RatingStars/>
      <ReviewArea/>
    </div>
  );
}
