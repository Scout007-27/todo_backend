import { Messages } from "../utils/messages.js";
import db from "../configuration/Database.js";

const { models } = db;
const { Category, Workspace } = models;

/**
 * Service class for handling category-related operations.
 * @class
 * @memberof module:service
 * @author Charan Mahendaran
 */
class CategoryService {
  /**
   * Fetches a category by its ID.
   * @param {number} categoryID - The ID of the category to fetch.
   * @returns {Promise<object>} A promise that resolves with the fetched category object or an error message.
   */
  static async findCategoryByID(categoryID) {
    try {
      const category = await Category.findByPk(categoryID);
      if (!category) {
        throw new Error("Category not found");
      }
      return Messages.success(category);
    } catch (error) {
      console.error("Error finding category:", error);
      return Messages.error(error?.message);
    }
  }

  /**
   * Fetches a category by its name.
   * @param {string} categoryName - The name of the category to fetch.
   * @param {string} workspaceID  - The ID of the workspace to filter category.
   * @returns {Promise<object>} A promise that resolves with the fetched category object or an error message.
   */
  static async findCategoryByName(categoryName, workspaceID) {
    try {
      const category = await Category.findAll({ where: { name: categoryName, workspaceID: workspaceID } });
      if (!category) {
        throw new Error("Category not found");
      }
      return Messages.success(category);
    } catch (error) {
      console.error("Error finding category:", error);
      return Messages.error(error?.message);
    }
  }

  /**
   * Fetches all categories in a given workspace.
   * @param {string} workspaceID - The ID of the workspace to filter category.
   * @returns {Promise<object>} A promise that resolves with an array of all categories or an error message.
   */
  static async findAllCategories(workspaceID) {
    try {
      const categories = await Category.findAll({
        where: { workspaceID: workspaceID },
        include: [
          {
            model: Workspace,
            attributes: ["workspaceID", "name", "description"],
          },
        ],
      });
      return Messages.success(categories);
    } catch (error) {
      console.error("Error finding all categories:", error);
      return Messages.error(error?.message);
    }
  }

  /**
   * Saves a new category.
   * @param {object} categoryData - The data of the category to save.
   * @returns {Promise<object>} A promise that resolves with the newly created category object or an error message.
   */
  static async saveCategory(categoryData) {
    try {
      const newCategory = await Category.create(categoryData);
      return Messages.success(newCategory);
    } catch (error) {
      console.error("Error saving category:", error);
      return Messages.error(error?.message);
    }
  }

  /**
   * Updates an existing category.
   * @param {number} categoryID - The ID of the category to update.
   * @param {object} updatedCategoryData - The updated data of the category.
   * @returns {Promise<object>} A promise that resolves with the updated category object or an error message.
   */
  static async updateCategory(categoryID, updatedCategoryData) {
    try {
      const categoryToUpdate = await Category.findByPk(categoryID);
      if (!categoryToUpdate) {
        throw new Error("Category not found");
      }
      await categoryToUpdate.update(updatedCategoryData);
      return Messages.success(categoryToUpdate);
    } catch (error) {
      console.error("Error updating category:", error);
      return Messages.error(error?.message);
    }
  }

  /**
   * Deletes a category.
   * @param {number} categoryID - The ID of the category to delete.
   * @returns {Promise<object>} A promise that resolves with the deleted category object or an error message.
   */
  static async deleteCategory(categoryID) {
    try {
      const categoryToDelete = await Category.findByPk(categoryID);
      if (!categoryToDelete) {
        throw new Error("Category not found");
      }
      await categoryToDelete.destroy();
      return Messages.success(categoryToDelete);
    } catch (error) {
      console.error("Error deleting category:", error);
      return Messages.error(error?.message);
    }
  }
}

export default CategoryService;
