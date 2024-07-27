import { Router } from "express";
import NotificationService from "../service/NotificationService.js";

/**
 * Controller class for handling notification-related routes.
 * @class
 * @memberof module:controller
 */
class NotificationController {
  /**
   * Create a new notification.
   * @route POST /notifications
   * @param {Express.Request} request - The request object containing the user ID and message in the body. Example: `request.body.userID`, `request.body.message`.
   * @param {Express.Response} response - The response object containing the created notification object or an error message. The response body will be in JSON format, with the following structure:
   *   - Success: `{ status: "success", timestamp: ISOString, data: notificationObject }`
   *   - Error: `{ status: "error", timestamp: ISOString, message: "Error message" }`
   * @returns {Promise<Express.Response>} - A Promise that resolves to the response containing the new notification or an error message.
   */
  static async createNotification(request, response) {
    const { userID, message } = request.body;
    const result = await NotificationService.createNotification(
      userID,
      message
    );
    return response
      .status(result.status === "success" ? 201 : 400)
      .json(result);
  }

  /**
   * Get notifications for a user.
   * @route GET /notifications/:userID
   * @param {Express.Request} request - The request object containing the user ID in the URL parameters. Example: `request.params.userID`.
   * @param {Express.Response} response - The response object containing an array of notifications or an error message. The response body will be in JSON format, with the following structure:
   *   - Success: `{ status: "success", timestamp: ISOString, data: [notificationObject1, notificationObject2, ...] }`
   *   - Error: `{ status: "error", timestamp: ISOString, message: "Error message" }`
   * @returns {Promise<Express.Response>} - A Promise that resolves to the response containing the notifications or an error message.
   */
  static async getNotificationsForUser(request, response) {
    const { userID } = request.params;
    const result = await NotificationService.getNotificationsForUser(userID);
    return response
      .status(result.status === "success" ? 200 : 400)
      .json(result);
  }

  /**
   * Mark a notification as read.
   * @route PUT /notifications/:notificationID/read
   * @param {Express.Request} request - The request object containing the notification ID in the URL parameters. Example: `request.params.notificationID`.
   * @param {Express.Response} response - The response object containing the updated notification object or an error message. The response body will be in JSON format, with the following structure:
   *   - Success: `{ status: "success", timestamp: ISOString, data: updatedNotificationObject }`
   *   - Error: `{ status: "error", timestamp: ISOString, message: "Error message" }`
   * @returns {Promise<Express.Response>} - A Promise that resolves to the response containing the updated notification or an error message.
   */
  static async markAsRead(request, response) {
    const { notificationID } = request.params;
    const result = await NotificationService.markAsRead(notificationID);
    return response
      .status(result.status === "success" ? 200 : 400)
      .json(result);
  }

  /**
   * Delete a notification.
   * @route DELETE /notifications/:notificationID
   * @param {Express.Request} request - The request object containing the notification ID in the URL parameters. Example: `request.params.notificationID`.
   * @param {Express.Response} response - The response object containing a success message or an error message. The response body will be in JSON format, with the following structure:
   *   - Success: `{ status: "success", timestamp: ISOString, message: "Notification deleted successfully" }`
   *   - Error: `{ status: "error", timestamp: ISOString, message: "Error message" }`
   * @returns {Promise<Express.Response>} - A Promise that resolves to the response containing the success message or an error message.
   */
  static async deleteNotification(request, response) {
    const { notificationID } = request.params;
    const result = await NotificationService.deleteNotification(notificationID);
    return response
      .status(result.status === "success" ? 200 : 400)
      .json(result);
  }
}

// Define the router for notification routes
const notificationRouter = Router();

// Define routes and their handlers
notificationRouter.post(
  "/notification",
  NotificationController.createNotification
);
notificationRouter.get(
  "/notifications/:userID",
  NotificationController.getNotificationsForUser
);
notificationRouter.put(
  "/notifications/:notificationID/read",
  NotificationController.markAsRead
);
notificationRouter.delete(
  "/notifications/:notificationID",
  NotificationController.deleteNotification
);

export default notificationRouter;
