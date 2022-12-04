const { DataTypes } = require("sequelize");
const { sequelize } = require("./sequelize");

exports.Sitemap = sequelize.define(
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
      unique: true,
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
