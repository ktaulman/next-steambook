import SearchBar from '@/app/_components/search-bar'
import RatingStars from '@/app/_components/rating-stars';
export default function Page() {

  return (
    <div className="p-10 flex flex-col gap-6">
      <SearchBar />
      <RatingStars/>
    </div>
  );
}
