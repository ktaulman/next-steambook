'use server';

import * as cheerio from "cheerio";
import { timeStamp } from "console";
import { sql } from '@/app/_db/db'


// GET Function - Steambook Route Used To Populate 
async function fetchGameDataByPage({ start, count }: { start: number, count: number }) {
    return new Promise(async (res, rej) => {
        try {
            const steam_url = new URL(`https://store.steampowered.com/search/results/?query&start=${start}&count=${count}&dynamic_data=&sort_by=Released_DESC&os=win&supportedlang=english&infinite=1"`)
            const pageResults = await fetch(steam_url)
            return res(pageResults)
        } catch (e) {
            return rej(new Error('error'))
        }
    })
}

async function getTopNewGames() {
    //Pages Get At Least For Pages 
    const promisesPages = [
        fetchGameDataByPage({ start: 0, count: 100 }),
        fetchGameDataByPage({ start: 100, count: 100 }),
        fetchGameDataByPage({ start: 200, count: 100 }),
    ];
    const raw_pages_html = await Promise.all(promisesPages)

    const page_one_string = await raw_pages_html[0].json();
    const page_two_string = await raw_pages_html[1].json();
    const page_three_string = await raw_pages_html[2].json();
    const $ = cheerio.load(page_one_string.results_html + page_two_string.results_html + page_three_string.results_html)

    //Thumbs Up Rating
    const top_new_games = [];
    $('a[data-ds-appid]').each((i, el) => {
        const releaseDate = $(el).find('div.search_released').text().replace('/n', '').trim();
        const title = $(($(el).find('.title'))).text();
        const appId = Number($(el).attr('data-ds-appid'));
        const href = $(el).attr('href').split('?')[0];
        const imgSrc = $($(el).find('img')).attr('src')

        //Conditional Logic
        const hasThumbsUpReview = $(el).find('span.search_review_summary').length > 0;
        if (hasThumbsUpReview) {
            const review = $(el).find('span.search_review_summary').attr('data-tooltip-html')
            const score = Number(review.split('<br>')[1].split('%')[0].trim());
            const numberReviews = Number(review.split('of the')[1].trim().split('user')[0].trim().replace(/,/g, ''));
            top_new_games.push({
                result_index: i, timestamp: Date.now(), releaseDate, title, appId, href, imgSrc, score, numberReviews
            })
        }
    })
    return top_new_games.slice(0, 20);
}

export async function GET() {
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

// POST Request used for Google Cloud Platform CRON Job


///Check the most last written records time stamp. 
async function checkLastWrittenRecord() {
    return new Promise(async (resolve, reject) => {
        try {
            const timeAtThirtyMinutesAgo = new Date(Date.now() - (30 * 60 * 1000))
            const results = await sql`
                SELECT *
                FROM steambook.top_new_apps
                WHERE "time" >= ${timeAtThirtyMinutesAgo}
                ORDER BY "time" 
                LIMIT 1
            `
            resolve(results)
        }
        catch (e) {
            reject(e)
        }
    })

}


export async function POST() {
    try {
        //ping the GET route for /check-top-new
        //should be a program to see if any records are timestamped for the last half hour
        //if the last records are older than 30 minutes then you should hit the GET ENDPOINT to getTopNewGames() INSERT new records into the data base 
        const recentRecord = await checkLastWrittenRecord();

        if (recentRecord.length === 0) {
            const results = await getTopNewGames(); //get the scraped results that're formatted
            sql`BEGIN`
            results.slice(0, 20).forEach(async (result, i) => {
                const { releaseDate, title, appId, href, imgSrc, score, numberReviews } = result;
                await sql`INSERT INTO steambook.top_new_apps (app_id, title, store_href, "store_imgSrc", release_date, score, number_reviews, "time")
                VALUES ( ${appId}, ${title}, ${href}, ${imgSrc}, ${releaseDate}, ${score}, ${numberReviews}, CURRENT_TIMESTAMP)
                `
            })
            sql`COMMIT`
            return Response.json('SUCCESS', { status: 200, statusText: 'db write successful' })
        }
        return Response.json('PROCESSED ALREADY', { status: 409, statusText: 'CRON JOB ran previous records found within past 30 min' })
    } catch (e) {
        console.log(e)
        sql`ROLLBACK`
        return Response.json('FAILURE', { status: 500, statusText: '' })
    }
}
