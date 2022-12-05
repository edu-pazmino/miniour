module.exports = class ProviderGeneric {
  /**
   * 
   * @param {import('../models/sitemap').Sitemap} sitemap 
   * @returns 
   */
  accept(sitemap) {
    return false;
  }

  /**
   * 
   * @param {SitemapXml} sitemap 
   */
  getProduct(sitemap) {
    throw new Error('Not implemented method')
  }
}