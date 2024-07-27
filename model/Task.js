import { DataTypes } from "sequelize";

/**
 * Task model definition (for Sequelize in the format of an array).
 * @typedef {Object} Task
 * @property {number} taskID - The unique identifier for the task.
 * @property {number} workspaceID - The identifier of the workspace the task belongs to.
 * @property {number} categoryID - The identifier of the category the task belongs to.
 * @property {number} userID - The identifier of the user the task is assigned to.
 * @property {string} title - The title of the task.
 * @property {string} description - The description of the task.
 * @property {Date} dueDate - The due date of the task.
 * @property {string} status - The status of the task (Not Started, In Progress, Completed).
 * @property {string} priority - The priority of the task (Low, Medium, High).
 * @memberof module:models
 * @author Charan Mahendaran, Kousheek Mahendaran
 */
const TaskModel = [
  "Tasks",
  {
    taskID: {
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
    categoryID: {
      type: DataTypes.UUID,
      references: {
        model: "Categories",
        key: "categoryID",
      },
    },
    userID: {
      type: DataTypes.UUID,
      references: {
        model: "Users",
        key: "userID",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Not Started", "In Progress", "Completed"),
      defaultValue: "Not Started",
    },
    priority: {
      type: DataTypes.ENUM("Low", "Medium", "High"),
      defaultValue: "Medium",
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

export default TaskModel;
