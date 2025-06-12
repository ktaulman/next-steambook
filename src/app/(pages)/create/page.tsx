// import CreateReview from "./components/CreateReview";
// import { SearchProvider } from "./search/context/search-provider";

import Skeleton from "./components/skeletons/Skeleton";
import listReviewOptions from "./db/listReviewOptions";
import QuestionGroup from "./components/inputs/question-group";

export default async function Page() {
  const answers = await listReviewOptions();
  return (
    // <SearchProvider>
    //   <CreateReview />
    // </SearchProvider>
    <>
      <div className=" h-full flex flex-1">
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
        <div className="h-full grow shrink p-4">
          <div className=" flex flex-wrap justify-start item-start gap-6 ">
            {answers.map(({ title, question_id, options }, i) => {
              return (
                <QuestionGroup key={`fieldset_${i}`}>
                  <QuestionGroup.Title>{title}</QuestionGroup.Title>
                  <QuestionGroup.List>
                    {options.map((option) => {
                      return (
                        <QuestionGroup.ListItem
                          key={option.option_id}
                          direction={
                            answers.length - 1 === i ? "horizontal" : "vertical"
                          }
                        >
                          <QuestionGroup.ListItemRadioInput
                            name={`question_id_${question_id}`}
                            id={`option_id_${option.option_id}`}
                            value={option.value}
                          />
                          <QuestionGroup.ListItemLabel
                            htmlFor={`option_id_${option.option_id}`}
                          >
                            {option.value}
                          </QuestionGroup.ListItemLabel>
                        </QuestionGroup.ListItem>
                      );
                    })}
                  </QuestionGroup.List>
                </QuestionGroup>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
