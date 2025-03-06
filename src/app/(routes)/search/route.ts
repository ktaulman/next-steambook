import postgres from "postgres";
import * as cheerio from "cheerio";
async function extractHtmlAndNormalizeToSearchResults({
    requestUrl
}: {
    requestUrl: string;

}) {
    const { searchParams } = new URL(requestUrl)
    const search_url = new URL("https://store.steampowered.com/search/?" + searchParams)
    const params = new URLSearchParams(search_url.search)
    // params.set('','')
    // params.set('','')
    // params.set('','')
    //REQUEST TO STEAM
    const html = await fetch(search_url.href)

    //Convert Text
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

    return results.slice(0, 3);
}

async function getAllReviewData(suggestions: any[]) {
    //helper function 
    const createNewAppIdPromise = (id: number) => new Promise(async (resolve, reject) => {
        try {
            const app_info = new URL(`https://store.steampowered.com/app/${id}`)
            const app_html = await fetch(app_info.href, {
                headers: {
                    Cookie: "birthtime=-2051204399; lastagecheckage=1-January-1905;"
                }
            })
            const app_text = await app_html.text();
            const $ = cheerio.load(app_text)
            const scorePercentage = $("div[itemprop='aggregateRating']").attr('data-tooltip-html')?.split('%')[0].trim();
            const totalReviews = Number($("meta[itemprop=reviewCount]").attr('content'));
            return resolve({ id, scorePercentage, totalReviews })
        }
        catch (e) {
            return reject(e)
        }
    })

    //Promisess
    const promises: Promise<any>[] = [];
    suggestions.forEach((el, i) => {
        const { id } = el;
        promises.push(createNewAppIdPromise(id))
    })
    return await Promise.all(promises)
}
function combineAutocompleteAndReviewData({ suggestions, reviews }: {
    suggestions: any[],
    reviews: any[]
}) {
    const results: any[] = [];
    for (let i = 0; i < suggestions.length; i++) {
        results.push({ ...suggestions[i], ...reviews[i] })
    }
    return results;
}




export async function GET(request: Request) {
    try {
        const suggestions = await extractHtmlAndNormalizeToSearchResults({ requestUrl: request.url })
        const reviews = await getAllReviewData(suggestions)
        const results = combineAutocompleteAndReviewData({ suggestions, reviews })
        return Response.json({ results })
    } catch (e) {
        return Response.json({ results: [] })
    }
}