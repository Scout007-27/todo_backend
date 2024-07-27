import { DataTypes } from "sequelize";

/**
 * User model definition (for Sequelize in the format of an array).
 * @typedef {Object} User
 * @property {number} UserID - The unique identifier for the user.
 * @property {string} firstName - The first name of the user.
 * @property {string} lastName - The last name of the user.
 * @property {string} phoneNumber - The phone number of the user.
 * @property {string} Email - The email address of the user.
 * @property {string} Password - The password of the user.
 * @property {number} WorkspaceID - The identifier of the workspace the user belongs to.
 * @memberof module:models
 * @author Charan Mahendaran, Kousheek Mahendaran
 */
const UserModel = [
  "Users",
  {
    userID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[a-zA-Z]+$/,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[a-zA-Z]+$/,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[0-9\-]+$/,
      },
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100],
      },
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

export default UserModel;
