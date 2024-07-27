import { Messages } from "../utils/messages.js";
import db from "../configuration/Database.js";

const { models } = db;
const { Notification } = models;

/**
 * Service class for handling notification-related operations.
 * @class
 * @memberof module:services
 * @author Kousheek Mahendaran
 */
class NotificationService {
  /**
   * Create a new notification.
   * @param {string} userID - The ID of the user to send the notification to.
   * @param {string} content - The notification content.
   * @param {string} [type='Reminder'] - The type of notification (Invite, Announcement, Reminder).
   * @returns {Promise<object>} - A promise that resolves to the result of the operation.
   *   - Success: `{ status: "success", timestamp: ISOString, data: notificationObject }`
   *   - Error: `{ status: "error", timestamp: ISOString, message: "Error message" }`
   */
  static async createNotification(userID, content, type = "Reminder") {
    try {
      const notification = await Notification.create({
        userID: userID,
        content: content,
        type: type,
        readStatus: "Unread", // Default status when creating a notification
      });
      return Messages.success(notification);
    } catch (error) {
      return Messages.error(error.message);
    }
  }

  /**
   * Get notifications for a user.
   * @param {string} userID - The ID of the user whose notifications to retrieve.
   * @returns {Promise<object>} - A promise that resolves to the result of the operation.
   *   - Success: `{ status: "success", timestamp: ISOString, data: [notificationObject1, notificationObject2, ...] }`
   *   - Error: `{ status: "error", timestamp: ISOString, message: "Error message" }`
   */
  static async getNotificationsForUser(userID) {
    try {
      const notifications = await Notification.findAll({
        where: { userID: userID },
      });
      return Messages.success(notifications);
    } catch (error) {
      return Messages.error(error.message);
    }
  }

  /**
   * Mark a notification as read.
   * @param {string} notificationID - The ID of the notification to mark as read.
   * @returns {Promise<object>} - A promise that resolves to the result of the operation.
   *   - Success: `{ status: "success", timestamp: ISOString, data: updatedNotificationObject }`
   *   - Error: `{ status: "error", timestamp: ISOString, message: "Error message" }`
   */
  static async markAsRead(notificationID) {
    try {
      const notification = await Notification.findByPk(notificationID);
      if (!notification) {
        return Messages.error("Notification not found");
      }
      notification.readStatus = "Read"; // Set readStatus to 'Read'
      await notification.save();
      return Messages.success(notification);
    } catch (error) {
      return Messages.error(error.message);
    }
  }

  /**
   * Delete a notification.
   * @param {string} notificationID - The ID of the notification to delete.
   * @returns {Promise<object>} - A promise that resolves to the result of the operation.
   *   - Success: `{ status: "success", timestamp: ISOString, message: "Notification deleted successfully" }`
   *   - Error: `{ status: "error", timestamp: ISOString, message: "Error message" }`
   */
  static async deleteNotification(notificationID) {
    try {
      const notification = await Notification.findByPk(notificationID);
      if (!notification) {
        return Messages.error("Notification not found");
      }
      await notification.destroy();
      return Messages.success("Notification deleted successfully");
    } catch (error) {
      return Messages.error(error.message);
    }
  }
}

export default NotificationService;
