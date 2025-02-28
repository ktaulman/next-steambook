import postgres from "postgres";
import * as cheerio from "cheerio";



export async function GET(request: Request) {
    try {
        const req_url = new URL(request.url)
        const search_url = new URL("https://store.steampowered.com/search/suggest?" + req_url.searchParams)
        
        const html = await fetch(search_url.href)
        const text = await html.text();
        const $ = cheerio.load(text)
        const results:any[] = [];
        $('a').each((i, el) => {
            //Values
            const id = el.attribs['data-ds-appid']
            const name = $(el).find('.match_name').text()
            const imgSrc = $(el).find('img').attr('src')
            
            //Conditional Logic
            const isAnApp = id !==undefined
            const hasAGameTag=el.attribs['data-ds-tagids']!==undefined;
            //If it gets here execute.
            if(isAnApp&&hasAGameTag)results.push({ name, imgSrc, id:Number(id) })
        });



        return Response.json({ results })
    } catch (e) {
    }
}