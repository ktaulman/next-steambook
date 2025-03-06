import { SearchBar, RatingStars, ReviewArea, Button } from "@/app/_components";
export default function Page() {
  return (
    <form className="p-10 flex flex-col justify-between gap-6">
      <h1 className='font-bold text-3xl'>Post Review</h1>
      <SearchBar />
      <RatingStars />
      <ReviewArea />
      <Button />
    </form>
  );
}
