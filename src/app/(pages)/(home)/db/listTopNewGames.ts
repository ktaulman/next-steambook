"use server";

import { sql } from "@/app/_db/db";

const ALLOWED_SORT_COLUMNS = [
  "title",
  "release_date",
  "score",
  "number_reviews",
]; // update as needed
const ALLOWED_DIRECTIONS = ["ASC", "DESC"];

export async function listTopNewGames(sort: string, sortDirection: string) {
  const timeAtOneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const table = "steambook.top_new_apps";
  // Validate sort column and direction
  const column = ALLOWED_SORT_COLUMNS.includes(sort) ? sort : "time_scraped";
  const direction = ALLOWED_DIRECTIONS.includes(sortDirection)
    ? sortDirection
    : "DESC";
  const results = await sql`
    SELECT *
    FROM ${sql(table)}
    WHERE time_scraped >= ${timeAtOneHourAgo}
    ORDER BY ${sql.unsafe(column)} ${sql.unsafe(direction)}
    LIMIT 100
  `;
  if (!results) return [];
  return results;
}
