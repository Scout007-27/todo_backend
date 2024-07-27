import { DataTypes } from "sequelize";

/**
 * Tag model definition (for Sequelize in the format of an array).
 * @typedef {Object} Tag
 * @property {number} tagID - The unique identifier for the tag.
 * @property {number} WorkspaceID - The identifier of the workspace the tag belongs to.
 * @property {string} name - The name of the tag.
 * @memberof module:models
 * @author Charan Mahendaran, Kousheek Mahendaran
 */
const TagModel = [
  "Tags",
  {
    tagID: {
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
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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

export default TagModel;
