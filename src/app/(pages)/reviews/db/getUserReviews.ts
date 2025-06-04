"use server"
import { sql } from '@/app/_db/db'

export async function getUserReviews() {
    const results = await sql`
        SELECT *
        FROM steambook.reviews 
        WHERE user_id = 1
    `
    return results;

}