
import CreateReview from "@/app/_features/review/create-review";
import { SearchProvider } from "@/app/_features/search/context/search-provider";




export default function Page() {
  return (
    <SearchProvider>
      <CreateReview />
    </SearchProvider>
  );
}
