
import CreateReview from "@/app/_features/review/create-review";
import { SearchProvider } from "@/app/_features/search/context/search-provider";




export default function Page() {
  console.log('CREATE PAGE REFRESH')
  // START


  // const createReviewWithSelected = createReview.bind()

  // END


  return (
    <SearchProvider>
      <CreateReview />
    </SearchProvider>
  );
}
