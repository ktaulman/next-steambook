"use server";

import { sql } from "@/app/_db/db";

export async function listTopNewGrame() {
  const timeAtOneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const results = await sql`
        SELECT *
        FROM steambook.top_new_apps
        WHERE "time" >= ${timeAtOneHourAgo}
        ORDER BY release_date DESC
        LIMIT 100
        `;
  if (!results) return [];
  return results;
}
