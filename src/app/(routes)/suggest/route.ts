import postgres from "postgres";
import * as cheerio from "cheerio";


async function addAppDataToResults(results: any[]) {
    return new Promise(async (resolve, reject) => {
        try {
            const new_results =
            const app_info = new URL(`https://store.steampowered.com/app/${id}`)
            const app_html = await fetch(app_info.href)
            const app_text = await app_html.text();
            const $ = cheerio.load(app_text)
            const scorePercentage = $('.responsive_reviewdesc').text().split('%')[0].replace('/n', '').replace('/t', '').replace('-', '').trim()
            const totalReviews = $("meta[itemprop=reviewCount]")
            return resolve({ scorePercentage })
        }
        catch (e) {
            return reject(e)
        }
    })
}



async function getDataByAppId(id: number) {
    return new Promise(async (resolve, reject) => {
        try {
            const app_info = new URL(`https://store.steampowered.com/app/${id}`)
            const app_html = await fetch(app_info.href)
            const app_text = await app_html.text();
            const $ = cheerio.load(app_text)
            const scorePercentage = $('.responsive_reviewdesc').text().split('%')[0].replace('/n', '').replace('/t', '').replace('-', '').trim()
            const totalReviews = $("meta[itemprop=reviewCount]")
            return resolve({ scorePercentage })
        }
        catch (e) {
            return reject(e)
        }
    })
}

export async function GET(request: Request) {
    try {
        console.log("#####FIRST LINE#####")
        const req_url = new URL(request.url)
        const search_url = new URL("https://store.steampowered.com/search/suggest?" + req_url.searchParams)

        const html = await fetch(search_url.href)
        const text = await html.text();
        const $ = cheerio.load(text)
        const results: any[] = [];
        $('a').each((i, el) => {
            //Values
            const id = el.attribs['data-ds-appid'];
            const name = $(el).find('.match_name').text();
            const imgSrc = $(el).find('img').attr('src');

            //Conditional Logic
            const isAnApp = id !== undefined;
            const hasAGameTag = el.attribs['data-ds-tagids'] !== undefined;

            //If it gets here execute.
            if (isAnApp && hasAGameTag) {
                results.push({ name, imgSrc, id: Number(id) })
            }
        });

        results.forEach(async (el, i) => {
            // console.log('START results[i]', results[i])
            const { name, imgSrc, id } = el;
            const result = await getDataByAppId(id)
            console.log('AWAIT FOR LOOP ', i)
            //     const app_info = new URL(`https://store.steampowered.com/app/${id}`)
            //     const app_html = await fetch(app_info.href)
            //     const app_text = await app_html.text();


            //     const $result = cheerio.load(app_text)
            //     const scorePercentage = $result('.responsive_reviewdesc').text().split('%')[0].replace('/n', '').replace('/t', '').replace('-', '').trim()
            //     const totalReviews = $result("meta[itemprop=reviewCount]")

            //    results[i]={...results[i],scorePercentage}
            //    console.log('END results[i]',results[i])

        })
        for (let i = 0; i < results.length; i++) {
            console.log('REGULAR FOR LOOP ', i)
        }
        console.log("###### LAST LINE ")
        return Response.json({ results })
    } catch (e) {
    }
}