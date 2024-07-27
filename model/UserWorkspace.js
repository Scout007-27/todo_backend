import { DataTypes } from "sequelize";

/**
 * UserWorkspace model definition (for Sequelize in the format of an array).
 * @typedef {Object} UserWorkspace
 * @property {number} UserID - The identifier of the user.
 * @property {number} WorkspaceID - The identifier of the workspace.
 * @memberof module:models
 * @author Charan Mahendaran, Kousheek Mahendaran
 */
const UserWorkspaceModel = [
  "UserWorkspaces",
  {
    userID: {
      type: DataTypes.UUID,
      references: {
        model: "Users",
        key: "userID",
      },
    },
    workspaceID: {
      type: DataTypes.UUID,
      references: {
        model: "Workspaces",
        key: "workspaceID",
      },
    },
  },
];

export default UserWorkspaceModel;
