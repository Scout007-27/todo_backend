import { DataTypes } from "sequelize";

/**
 * Session model definition (for Sequelize in the format of an array).
 * @typedef {Object} Session
 * @property {number} sessionID - The unique identifier for the session.
 * @property {number} userID - The identifier of the user associated with the session.
 * @property {Date} loginTime - The login time of the session.
 * @property {Date} logoutTime - The logout time of the session.
 * @property {string} activities - The activities performed during the session.
 * @memberof module:models
 * @author Charan Mahendaran, Kousheek Mahendaran
 */
const SessionModel = [
  "Sessions",
  {
    sessionID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userID: {
      type: DataTypes.UUID,
      references: {
        model: "Users",
        key: "userID",
      },
    },
    loginTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    logoutTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    activities: {
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

export default SessionModel;
