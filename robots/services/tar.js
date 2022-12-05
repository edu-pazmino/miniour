const request = require("request-promise");
const zlib = require("zlib");
const cheerio = require("cheerio");

/**
 *
 * @param {import('./types').Provider} provider
 */
module.exports = async function getSitemapXmlFromUrlTar(provider) {
  const body = await doRequestWithUnzip(provider);
  const sitemapList = await getFromBody(body);
  return sitemapList;
};

async function doRequestWithUnzip(provider) {
  return new Promise((resolve, reject) => {
    const stream = request
      .get(provider.url, { gzip: true })
      .pipe(zlib.createGunzip());

    let buffer = "";

    stream.on("data", (chunk) => {
      buffer += chunk.toString();
    });

    stream.on("error", (err) => {
      reject(err);
    });

    stream.on("end", () => {
      resolve(buffer);
    });
  });
}

function getFromBody(resp) {
  const $ = cheerio.load(resp, {
    xmlMode: true,
  });

  const sitemapXmlList = $("url")
    .map((i, el) => ({
      url: $(el).find("loc").text(),
      frequency: $(el).find("changefreq").text(),
      priority: parseFloat($(el).find("priority").text()),
    }))
    .toArray();

  return sitemapXmlList;
}
