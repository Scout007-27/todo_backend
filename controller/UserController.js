import { Router } from "express";
import UserService from "../service/UserService.js";

/**
 * Controller class for handling user-related routes.
 * @memberof module:controller
 * @class
 * @author Kousheek Mahendaran
 */
class UserController {
  /**
   * Fetch a user by its ID.
   * @route GET /users/:userID
   * @param {Express.Request} request - The request object containing the user ID in the URL parameters. Example: `request.params.userID`.
   * @param {Express.Response} response - The response object that will contain the user object if successful or an error message. The response body will be in JSON format, with the following structure:
   *   - Success: `{ status: "success", data: userObject }`
   *   - Error: `{ status: "error", message: "Error message" }`
   * @returns {Promise<void>} - A promise that resolves when the user is fetched.
   */
  static async getUserByID(request, response) {
    try {
      const { userID } = request.params;
      const result = await UserService.findUser(userID);
      response.status(result.status === "success" ? 200 : 400).json(result);
    } catch (error) {
      response.status(500).json({ status: "error", message: error.message });
    }
  }

  /**
   * Find users by category name.
   * @route GET /users/category
   * @param {Express.Request} request - The request object containing the category name in the query parameters. Example: `request.query.categoryName`.
   * @param {Express.Response} response - The response object that will contain an array of users matching the category name or an error message. The response body will be in JSON format, with the following structure:
   *   - Success: `{ status: "success", data: [userObject1, userObject2, ...] }`
   *   - Error: `{ status: "error", message: "Error message" }`
   * @returns {Promise<void>} - A promise that resolves when the users are fetched.
   */
  static async getUserByCategory(request, response) {
    try {
      const { categoryName } = request.query;
      const result = await UserService.findUsersByCategory(categoryName);
      response.status(result.status === "success" ? 200 : 400).json(result);
    } catch (error) {
      response.status(500).json({ status: "error", message: error.message });
    }
  }

  /**
   * Find users by tag name.
   * @route GET /users/tag
   * @param {Express.Request} request - The request object containing the tag name in the query parameters. Example: `request.query.tagName`.
   * @param {Express.Response} response - The response object that will contain an array of users matching the tag name or an error message. The response body will be in JSON format, with the following structure:
   *   - Success: `{ status: "success", data: [userObject1, userObject2, ...] }`
   *   - Error: `{ status: "error", message: "Error message" }`
   * @returns {Promise<void>} - A promise that resolves when the users are fetched.
   */
  static async getUserByTag(request, response) {
    try {
      const { tagName } = request.query;
      const result = await UserService.findUsersByTag(tagName);
      response.status(result.status === "success" ? 200 : 400).json(result);
    } catch (error) {
      response.status(500).json({ status: "error", message: error.message });
    }
  }

  /**
   * Search users by first name or last name.
   * @route GET /users/search
   * @param {Express.Request} request - The request object containing search parameters in the query string.
   * @param {Express.Response} response - The response object containing the search results or an error message.
   * @returns {Promise<void>}
   */
  static async searchUsersByName(request, response) {
    try {
      const { firstName, lastName } = request.query;
      const result = await UserService.searchUsersByName(firstName, lastName);
      response.status(result.status === "success" ? 200 : 404).json(result);
    } catch (error) {
      response.status(500).json({ status: "error", message: error.message });
    }
  }

  /**
   * Create a new user.
   * @route POST /users
   * @param {Express.Request} request - The request object containing the user data in the body. Example: `request.body.userData`.
   * @param {Express.Response} response - The response object that will contain the newly created user object or an error message. The response body will be in JSON format, with the following structure:
   *   - Success: `{ status: "success", data: userObject }`
   *   - Error: `{ status: "error", message: "Error message" }`
   * @returns {Promise<void>} - A promise that resolves when the user is created.
   */
  static async createUser(request, response) {
    try {
      const { userData } = request.body;
      const result = await UserService.saveUser(userData);
      response.status(result.status === "success" ? 201 : 400).json(result);
    } catch (error) {
      response.status(500).json({ status: "error", message: error.message });
    }
  }

  /**
   * Update an existing user.
   * @route PUT /users/:userID
   * @param {Express.Request} request - The request object containing the user ID in the URL parameters and the updated user data in the body. Example: `request.params.userID` and `request.body.updatedUserData`.
   * @param {Express.Response} response - The response object that will contain the updated user object or an error message. The response body will be in JSON format, with the following structure:
   *   - Success: `{ status: "success", data: updatedUserObject }`
   *   - Error: `{ status: "error", message: "Error message" }`
   * @returns {Promise<void>} - A promise that resolves when the user is updated.
   */
  static async updateUser(request, response) {
    try {
      const { userID } = request.params;
      const { updatedUserData } = request.body;
      const result = await UserService.updateUser(userID, updatedUserData);
      response.status(result.status === "success" ? 200 : 400).json(result);
    } catch (error) {
      response.status(500).json({ status: "error", message: error.message });
    }
  }

  /**
   * Delete a user.
   * @route DELETE /users/:userID
   * @param {Express.Request} request - The request object containing the user ID in the URL parameters. Example: `request.params.userID`.
   * @param {Express.Response} response - The response object that will contain a confirmation message or an error message. The response body will be in JSON format, with the following structure:
   *   - Success: `{ status: "success", message: "User deleted successfully" }`
   *   - Error: `{ status: "error", message: "Error message" }`
   * @returns {Promise<void>} - A promise that resolves when the user is deleted.
   */
  static async deleteUser(request, response) {
    try {
      const { userID } = request.params;
      const result = await UserService.deleteUser(userID);
      response.status(result.status === "success" ? 200 : 400).json(result);
    } catch (error) {
      response.status(500).json({ status: "error", message: error.message });
    }
  }
}

// Define the router for user routes
const userRouter = Router();

// Define the routes and their handlers
userRouter.get("/users/:userID", UserController.getUserByID);
userRouter.get("/users/category", UserController.getUserByCategory);
userRouter.get("/users/tag", UserController.getUserByTag);
userRouter.get("/users/search", UserController.searchUsersByName);
userRouter.post("/user", UserController.createUser);
userRouter.put("/users/:userID", UserController.updateUser);
userRouter.delete("/users/:userID", UserController.deleteUser);

export default userRouter;
