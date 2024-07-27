import { Router } from "express";
import TaskService from "../service/TaskService.js";

/**
 * Controller class for handling task-related routes.
 * @memberof module:controller
 * @class
 * @author Kousheek Mahendaran
 */
class TaskController {
  /**
   * Fetch a task by its ID.
   * @route GET /tasks/:taskID
   * @param {Express.Request} request - The request object containing the task ID in the URL parameters. Example: `request.params.taskID`.
   * @param {Express.Response} response - The response object that will contain the task object if successful or an error message. The response body will be in JSON format, with the following structure:
   *   - Success: `{ status: "success", data: taskObject }`
   *   - Error: `{ status: "error", message: "Error message" }`
   * @returns {Promise<Express.Response>} - A Promise that resolves to the response containing the task object or an error message.
   */
  static async getTaskByID(request, response) {
    const { taskID } = request.params;
    const result = await TaskService.findTask(taskID);
    return response
      .status(result.status === "success" ? 200 : 400)
      .json(result);
  }

  /**
   * Find tasks by title name.
   * @route GET /tasks/title
   * @param {Express.Request} request - The request object containing the task title name in the query parameters. Example: `request.query.taskTitle`.
   * @param {Express.Response} response - The response object that will contain an array of tasks matching the task name or an error message. The response body will be in JSON format, with the following structure:
   *   - Success: `{ status: "success", data: [taskObject1, taskObject2, ...] }`
   *   - Error: `{ status: "error", message: "Error message" }`
   * @returns {Promise<Express.Response>} - A Promise that resolves to the response containing the tasks or an error message.
   */
  static async getTasksByTitle(request, response) {
    const { taskTitle, workspaceID } = request.query;
    const result = await TaskService.findTasksByTitle(taskTitle, workspaceID);
    return response
      .status(result.status === "success" ? 200 : 400)
      .json(result);
  }

  /**
   * Find tasks by tag name.
   * @route GET /tasks/tag
   * @param {Express.Request} request - The request object containing the tag name in the query parameters. Example: `request.query.tagName`.
   * @param {Express.Response} response - The response object that will contain an array of tasks matching the tag name or an error message. The response body will be in JSON format, with the following structure:
   *   - Success: `{ status: "success", data: [taskObject1, taskObject2, ...] }`
   *   - Error: `{ status: "error", message: "Error message" }`
   * @returns {Promise<Express.Response>} - A Promise that resolves to the response containing the tasks or an error message.
   */
  static async getTasksByTag(request, response) {
    const { tagName, workspaceID } = request.query;
    const result = await TaskService.findTasksByTag(tagName, workspaceID);
    return response
      .status(result.status === "success" ? 200 : 400)
      .json(result);
  }

  /**
   * Find tasks by category name.
   * @route GET /tasks/category
   * @param {Express.Request} request - The request object containing the category name in the query parameters. Example: `request.query.categoryName`.
   * @param {Express.Response} response - The response object that will contain an array of tasks matching the category name or an error message. The response body will be in JSON format, with the following structure:
   *   - Success: `{ status: "success", data: [taskObject1, taskObject2, ...] }`
   *   - Error: `{ status: "error", message: "Error message" }`
   * @returns {Promise<Express.Response>} - A Promise that resolves to the response containing the tasks or an error message.
   */
  static async getTasksByCategory(request, response) {
    const { categoryName, workspaceID } = request.query;
    const result = await TaskService.findTasksByCategory(
      categoryName,
      workspaceID
    );
    return response
      .status(result.status === "success" ? 200 : 400)
      .json(result);
  }

