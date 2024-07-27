import { Messages } from "../utils/messages.js";
import db from "../configuration/Database.js";

const { models } = db;
const { Session, User, Workspace, Notification } = models;

/**
 * Service class for handling session-related operations.
 * @class
 * @memberof module:service
 * @author Kousheek Mahendaran
 */
class SessionService {
  /**
   * Fetches a session by its ID.
   * @param {string} sessionID - The ID of the session to fetch.
   * @returns {Promise<object>} A promise that resolves with the fetched session object or an error message.
   */
  static async findSessionByID(sessionID) {
    try {
      const session = await Session.findByPk(sessionID, {
        include: [
          {
            model: User,
            attributes: ["userID", "firstName", "lastName", "email"],
          },
          {
            model: Workspace, // Include Workspace context
            attributes: ["workspaceID", "name", "description"],
          },
          {
            model: Notification, // Include related notifications
            attributes: [
              "notificationID",
              "content",
              "createdAt",
              "readStatus",
            ],
          },
        ],
      });
      if (!session) {
        throw new Error("Session not found");
      }
      return Messages.success(session);
    } catch (error) {
      console.error("Error finding session:", error);
      return Messages.error(error?.message);
    }
  }

  /**
   * Fetches all sessions.
   * @returns {Promise<object>} A promise that resolves with an array of all sessions or an error message.
   */
  static async findAllSessions() {
    try {
      const sessions = await Session.findAll({
        include: [
          {
            model: User,
            attributes: ["userID", "firstName", "lastName", "email"],
          },
          {
            model: Workspace, // Including Workspace context
            attributes: ["workspaceID", "name", "description"],
          },
          {
            model: Notification, // Include related notifications
            attributes: [
              "notificationID",
              "content",
              "createdAt",
              "readStatus",
            ],
          },
        ],
      });
      return Messages.success(sessions);
    } catch (error) {
      console.error("Error finding all sessions:", error);
      return Messages.error(error?.message);
    }
  }

  /**
   * Saves a new session.
   * @param {object} sessionData - The data of the session to save.
   * @returns {Promise<object>} A promise that resolves with the newly created session object or an error message.
   */
  static async saveSession(sessionData) {
    try {
      const newSession = await Session.create(sessionData);
      return Messages.success(newSession);
    } catch (error) {
      console.error("Error saving session:", error);
      return Messages.error(error?.message);
    }
  }

  /**
   * Updates an existing session.
   * @param {string} sessionID - The ID of the session to update.
   * @param {object} updatedSessionData - The updated data of the session.
   * @returns {Promise<object>} A promise that resolves with the updated session object or an error message.
   */
  static async updateSession(sessionID, updatedSessionData) {
    try {
      const sessionToUpdate = await Session.findByPk(sessionID);
      if (!sessionToUpdate) {
        throw new Error("Session not found");
      }
      await sessionToUpdate.update(updatedSessionData);
      return Messages.success(sessionToUpdate);
    } catch (error) {
      console.error("Error updating session:", error);
      return Messages.error(error?.message);
    }
  }

  /**
   * Deletes a session.
   * @param {string} sessionID - The ID of the session to delete.
   * @returns {Promise<object>} A promise that resolves with the deleted session object or an error message.
   */
  static async deleteSession(sessionID) {
    try {
      const sessionToDelete = await Session.findByPk(sessionID);
      if (!sessionToDelete) {
        throw new Error("Session not found");
      }
      await sessionToDelete.destroy();
      return Messages.success(sessionToDelete);
    } catch (error) {
      console.error("Error deleting session:", error);
      return Messages.error(error?.message);
    }
  }
}

export default SessionService;
