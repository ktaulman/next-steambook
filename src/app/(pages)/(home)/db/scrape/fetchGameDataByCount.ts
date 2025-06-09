export async function fetchGameDataByCount({
  start,
  count,
}: {
  start: number;
  count: number;
}) {
  return new Promise(async (res, rej) => {
    try {
      const steam_url = new URL(
        `https://store.steampowered.com/search/results/?`
      );
      steam_url.searchParams.set("query", "");
      steam_url.searchParams.set("start", start.toString());
      steam_url.searchParams.set("count", count.toString());
      steam_url.searchParams.set("dynamic_data", "");
      steam_url.searchParams.set("sort_by", "Released_DESC");
      steam_url.searchParams.set("os", "win");
      steam_url.searchParams.set("supportedlang", "english");
      steam_url.searchParams.set("infinite", "1");
      console.log("steam_url", steam_url.toString());

      const pageResults = await fetch(steam_url);
      return res(pageResults);
    } catch (e) {
      return rej(new Error(e.message));
    }
  });
}