  /**
   * Fetch all tasks.
   * @route GET /tasks
   * @param {Express.Request} request - The request object.
   * @param {Express.Response} response - The response object that will contain an array of all tasks or an error message. The response body will be in JSON format, with the following structure:
   *   - Success: `{ status: "success", data: [taskObject1, taskObject2, ...] }`
   *   - Error: `{ status: "error", message: "Error message" }`
   * @returns {Promise<Express.Response>} - A Promise that resolves to the response containing the tasks or an error message.
   */
  static async getAllTasks(request, response) {
    const { workspaceID } = request.query;
    const result = await TaskService.findAllTasks(workspaceID);
    return response
      .status(result.status === "success" ? 200 : 400)
      .json(result);
  }

  /**
   * Save a new task.
   * @route POST /tasks
   * @param {Express.Request} request - The request object containing the task data, subtasks data, and the workspace ID in the body. Example: `request.body.taskData`, `request.body.subTasksData`, and `request.body.workspaceID`.
   * @param {Express.Response} response - The response object that will contain the newly created task object or an error message. The response body will be in JSON format, with the following structure:
   *   - Success: `{ status: "success", data: newTaskObject }`
   *   - Error: `{ status: "error", message: "Error message" }`
   * @returns {Promise<Express.Response>} - A Promise that resolves to the response containing the new task or an error message.
   */
  static async createTask(request, response) {
    const { taskData, subTasksData, workspaceID } = request.body;
    const result = await TaskService.saveTask(
      taskData,
      subTasksData,
      workspaceID
    );
    return response
      .status(result.status === "success" ? 201 : 400)
      .json(result);
  }

  /**
   * Update an existing task.
   * @route PUT /tasks/:taskID
   * @param {Express.Request} request - The request object containing the task ID in the URL parameters and the updated task data, subtasks data, and the workspace ID in the body. Example: `request.params.taskID`, `request.body.updatedTaskData`, `request.body.updatedSubTasksData`, and `request.body.workspaceID`.
   * @param {Express.Response} response - The response object that will contain the updated task object or an error message. The response body will be in JSON format, with the following structure:
   *   - Success: `{ status: "success", data: updatedTaskObject }`
   *   - Error: `{ status: "error", message: "Error message" }`
   * @returns {Promise<Express.Response>} - A Promise that resolves to the response containing the updated task or an error message.
   */
  static async updateTask(request, response) {
    const { taskID } = request.params;
    const { updatedTaskData, updatedSubTasksData, workspaceID } = request.body;
    const result = await TaskService.updateTask(
      taskID,
      updatedTaskData,
      updatedSubTasksData,
      workspaceID
    );
    return response
      .status(result.status === "success" ? 200 : 400)
      .json(result);
  }

  /**
   * Delete a task.
   * @route DELETE /tasks/:taskID
   * @param {Express.Request} request - The request object containing the task ID in the URL parameters. Example: `request.params.taskID`.
   * @param {Express.Response} response - The response object that will contain the deleted task object or an error message. The response body will be in JSON format, with the following structure:
   *   - Success: `{ status: "success", message: "Task deleted successfully" }`
   *   - Error: `{ status: "error", message: "Error message" }`
   * @returns {Promise<Express.Response>} - A Promise that resolves to the response containing the deleted task or an error message.
   */
  static async deleteTask(request, response) {
    const { taskID } = request.params;
    const result = await TaskService.deleteTask(taskID);
    return response
      .status(result.status === "success" ? 200 : 400)
      .json(result);
  }
}

// Define the router for task routes
const taskRouter = Router();

// Define the routes and their handlers
taskRouter.get("/tasks/:taskID", TaskController.getTaskByID);
taskRouter.get("/tasks/title", TaskController.getTasksByTitle);
taskRouter.get("/tasks/tag", TaskController.getTasksByTag);
taskRouter.get("/tasks/category", TaskController.getTasksByCategory);
taskRouter.get("/tasks", TaskController.getAllTasks);
taskRouter.post("/task", TaskController.createTask);
taskRouter.put("/tasks/:taskID", TaskController.updateTask);
taskRouter.delete("/tasks/:taskID", TaskController.deleteTask);

export default taskRouter;
