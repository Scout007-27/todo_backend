import { Router } from "express";
import SessionService from "../service/SessionService.js";

/**
 * Controller class for handling session-related routes.
 * @memberof module:controller
 * @class
 * @author Kousheek Mahendaran
 */
class SessionController {
  /**
   * Fetch a session by its ID.
   * @route GET /sessions/:sessionID
   * @param {Express.Request} request - The request object containing the session ID in the URL parameters. Example: `request.params.sessionID`.
   * @param {Express.Response} response - The response object that will contain the session object if successful or an error message. The response body will be in JSON format, with the following structure:
   *   - Success: `{ status: "success", data: sessionObject }`
   *   - Error: `{ status: "error", message: "Error message" }`
   * @returns {Promise<void>} - A promise that resolves when the session is fetched.
   */
  static async getSessionByID(request, response) {
    try {
      const { sessionID } = request.params;
      const result = await SessionService.findSession(sessionID);
      response.status(result.status === "success" ? 200 : 404).json(result);
    } catch (error) {
      response.status(500).json({ status: "error", message: error.message });
    }
  }

  /**
   * Fetch all sessions.
   * @route GET /sessions
   * @param {Express.Request} request - The request object. This endpoint does not require any specific parameters.
   * @param {Express.Response} response - The response object that will contain an array of sessions or an error message. The response body will be in JSON format, with the following structure:
   *   - Success: `{ status: "success", data: [sessionObject1, sessionObject2, ...] }`
   *   - Error: `{ status: "error", message: "Error message" }`
   * @returns {Promise<void>} - A promise that resolves when the sessions are fetched.
   */
  static async getAllSessions(request, response) {
    try {
      const result = await SessionService.findAllSessions();
      response.status(result.status === "success" ? 200 : 404).json(result);
    } catch (error) {
      response.status(500).json({ status: "error", message: error.message });
    }
  }

  /**
   * Create a new session.
   * @route POST /sessions
   * @param {Express.Request} request - The request object containing the session data in the body. Example: `request.body.sessionData`.
   * @param {Express.Response} response - The response object that will contain the newly created session object or an error message. The response body will be in JSON format, with the following structure:
   *   - Success: `{ status: "success", data: sessionObject }`
   *   - Error: `{ status: "error", message: "Error message" }`
   * @returns {Promise<void>} - A promise that resolves when the session is created.
   */
  static async createSession(request, response) {
    try {
      const { sessionData } = request.body;
      const result = await SessionService.saveSession(sessionData);
      response.status(result.status === "success" ? 201 : 400).json(result);
    } catch (error) {
      response.status(500).json({ status: "error", message: error.message });
    }
  }

  /**
   * Update an existing session.
   * @route PUT /sessions/:sessionID
   * @param {Express.Request} request - The request object containing the session ID in the URL parameters and the updated session data in the body. Example: `request.params.sessionID` and `request.body.updatedSessionData`.
   * @param {Express.Response} response - The response object that will contain the updated session object or an error message. The response body will be in JSON format, with the following structure:
   *   - Success: `{ status: "success", data: updatedSessionObject }`
   *   - Error: `{ status: "error", message: "Error message" }`
   * @returns {Promise<void>} - A promise that resolves when the session is updated.
   */
  static async updateSession(request, response) {
    try {
      const { sessionID } = request.params;
      const { updatedSessionData } = request.body;
      const result = await SessionService.updateSession(
        sessionID,
        updatedSessionData
      );
      response.status(result.status === "success" ? 200 : 400).json(result);
    } catch (error) {
      response.status(500).json({ status: "error", message: error.message });
    }
  }

  /**
   * Delete a session.
   * @route DELETE /sessions/:sessionID
   * @param {Express.Request} request - The request object containing the session ID in the URL parameters. Example: `request.params.sessionID`.
   * @param {Express.Response} response - The response object that will contain a confirmation message or an error message. The response body will be in JSON format, with the following structure:
   *   - Success: `{ status: "success", message: "Session deleted successfully" }`
   *   - Error: `{ status: "error", message: "Error message" }`
   * @returns {Promise<void>} - A promise that resolves when the session is deleted.
   */
  static async deleteSession(request, response) {
    try {
      const { sessionID } = request.params;
      const result = await SessionService.deleteSession(sessionID);
      response.status(result.status === "success" ? 200 : 400).json(result);
    } catch (error) {
      response.status(500).json({ status: "error", message: error.message });
    }
  }
}

// Define the router for session routes
const sessionRouter = Router();

// Define the routes and their handlers
sessionRouter.get("/sessions/:sessionID", SessionController.getSessionByID);
sessionRouter.get("/sessions", SessionController.getAllSessions);
sessionRouter.post("/session", SessionController.createSession);
sessionRouter.put("/sessions/:sessionID", SessionController.updateSession);
sessionRouter.delete("/sessions/:sessionID", SessionController.deleteSession);

export default sessionRouter;
