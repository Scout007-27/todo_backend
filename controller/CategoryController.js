import { Router } from "express";
import CategoryService from "../service/CategoryService.js";

/**
 * Controller class for handling category-related routes.
 * @memberof module:controller
 * @class
 * @author Charan Mahendaran
 */
class CategoryController {
  /**
   * Fetch a category by its ID.
   * @route GET /categories/:categoryID
   * @param {Express.Request} request - The request object containing the category ID in the URL parameters. Example: `request.params.categoryID`.
   * @param {Express.Response} response - The response object that will contain the category object if successful or an error message. The response body will be in JSON format, with the following structure:
   *   - Success: `{ status: "success", data: categoryObject }`
   *   - Error: `{ status: "error", message: "Error message" }`
   * @returns {Promise<Express.Response>} - A Promise that resolves to the response containing the category object or an error message.
   */
  static async getCategoryByID(request, response) {
    const { categoryID } = request.params;
    const result = await CategoryService.findCategoryByID(categoryID);
    return response
      .status(result.status === "success" ? 200 : 400)
      .json(result);
  }

  /**
   * Fetch a category by its name.
   * @route GET /categories/:categoryName
   * @param {Express.Request} request - The request object containing the category name in the URL parameters. Example: `request.params.categoryName`.
   * @param {Express.Response} response - The response object that will contain the category object if successful or an error message. The response body will be in JSON format, with the following structure:
   *   - Success: `{ status: "success", data: categoryObject }`
   *   - Error: `{ status: "error", message: "Error message" }`
   * @returns {Promise<Express.Response>} - A Promise that resolves to the response containing the category object or an error message.
   */
  static async getCategoryByName(request, response) {
    const { categoryName, workspaceID } = request.query;
    const result = await CategoryService.findCategoryByName(categoryName, workspaceID);
    return response
      .status(result.status === "success" ? 200 : 400)
      .json(result);
  }

  /**
   * Fetch all categories.
   * @route GET /categories
   * @param {Express.Request} request - The request object.
   * @param {Express.Response} response - The response object that will contain an array of all categories or an error message. The response body will be in JSON format, with the following structure:
   *   - Success: `{ status: "success", data: [categoryObject1, categoryObject2, ...] }`
   *   - Error: `{ status: "error", message: "Error message" }`
   * @returns {Promise<Express.Response>} - A Promise that resolves to the response containing the categories or an error message.
   */
  static async getAllCategories(request, response) {
    const { workspaceID } = request.query;
    const result = await CategoryService.findAllCategories(workspaceID);
    return response
      .status(result.status === "success" ? 200 : 400)
      .json(result);
  }

  /**
   * Save a new category.
   * @route POST /categories
   * @param {Express.Request} request - The request object containing the category data, and the workspace ID in the body. Example: `request.body.categoryData` and `request.body.workspaceID`.
   * @param {Express.Response} response - The response object that will contain the newly created category object or an error message. The response body will be in JSON format, with the following structure:
   *   - Success: `{ status: "success", data: newCategoryObject }`
   *   - Error: `{ status: "error", message: "Error message" }`
   * @returns {Promise<Express.Response>} - A Promise that resolves to the response containing the new category or an error message.
   */
  static async createCategory(request, response) {
    const { categoryData, workspaceID } = request.body;
    const result = await CategoryService.saveCategory(
      categoryData,
      workspaceID
    );
    return response
      .status(result.status === "success" ? 201 : 400)
      .json(result);
  }

  /**
   * Update an existing category.
   * @route PUT /categories/:categoryID
   * @param {Express.Request} request - The request object containing the category ID in the URL parameters and the updated category data, and the workspace ID in the body. Example: `request.params.categoryID`, `request.body.updatedCategoryData` and `request.body.workspaceID`.
   * @param {Express.Response} response - The response object that will contain the updated category object or an error message. The response body will be in JSON format, with the following structure:
   *   - Success: `{ status: "success", data: updatedCategoryObject }`
   *   - Error: `{ status: "error", message: "Error message" }`
   * @returns {Promise<Express.Response>} - A Promise that resolves to the response containing the updated category or an error message.
   */
  static async updateCategory(request, response) {
    const { categoryID } = request.params;
    const { updatedCategoryData, workspaceID } = request.body;
    const result = await CategoryService.updateCategory(
      categoryID,
      updatedCategoryData,
      workspaceID
    );
    return response
      .status(result.status === "success" ? 200 : 400)
      .json(result);
  }

  /**
   * Delete a category.
   * @route DELETE /categories/:categoryID
   * @param {Express.Request} request - The request object containing the category ID in the URL parameters. Example: `request.params.categoriesId`.
   * @param {Express.Response} response - The response object that will contain the deleted category object or an error message. The response body will be in JSON format, with the following structure:
   *   - Success: `{ status: "success", message: "Category deleted successfully" }`
   *   - Error: `{ status: "error", message: "Error message" }`
   * @returns {Promise<Express.Response>} - A Promise that resolves to the response containing the deleted category or an error message.
   */
  static async deleteCategory(request, response) {
    const { categoryID } = request.params;
    const result = await CategoryService.deleteCategory(categoryID);
    return response
      .status(result.status === "success" ? 200 : 400)
      .json(result);
  }
}

// Define the router for category routes
const categoryRouter = Router();

// Define the routes and their handlers
categoryRouter.get("/categories/:categoryID", CategoryController.getCategoryByID);
categoryRouter.get("/categories/categoryName", CategoryController.getCategoryByName);
categoryRouter.get("/categories", CategoryController.getAllCategories);
categoryRouter.post("/categories", CategoryController.createCategory);
categoryRouter.put("/categories/:categoryID", CategoryController.updateCategory);
categoryRouter.delete("/categories/:categoryID", CategoryController.deleteCategory);

export default categoryRouter;
