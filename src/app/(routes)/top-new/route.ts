import * as cheerio from "cheerio";


async function getTopNewGames() {
    //Pages
    const page_one = await fetch("https://store.steampowered.com/search/results/?query&start=0&count=100&dynamic_data=&sort_by=Released_DESC&os=win&supportedlang=english&infinite=1")
    const page_two = await fetch("https://store.steampowered.com/search/results/?query&start=100&count=100&dynamic_data=&sort_by=Released_DESC&os=win&supportedlang=english&infinite=1")
    const page_three = await fetch("https://store.steampowered.com/search/results/?query&start=200&count=100&dynamic_data=&sort_by=Released_DESC&os=win&supportedlang=english&infinite=1")
    const res = await Promise.all([page_one, page_two, page_three])
    const page_one_string = await res[0].json();
    const page_two_string = await res[1].json();
    const page_three_string = await res[2].json();
    const $ = cheerio.load(page_one_string.results_html + page_two_string.results_html + page_three_string.results_html)

    //Thumbs Up Rating
    const trending_games = [];
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
            trending_games.push({
                releaseDate, title, appId, href, imgSrc, score, numberReviews
            })
        }
    })
    trending_games.forEach((el, i) => {
        const { appId, href, imgSrc, releaseDate, title, score, numberReviews } = el;
    })
    return trending_games;
}