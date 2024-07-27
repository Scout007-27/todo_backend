import { DataTypes } from "sequelize";

/**
 * TaskTag model definition (for Sequelize in the format of an array).
 * @typedef {Object} TaskTag
 * @property {number} TaskID - The identifier of the task.
 * @property {number} TagID - The identifier of the tag.
 * @memberof module:models
 * @author Charan Mahendaran, Kousheek Mahendaran
 */
const TaskTagModel = [
  "TaskTags",
  {
    taskID: {
      type: DataTypes.UUID,
      references: {
        model: "Tasks",
        key: "taskID",
      },
    },
    tagID: {
      type: DataTypes.UUID,
      references: {
        model: "Tags",
        key: "tagID",
      },
    },
  },
];

export default TaskTagModel;
