const Nightmare = require("nightmare");
const { Sitemap } = require("../models/sitemap");
const cheerio = require("cheerio");
let request = require("request-promise");
const tar = require("tar-stream");
const gunzip = require("gunzip-maybe");
const fs = require("fs");
const { ungzip } = require("node-gzip");

/**
 * @type {import('request')}
 */
request = request.defaults({ jar: true });

// /**
//  * @type {Nightmare}
//  */
// const nightmare = (exports.nightmare = Nightmare({
//   show: true,
//   waitTimeout: 30000,
//   gotoTimeout: 30000,
// }));

/**
 *
 * @param {Provider} provider
 */
const resolveProviderId = (provider) => {
  if (provider.name === "Coolmod") {
    return 2;
  } else if (provider.name === "PcComponentes") {
    return 1;
  }
  return 0;
};

const ProviderTypes = (exports.ProviderTypes = {
  Nightmare: 1,
  Request: 2,
  Tar: 3,
});

/**
 * @typedef SitemapXml
 * @property {String} url
 * @property {Number} priority
 * @property {String} frequency
 */

/**
 * @typedef Provider
 * @property {String} url
 * @property {String} name
 * @property {Number} type
 */

/**
 *
 * @param {{url: String, name: String}} provider
 */
exports.sitemapProcessor = async function (provider) {
  /**
   * @type {Nightmare}
   */

  console.log(
    `Navigating browser to scrape data ProviderName: ${provider.name} url: ${provider.url}`
  );

  const sitemapUrls = await getSitemapXml(provider);

  console.log("sitemap_articles_peripherals.xml total %s", sitemapUrls.length);

  await Promise.all(
    sitemapUrls.map(async ({ url, frequency, priority }) => {
      try {
        const name = resolveProductNameByUrl(url);
        console.log("Name: %s", name);

        const sitemap = {
          description: name,
          url,
          priority,
          frequency,
          sourceId: resolveProviderId(provider),
        };

        await Sitemap.create(sitemap, { ignoreDuplicates: true });
        console.log(`Saved ${name}`);
      } catch (ex) {
        console.error(ex);
      }
    })
  );
};

/**
 *
 * @param {Provider} provider
 * @returns {SitemapXml[]}
 */
async function getSitemapXml(provider) {
  switch (provider.type) {
    case ProviderTypes.Request:
      return useRequest(provider);

    case ProviderTypes.Nightmare:
      return useNightmare(provider);
    case ProviderTypes.Tar:
      return useTar(provider);
    default:
      break;
  }
  return [];
}

/**
 *
 * @param {Provider} provider
 * @returns {SitemapXml[]}
 */
async function useTar(provider) {
  return new Promise(async (resolve, reject) => {
    try {
      const body = await request.get(provider.url, {
        gzip: true,
      });
      const l = await ungzip(body)
      console.log(l.toString());
      reject(body);
      // .pipe(tar.extract())
      // .on("response", (r) => {
      //   console.log(r);
      //   resolve([]);
      // })
      // .pipe(fs.createWriteStream("./output.xml"));

      // const $ = cheerio.load(resp, {
      //   xmlMode: true,
      // });

      // const sitemapXmlList = $("url")
      //   .map((i, el) => ({
      //     url: $(el).find("loc").text(),
      //     frequency: $(el).find("changefreq").text(),
      //     priority: parseFloat($(el).find("priority").text()),
      //   }))
      //   .toArray();
    } catch (ex) {
      console.error(ex);
      return reject(ex);
    }
  });
}

/**
 *
 * @param {Provider} provider
 * @returns {SitemapXml[]}
 */
async function useRequest(provider) {
  try {
    const resp = await request.get(provider.url);
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
  } catch (ex) {
    console.error(ex);
    return [];
  }
}

/**
 * @returns {Array<SitemapXml>}
 */
async function useNightmare(provider) {
  /**
   * @type {Nightmare}
   */
  const nightmare = Nightmare();

  return await nightmare
    .useragent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15"
    )
    .goto(provider.url)
    .wait("url loc")
    .evaluate(() =>
      Array.from(document.querySelectorAll("url")).map((el) => ({
        url: el.querySelector("loc").innerHTML,
        frequency: el.querySelector("changefreq").innerHTML,
        priority: parseFloat(el.querySelector("priority").innerHTML),
      }))
    )
    .end();
}

/**
 *
 * @param {String} urlStr
 * @returns {String} description name of product
 */
function resolveProductNameByUrl(urlStr) {
  const url = new URL(urlStr);

  return url.pathname
    .substring(1, url.pathname.length - 1)
    .replace(/^\/|\/$/gi, "")
    .replace(/-/gi, " ")
    .trim();
}
