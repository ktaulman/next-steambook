"use server";
import { sql } from "@/app/_db/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkLastWrittenRecord } from "./checkLastWrittenRecord";
import { scrapeTopNewGamesByCount } from "./scrape/scrapeTopNewGamesByCount";

export async function refreshTopNewGames() {
  //ping the GET route for /check-top-new
  //should be a program to see if any records are timestamped for the last half hour
  //if the last records are older than 30 minutes then you should hit the GET ENDPOINT to listTopNewGrame() INSERT new records into the data base
  const isThereARecentRecord = await checkLastWrittenRecord();
  if (isThereARecentRecord) return { message: "Results are most recent." };
  const results = await scrapeTopNewGamesByCount(100); //get the scraped results that're formatted

  sql`BEGIN`;
  results.forEach(
    async (
      { releaseDate, title, appId, href, imgSrc, score, numberReviews },
      i
    ) => {
      await sql`INSERT INTO steambook.top_new_apps (app_id, title, store_href, "store_imgSrc", release_date, score, number_reviews, "time")
                VALUES ( ${appId}, ${title}, ${href}, ${imgSrc}, ${releaseDate}, ${Number(
        score
      )}, ${Number(numberReviews)}, CURRENT_TIMESTAMP)
                `;
    }
  );
  sql`COMMIT`;

  revalidatePath("/");
  redirect("/");
}
