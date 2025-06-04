
// import CreateReview from "./components/CreateReview";
// import { SearchProvider } from "./search/context/search-provider";

import Skeleton from "./components/skeletons/Skeleton";
import listReviewOptions from "./db/listReviewOptions";

export default async function Page() {
  const answers = await listReviewOptions();




  return (
    // <SearchProvider>
    //   <CreateReview />
    // </SearchProvider>
    <>
      <div className=' h-full flex flex-1'>
        {/* LEFT SIDE */}
        <div className="flex-2/5 border-r-2 flex flex-col justify-start items-center h-full gap-5 p-2 pt-15 ">
          <Skeleton.Image />
          {/* Skeleton - Image */}
          <Skeleton.SmallBar />
          <Skeleton.SmallBar />
          <Skeleton.SmallBar />
          <Skeleton.SmallBar />
        </div>
        {/* RIGHT SIDE */}
        <div className='h-full grow shrink p-4'>
          <div className=' flex flex-wrap justify-start item-start gap-1 '>
            {answers.map((category, i) => {
              return (
                <div className='shrink border-2 rounded-2xl px-3 py-1'>
                  <h2 className='font-bold underline underline-offset-2'>{category.title}</h2>
                  <ul>
                    {category.options.map(option => {
                      return <li className={` flex gap-2 ${answers.length - 1 === i ? 'inline-block mx-4' : ''}`}>
                        <input type='radio' name={`question_id_${option.option_id}`} value={option.value} />
                        <p className=''>
                          {option.value}
                        </p>

                      </li>
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
}
