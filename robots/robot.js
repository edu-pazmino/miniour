const Nightmare = require("nightmare");
const { Sequelize, DataTypes } = require("sequelize");

/**
 *
 * @param {String} urlStr
 * @returns {String} description name of product
 */
const resolveProductNameByUrl = (urlStr) => {
  const url = new URL(urlStr);

  return url.pathname
    .substring(1, url.pathname.length - 1)
    .replace(/-/, " ")
    .trim();
};

(async () => {
  console.log(`tyring to connect to the database`);
  const sequelize = new Sequelize({
    host: "localhost",
    port: "3306",
    username: "root",
    dialect: "mysql",
    database: "miniour",
  });
  await sequelize.authenticate();
  console.log("connected to the database");

  ///#region Model Region
  const Sitemap = sequelize.define(
    "Sitemap",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      description: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      priority: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      frequency: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      sourceId: {
        type: DataTypes.INTEGER,
        field: "source_id",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "created_at",
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
        field: "updated_at",
      },
    },
    { tableName: "robots_sitemap", timestamps: false }
  );

  await sequelize.sync();

  ///#endregion

  /**
   * @type {Nightmare}
   */
  const nightmare = Nightmare();

  console.log(`Starting browser to scrape data`);

  /**
   * @type {Array<{url: String, priority: Number, frequency: String}}>}
   */
  const sitemapUrls = await nightmare
    .goto("https://www.pccomponentes.com/sitemap_articles_peripherals.xml")
    .wait("url loc")
    .evaluate(() =>
      Array.from(document.querySelectorAll("url")).map((el) => ({
        url: el.querySelector("loc").innerHTML,
        frequency: el.querySelector("changefreq").innerHTML,
        priority: parseFloat(el.querySelector("priority").innerHTML),
      }))
    )
    .end();

  console.log("sitemap_articles_peripherals.xml total %s", sitemapUrls.length);

  await Promise.all(
    sitemapUrls.map(async ({ url, frequency, priority }) => {
      try {
        const name = resolveProductNameByUrl(url);
        console.log("Name: %s", name);
        console.log("Url: %s", url);
        console.log("Priority: %f", priority);
        console.log("Frequency: %s", frequency);

        const sitemap = new Sitemap({
          description: name,
          url,
          priority,
          frequency,
          sourceId: 1,
        });
        const s = await sitemap.save();
        console.log(`Saved ${name}`);
      } catch (ex) {
        console.error(ex);
      }
    })
  );
})();
