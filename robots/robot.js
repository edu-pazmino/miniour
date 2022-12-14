const { sequelize } = require("./models/sequelize");
const {
  sitemapProcessor,
  ProviderTypes,
} = require("./services/sitemap");

(async () => {
  console.log(`tyring to connect to the database`);
  await sequelize.authenticate();
  console.log("connected to the database");

  ///#region Model Region
  await sequelize.sync();
  ///#endregion

  const providers = [
    // {
    //   name: "Coolmod",
    //   type: ProviderTypes.Request,
    //   url: "https://www.coolmod.com/sitemap.xml",
    // },
    // {
    //   name: "PcComponentes",
    //   type: ProviderTypes.Nightmare,
    //   url: "https://www.pccomponentes.com/sitemap_articles_components.xml",
    // },
    // {
    //   name: "PcComponentes",
    //   type: ProviderTypes.Nightmare,
    //   url: "https://www.pccomponentes.com/sitemap_articles_gaming.xml",
    // },
    // {
    //   name: "VSGamers",
    //   type: ProviderTypes.Tar,
    //   url: "https://www.vsgamers.es/sitemaps/sitemap.products.es.xml.gz",
    // },
    // {
    //   name: "Amazon",
    //   type: ProviderTypes.Tar,
    //   url: "https://www.amazon.es/sitemaps.2307ea63773dfee.SitemapIndex_0.xml.gz",
    // },
  ];

  for (const provider of providers) {
    try {
      await sitemapProcessor(provider);
    } catch (ex) {
      console.error("Error while when trying to put %s", provider.name);
      console.error(ex);
    }
  }
})();
