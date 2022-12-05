const { Op } = require("sequelize");
const { Product } = require("./models/product");
const { sequelize } = require("./models/sequelize");
const { Sitemap } = require("./models/sitemap");
const CoolmodBot = require("./providers/coolmod");
const PcComponentes = require("./providers/pccomponentes");
const VSGamersBot = require("./providers/vsgamers");
/**
 * @type {Array<import('./providers/generic')>}
 */
const robots = [new PcComponentes(), new CoolmodBot(), new VSGamersBot()];

(async () => {
  console.log(`tyring to connect to the database`);
  await sequelize.authenticate();
  console.log("connected to the database");

  ///#region Model Region
  await sequelize.sync();
  ///#endregion
  const productQuery = "g502";
  const sitemaps = await Sitemap.findAll({
    where: {
      description: {
        [Op.like]: `%${productQuery}%`,
      }
    },
  });

  for (const sitemap of sitemaps) {
    const bot = robots.find((r) => r.accept(sitemap));

    if (bot) {
      const product = await bot.getProduct(sitemap);

      if (product.name && product.url && product.price) {
        const p = await Product.create(product, { ignoreDuplicates: true });
        console.log(`Product created id: ${p.id}`);
      }
    }
  }
})();
