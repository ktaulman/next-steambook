import postgres from "postgres";


export async function GET(request: Request) { 
    console.log('hitting GET')
    try { 
        console.log('#######')
        console.log(request)
        // const fetch_url = new URL('https://steampowered.com/search/suggest')
        // fetch_url.searchParams.set('term', 'Mech')
        // fetch_url.searchParams.set('f', 'games')
        // fetch_url.searchParams.set('cc', 'US')
        // const results = await fetch(fetch_url.href)
        // const text = await results.text();
        // console.log(text)
        return Response.json({
            data: {
                field1: '111',
                field2:'2222'
        } })
    } catch (e) {
     }
}