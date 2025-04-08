import { sql } from "@/app/_db/db"

export async function getTopNewGames() {
    try {
        const timeAtThirtyMinutesAgo = new Date(Date.now() - (30 * 60 * 1000))
        const results = await sql`
            SELECT *
            FROM steambook.top_new_apps
            WHERE "time" >= ${timeAtThirtyMinutesAgo}
            ORDER BY "time" 
            LIMIT 20
            `
        return Response.json({ results }, { status: 200 })
    } catch (e) {
        console.log(e)
        return Response.json({ results: [] }, { status: 400 })
    }
}