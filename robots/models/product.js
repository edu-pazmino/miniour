const { DataTypes } = require("sequelize");
const { sequelize } = require("./sequelize");

exports.Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // description: {
    //   type: DataTypes.STRING(200),
    //   allowNull: false,
    // },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    coverUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'cover_url'
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
  { tableName: "robots_product", timestamps: false }
);
