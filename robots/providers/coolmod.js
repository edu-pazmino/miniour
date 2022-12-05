const Nightmare = require("nightmare");
const { ProviderTypes } = require("../services/sitemap");
const ProviderGeneric = require("./generic");
const cheerio = require("cheerio");
let request = require("request-promise");
/**
 * @type {import('request')}
 */
request = request.defaults({ jar: true });

module.exports = class CoolmodBot extends ProviderGeneric {
  /**
   *
   * @param {import('../models/sitemap').Sitemap} sitemap
   * @returns {boolean}
   */
  accept(sitemap) {
    return sitemap.sourceId === 2;
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
        name: $(".productTitle").text(),
        url: sitemap.url,
        coverUrl: $("#productmainimageitem").attr("src"),
        sourceId: 2,
        price: parseFloat(
          $(".finalprice #actualprice")
            .text()
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
