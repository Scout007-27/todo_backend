import { DataTypes } from "sequelize";

/**
 * SubTask model definition (for Sequelize in the format of an array).
 * @typedef {Object} SubTask
 * @property {number} subTaskID - The unique identifier for the subtask.
 * @property {number} taskID - The identifier of the task associated with the subtask.
 * @property {string} title - The title of the subtask.
 * @property {string} description - The description of the subtask.
 * @property {Date} dueDate - The due date of the subtask.
 * @property {string} status - The status of the subtask (Pending, In Progress, Completed).
 * @property {string} priority - The priority of the subtask (Low, Medium, High).
 * @memberof module:models
 * @author Charan Mahendaran, Kousheek Mahendaran
 */
const SubTaskModel = [
  "SubTasks",
  {
    subTaskID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    taskID: {
      type: DataTypes.UUID,
      references: {
        model: "Tasks",
        key: "taskID",
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
      type: DataTypes.ENUM("Pending", "In Progress", "Completed"),
      defaultValue: "Pending",
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

export default SubTaskModel;
