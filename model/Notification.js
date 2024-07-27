import { DataTypes } from "sequelize";

/**
 * Notification model definition (for Sequelize in the format of an array).
 * @typedef {Object} Notification
 * @property {number} NotificationID - The unique identifier for the notification.
 * @property {number} TaskID - The identifier of the task associated with the notification.
 * @property {number} UserID - The identifier of the user associated with the notification.
 * @property {string} content - The content of the notification.
 * @property {string} type - The type of notification (Invite, Announcement, Reminder).
 * @property {string} readStatus - The read status of the notification (Unread, Read).
 * @memberof module:models
 * @author Charan Mahendaran, Kousheek Mahendaran
 */
const NotificationModel = [
  "Notifications",
  {
    notificationID: {
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
    userID: {
      type: DataTypes.UUID,
      references: {
        model: "Users",
        key: "userID",
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("Invite", "Announcement", "Reminder"),
      defaultValue: "Reminder",
    },
    readStatus: {
      type: DataTypes.ENUM("Unread", "Read"),
      defaultValue: "Unread",
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

export default NotificationModel;
