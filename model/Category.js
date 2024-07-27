import { DataTypes } from "sequelize";

/**
 * Category model definition (for Sequelize in the format of an array).
 * @typedef {Object} Category
 * @property {number} CategoryID - The unique identifier for the category.
 * @property {number} WorkspaceID - The identifier of the workspace the category belongs to.
 * @property {string} name - The name of the category.
 * @property {string} description - The description of the category.
 * @memberof module:models
 * @author Charan Mahendaran, Kousheek Mahendaran
 */
const CategoryModel = [
  "Categories",
  {
    categoryID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    workspaceID: {
      type: DataTypes.UUID,
      references: {
        model: "Workspaces",
        key: "workspaceID",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  },
];

export default CategoryModel;
