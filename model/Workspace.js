import { DataTypes } from "sequelize";

/**
 * Workspace model definition (for Sequelize in the format of an array).
 * @typedef {Object} Workspace
 * @property {number} WorkspaceID - The unique identifier for the workspace.
 * @property {string} name - The name of the workspace.
 * @property {string} description - The description of the workspace.
 * @memberof module:models
 * @author Charan Mahendaran, Kousheek Mahendaran
 */
const WorkspaceModel = [
  "Workspaces",
  {
    workspaceID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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

export default WorkspaceModel;
