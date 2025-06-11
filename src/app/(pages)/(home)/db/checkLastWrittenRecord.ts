"use server";
import { sql } from "@/app/_db/db";
export async function checkLastWrittenRecord(): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    try {
      const timeAtThirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
      const results = await sql`
                SELECT *
                FROM steambook.top_new_apps
                WHERE time_scraped >= ${timeAtThirtyMinutesAgo}
                ORDER BY time_scraped DESC 
                LIMIT 1
            `;
      resolve(results.length > 0);
    } catch (e) {
      reject(e);
    }
  });
}
