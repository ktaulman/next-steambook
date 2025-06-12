import { sql } from "@/app/_db/db";
import { Row, RowList } from "postgres";

type Question = {
  question_id: number;
  title: string;
};
type Option = {
  option_id: number;
  value: string;
};
type FormattedQuestionWithOptions = Question & { options: Option[] };

//helper function
function createOrganizedArrayFromReviews(
  rowList: RowList<Row[]>
): FormattedQuestionWithOptions[] {
  const questionsMap: Record<number, FormattedQuestionWithOptions> = {};
  for (const review of rowList) {
    //check if there's a entry for the id
    //if not set up the dictionary entry, init empty array
    if (!questionsMap[review.question_id]) {
      questionsMap[review.question_id] = {
        question_id: review.question_id,
        title: review.title,
        options: [], //init empty array
      };
    }
    //then push the question as an option by selecting either the newely created entry
    questionsMap[review.question_id].options.push({
      option_id: review.option_id,
      value: review.value,
    });
  }
  return Object.values(questionsMap);
}

export default async function listReviewOptions() {
  const reviewOptions = await sql`
            SELECT 
                steambook.review_question.id as question_id, 
                title, 
                steambook.review_question_option.id as option_id,
                value
            FROM 
                steambook.review_question
            JOIN 
                steambook.review_question_option
            ON 
                steambook.review_question.id = steambook.review_question_option.review_question_id
            ORDER BY 
                steambook.review_question_option.id
        `;

  const organizedArray = createOrganizedArrayFromReviews(reviewOptions);
  return organizedArray;
}
