const Nightmare = require("nightmare");
const ProviderGeneric = require("./generic");
const cheerio = require("cheerio");
let request = require("request-promise");
/**
 * @type {import('request')}
 */
request = request.defaults({ jar: true });

module.exports = class VSGamersBot extends ProviderGeneric {
  /**
   *
   * @param {import('../models/sitemap').Sitemap} sitemap
   * @returns {boolean}
   */
  accept(sitemap) {
    return sitemap.sourceId === 4;
  }

  /**
   *
   * @param {import('../models/sitemap').Sitemap} sitemap
   * @param {Promise<Product[]>}
   */
  async getProduct(sitemap) {
    try {
      const body = await request.get(sitemap.url);
      const $ = cheerio.load(body);

      return {
        name: $("[itemprop=name]").text(),
        url: sitemap.url,
        coverUrl: $("[itemprop=image]").attr("src"),
        sourceId: 4,
        price: parseFloat(
          $("meta[itemprop=price]")
            .attr("content")
            .replace(",", ".")
            .replace(" ", "")
        ),
      };
    } catch (ex) {
      console.error(ex);
      return {};
    }
  }
};
