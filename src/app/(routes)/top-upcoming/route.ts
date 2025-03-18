import * as cheerio from "cheerio";
import { sql } from "@/app/_db/db";


async function getTopUpcomingGames() {
    return new Promise(async (resolve, reject) => {
        try {

            const url = new URL('https://store.steampowered.com/search/results')
            const params = new URLSearchParams(url)
            params.set('start', 0)
            params.set('count', 100)
            params.set('sort_by', 'Released_ASC')
            params.set('category1', 998)
            params.set('os', 'win')
            params.set('supportedlang', 'en')
            params.set('filter', 'popularwishlist')
            const new_url = new URL(`${url.origin}${url.pathname}?${params}`);

            const results = await fetch(new_url)
            const text = await results.text();
            const $ = cheerio.load(text)

            let scraped_results = [];
            $('a[data-ds-appid]').each((i, el) => {
                const dateElement = $(el).find('div.search_released')
                const containsDateWithDay = dateElement.text().includes(',')
                if (containsDateWithDay) {
                    const releaseDate = dateElement.text().replace('/n', '').trim();
                    const title = $(el).find('.title').text()
                    const appId = Number($(el).attr('data-ds-appid'))
                    const href = $(el).attr('href').split('?')[0]
                    const imgSrc = $($(el).find('img')).attr('src')
                    scraped_results.push({ releaseDate, title, appId, href, imgSrc })
                }
            })

            scraped_results.sort((a, b) => (new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime())).slice(0, 20);
            resolve(scraped_results)
        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}

async function checkLastWrittenRecord() {
    return new Promise(async (resolve, reject) => {
        try {
            const timeAt24HoursAgo = new Date(Date.now() - (24 * 60 * 60 * 1000))
            const results = await sql`
                SELECT  *
                FROM steambook.top_upcoming_apps
                WHERE "time" >= ${timeAt24HoursAgo}
                ORDER BY "time" DESC
                LIMIT 1
            `
            resolve(results)
        }
        catch (e) {
            console.log('ERROR Fetching Last Written Record', e)
            reject(e)
        }
    })
}


export async function GET() {
    try {
        const time24HoursAgo = new Date(Date.now() - (24 * 60 * 60 * 1000))

        const upcoming = await sql`
            SELECT * 
            FROM steambook.top_upcoming_apps
            WHERE time>=${time24HoursAgo}
            ORDER BY "time" DESC
            LIMIT 20
        `
        console.log(upcoming)
        return Response.json(upcoming, { status: 200, statusText: 'Results Found' })

    } catch (e) {
        return Response.json('FAILURE', { status: 500 })
    }
}

export async function POST() {
    try {
        const lastRecord = await checkLastWrittenRecord();
        if (lastRecord.length === 0) {
            const upcoming = await getTopUpcomingGames();

            sql`BEGIN`
            upcoming.forEach(async (result, i) => {
                const { appId, title, href, imgSrc, releaseDate } = result;
                console.log({ ...result })
                await sql`
                INSERT INTO steambook.top_upcoming_apps (app_id, title, store_href, "store_imgSrc", release_date, "time")
                VALUES (${appId}, ${title}, ${href}, ${imgSrc}, ${releaseDate}, CURRENT_TIMESTAMP)
                `
            })
            sql`COMMIT`
            return Response.json('SUCCESS', { status: 200, statusText: 'db write successful' })
        }
        else return Response.json('PROCESSED WITH PAST DAY , WAIT ', { status: 509, statusText: 'Web scrape not processed please wait.' })
    } catch (e) {
        sql`ROLLBACK`
        return Response.json('FAILURE', { status: 500 })
    }
}