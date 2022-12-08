const Nightmare = require("nightmare");
const { ProviderTypes } = require("../services/sitemap");
const ProviderGeneric = require("./generic");

module.exports = class PcComponentesBot extends ProviderGeneric {
  /**
   *
   * @param {import('../models/sitemap').Sitemap} sitemap
   * @returns {boolean}
   */
  accept(sitemap) {
    return sitemap.sourceId === 1;
  }

  /**
   *
   * @param {import('../models/sitemap').Sitemap} sitemap
   * @param {Promise<Product[]>}
   */
  async getProduct(sitemap) {
    /**
     * @type {Nightmare}
     */
    const nightmare = Nightmare();
    console.log(`Navigating to ${sitemap.url}`);

    return await nightmare
      .useragent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15"
      )
      .goto(sitemap.url)
      .wait(".ficha-producto__encabezado strong")
      .evaluate(() => ({
        url: location.toString(),
        name: document.querySelector(".ficha-producto__encabezado strong")
          .innerHTML,
        sourceId: 1,
        coverUrl:
          "https:" +
          document.querySelector(".fancybox img").getAttribute("src"),
        price: parseFloat(
          document.querySelector(".precioMain.h1").getAttribute("data-price")
        ),
      }))
      .end();
  }
};
