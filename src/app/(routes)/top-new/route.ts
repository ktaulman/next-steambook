'use server';

import * as cheerio from "cheerio";
import { timeStamp } from "console";
import postgres from 'postgres';


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
        const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
        const results = await sql`
        SELECT table_name FROM information_schema.tables WHERE table_schema = 'steambook'
        ` //get the scraped results that're formatted.
        //ping the GET route for /check-top-new 
        //should be a program to see if any records are timestamped for the last half hour 
        // if records have be 
        //if the last records are older than 30 minutes then you should INSERT new records into the data base 
        console.log({ results })
        return Response.json({ results }, { status: 200 })
    } catch (e) {
        return Response.json({ results: [] }, { status: 400 })
    }
}

// POST Request used for Google Cloud Platform CRON Job 


export async function POST() {
    try {
        //ping the GET route for /check-top-new 
        //should be a program to see if any records are timestamped for the last half hour 
        // if records have be 
        //if the last records are older than 30 minutes then you should INSERT new records into the data base 

        const results = await getTopNewGames(); //get the scraped results that're formatted.
        const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

        const res = await sql`INSERT INTO steambook.top_new_apps (app_id, title, store_href, "store_imgSrc", release_date, score, number_reviews, "time") 
VALUES (12345, 'Example Game', 'https://store.steampowered.com/app/12345', 'https://cdn.cloudflare.steamstatic.com/steam/apps/12345/header.jpg', '2023-05-15', 85, 1000, CURRENT_TIMESTAMP)
            RETURNING *`
        //         results.slice(0, 1).forEach(async (result, i) => {
        //             const { releaseDate, title, appId, href, imgSrc, score, numberReviews } = result;
        //             console.log({ ...result })
        //             await sql`INSERT INTO steambook.top_new_apps (app_id, title, store_href, "store_imgSrc", release_date, score, number_reviews, "time") 
        // VALUES (12345, 'Example Game', 'https://store.steampowered.com/app/12345', 'https://cdn.cloudflare.steamstatic.com/steam/apps/12345/header.jpg', '2023-05-15', 85, 1000, CURRENT_TIMESTAMP)
        //                 `
        //         })

        // results.slice(0, 2).forEach(async (result, i) => {
        //     const { releaseDate, title, appId, href, imgSrc, score, numberReviews } = result;
        //     console.log({ ...result })
        //     await sql`INSERT INTO steambook.top_new_apps (app_id, title, store_href, "store_imgSrc", release_date, score, number_reviews, "time")
        //     VALUES ( ${appId}, ${title}, ${href}, ${imgSrc}, ${releaseDate}, ${score}, ${numberReviews}, CURRENT_TIMESTAMP)
        //     RETURNING *
        //     `
        // })
        console.log(res)
        return Response.json('SUCCESS', { status: 200, statusText: 'db write successful' })
    } catch (e) {
        console.log(e)

        return Response.json('FAILURE', { status: 500, statusText: '' })
    }
}
