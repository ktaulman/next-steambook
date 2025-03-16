import * as cheerio from "cheerio";

async function getTopUpcomingGames() {
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

    return scraped_results.sort((a, b) => (new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime())).slice(0, 24);
}