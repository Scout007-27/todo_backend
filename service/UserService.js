import { Messages } from "../utils/messages.js";
import db from "../configuration/Database.js";
import { UserView, UserEditView } from "../views/UserViews.js";

const { models } = db;
const { User, Notification } = models;

/**
 * Service class for handling user-related operations.
 * @class
 * @memberof module:service
 * @author Kousheek Mahendaran
 */
class UserService {
  /**
   * Fetches a user by their ID.
   * @param {string} userID - The ID of the user to fetch.
   * @returns {Promise<object>} A promise that resolves with the fetched user object or an error message.
   */
  static async findUserByID(userID) {
    try {
      const user = await User.findByPk(userID, {
        include: [
          {
            model: Notification,
            attributes: [
              "NotificationID",
              "content",
              "createdAt",
              "readStatus",
            ],
          },
        ],
      });
      if (!user) {
        throw new Error("User not found");
      }
      const userForView = UserView.toDTO(user); // Transform user for viewing
      return Messages.success(userForView);
    } catch (error) {
      console.error("Error finding user:", error);
      return Messages.error(error?.message);
    }
  }

  /**
   * Searches for users by first name or last name.
   * @param {string} [firstName] - The first name to search for.
   * @param {string} [lastName] - The last name to search for.
   * @returns {Promise<object>} - A promise that resolves with the search results or an error message.
   */
  static async searchUsersByName(firstName, lastName) {
    try {
      const query = {};
      if (firstName) query.firstName = firstName;
      if (lastName) query.lastName = lastName;

      // Make sure the query object is valid
      if (Object.keys(query).length === 0) {
        throw new Error("No search parameters provided");
      }

      const users = await User.findAll({
        where: query,
        include: [
          {
            model: Notification,
            attributes: ["NotificationID", "Content", "createdAt"],
          },
        ],
      });

      if (users.length === 0) {
        throw new Error("No users found matching the criteria");
      }

      const usersForView = users.map((user) => UserView.toDTO(user)); // Transform users for viewing
      return Messages.success(usersForView);
    } catch (error) {
      console.error("Error searching users:", error);
      return Messages.error(error?.message);
    }
  }

  /**
   * Saves a new user.
   * @param {object} userData - The data of the user to save.
   * @returns {Promise<object>} A promise that resolves with the newly created user object or an error message.
   */
  static async saveUser(userData) {
    try {
      const newUser = await User.create(userData);
      const newUserForView = UserView.toDTO(newUser); // Transform user for viewing
      return Messages.success(newUserForView);
    } catch (error) {
      console.error("Error saving user:", error);
      return Messages.error(error?.message);
    }
  }

  /**
   * Updates an existing user.
   * @param {string} userID - The ID of the user to update.
   * @param {object} updatedUserData - The updated data of the user.
   * @returns {Promise<object>} A promise that resolves with the updated user object or an error message.
   */
  static async updateUser(userID, updatedUserData) {
    try {
      const userToUpdate = await User.findByPk(userID);
      if (!userToUpdate) {
        throw new Error("User not found");
      }
      await userToUpdate.update(updatedUserData);
      const updatedUserForView = UserEditView.toDTO(userToUpdate); // Transform user for editing view
      return Messages.success(updatedUserForView);
    } catch (error) {
      console.error("Error updating user:", error);
      return Messages.error(error?.message);
    }
  }

  /**
   * Deletes a user.
   * @param {string} userID - The ID of the user to delete.
   * @returns {Promise<object>} A promise that resolves with the deleted user object or an error message.
   */
  static async deleteUser(userID) {
    try {
      const userToDelete = await User.findByPk(userID);
      if (!userToDelete) {
        throw new Error("User not found");
      }
      await userToDelete.destroy();
      const deletedUserForView = UserView.toDTO(userToDelete); // Transform user for viewing
      return Messages.success(deletedUserForView);
    } catch (error) {
      console.error("Error deleting user:", error);
      return Messages.error(error?.message);
    }
  }
}

export default UserService;
