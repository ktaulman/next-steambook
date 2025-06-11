import * as cheerio from "cheerio";
import { fetchGameDataByCount } from "./fetchGameDataByCount";

export async function scrapeTopNewGamesByCount(count: number) {
  //set a target number Top 100
  //current batch number size
  //set a batch size 3
  //do a while results.length>0
  //
  const results = [];
  const target_total = 100;
  const page_batch_size = 3;
  let count_start = 0;

  while (results.length < target_total) {
    const promises = []; //holds batched promises
    for (let i = 0; i < page_batch_size; i++) {
      const page_start = count_start + i * count;
      promises.push(fetchGameDataByCount({ start: page_start, count }));
    } //pushes to promises array
    const responses = await Promise.all(promises);

    let raw_combined_html = "";
    for (const response of responses) {
      const pageJson = await response.json();
      raw_combined_html += pageJson.results_html;
    }
    const $ = cheerio.load(raw_combined_html);

    $("a[data-ds-appid]").each((i, el) => {
      const release_date = $(el)
        .find("div.search_released")
        .text()
        .replace("/n", "")
        .trim();
      const title = $($(el).find(".title")).text();
      const app_id = Number($(el).attr("data-ds-appid"));
      const store_href = $(el).attr("href").split("?")[0];
      const store_imgSrc = $($(el).find("img")).attr("src");

      //Conditional Logic
      const hasThumbsUpReview =
        $(el).find("span.search_review_summary").length > 0;

      if (hasThumbsUpReview) {
        const review = $(el)
          .find("span.search_review_summary")
          .attr("data-tooltip-html");
        if (!review) return;
        const score = Number(review.split("<br>")[1].split("%")[0].trim());
        const number_reviews = Number(
          review
            .split("of the")[1]
            .trim()
            .split("user")[0]
            .trim()
            .replace(/,/g, "")
        );
        results.push({
          release_date,
          title,
          app_id,
          store_href,
          store_imgSrc,
          score,
          number_reviews,
          time_scraped: Date.now(),
        });
      }
    });
    console.log("Total found:", results.length);
    count_start = count_start + page_batch_size * count;
  }
  return results.slice(0, count);
}
