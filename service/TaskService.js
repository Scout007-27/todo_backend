import { Messages } from "../utils/messages.js";
import db from "../configuration/Database.js";

const { models } = db;
const { Task, SubTask, Tag, Category, Notification } = models;

/**
 * Service class for handling task-related operations.
 * @class
 * @memberof module:service
 * @author Kousheek Mahendaran
 */
class TaskService {
  /**
   * Fetches a task by its ID, including its subtasks, notifications, tags, and category.
   * @param {string} taskID - The ID of the task to fetch.
   * @returns {Promise<object>} A promise that resolves with the fetched task object or an error message.
   */
  static async findTaskByID(taskID) {
    try {
      const task = await Task.findByPk(taskID, {
        include: [
          {
            model: SubTask,
            attributes: ["subTaskID", "title", "status", "dueDate"],
          },
          {
            model: Notification,
            attributes: [
              "notificationID",
              "content",
              "createdAt",
              "readStatus",
            ],
          },
          {
            model: Tag,
            attributes: ["tagID", "name"],
            through: { attributes: [] },
          },
          {
            model: Category,
            attributes: ["categoryID", "name"],
          },
        ],
      });
      if (!task) {
        throw new Error("Task not found");
      }
      return Messages.success(task);
    } catch (error) {
      console.error("Error finding task:", error);
      return Messages.error(error?.message);
    }
  }

  /**
   * Finds tasks by their title, including subtasks, notifications, tags, and category.
   * @param {string} taskTitle - The title of the task to search for.
   * @param {string} workspaceID - The ID of the workspace to filter tasks.
   * @returns {Promise<object>} A promise that resolves with an array of tasks matching the title or an error message.
   */
  static async findTasksByTitle(taskTitle, workspaceID) {
    try {
      const tasks = await Task.findAll({
        where: { title: taskTitle, workspaceID: workspaceID },
        include: [
          {
            model: SubTask,
            attributes: ["subTaskID", "title", "status", "dueDate"],
          },
          {
            model: Notification,
            attributes: [
              "notificationID",
              "content",
              "createdAt",
              "readStatus",
            ],
          },
          {
            model: Tag,
            attributes: ["tagID", "name"],
            through: { attributes: [] },
          },
          {
            model: Category,
            attributes: ["categoryID", "name"],
          },
        ],
      });
      return Messages.success(tasks);
    } catch (error) {
      console.error("Error finding tasks by title:", error);
      return Messages.error(error?.message);
    }
  }

  /**
   * Finds tasks by tag name, including subtasks and notifications.
   * @param {string} tagName - The name of the tag to search for.
   * @param {string} workspaceID - The ID of the workspace to filter tasks.
   * @returns {Promise<object>} A promise that resolves with an array of tasks matching the tag name or an error message.
   */
  static async findTasksByTag(tagName, workspaceID) {
    try {
      const tasks = await Task.findAll({
        include: [
          {
            model: Tag,
            where: { name: tagName, workspaceID: workspaceID },
            attributes: ["tagID", "name"],
            through: { attributes: [] },
          },
          {
            model: SubTask,
            attributes: ["subTaskID", "title", "status", "dueDate"],
          },
          {
            model: Notification,
            attributes: [
              "notificationID",
              "content",
              "createdAt",
              "readStatus",
            ],
          },
        ],
      });
      return Messages.success(tasks);
    } catch (error) {
      console.error("Error finding tasks by tag name:", error);
      return Messages.error(error?.message);
    }
  }

  /**
   * Finds tasks by category name, including subtasks and notifications.
   * @param {string} categoryName - The name of the category to search for.
   * @param {string} workspaceID - The ID of the workspace to filter tasks.
   * @returns {Promise<object>} A promise that resolves with an array of tasks matching the category name or an error message.
   */
  static async findTasksByCategory(categoryName, workspaceID) {
    try {
      const tasks = await Task.findAll({
        where: {
          workspaceID: workspaceID,
        },
        include: [
          {
            model: Category,
            where: { name: categoryName },
            attributes: ["categoryID", "name"],
          },
          {
            model: SubTask,
            attributes: ["subTaskID", "title", "status", "dueDate"],
          },
          {
            model: Notification,
            attributes: [
              "notificationID",
              "content",
              "createdAt",
              "readStatus",
            ],
          },
        ],
      });
      return Messages.success(tasks);
    } catch (error) {
      console.error("Error finding tasks by category name:", error);
      return Messages.error(error?.message);
    }
  }

  /**
   * Fetches all tasks, including their subtasks, notifications, tags, and category.
   * @param {string} workspaceID - The ID of the workspace to filter tasks.
   * @returns {Promise<object>} A promise that resolves with an array of all tasks or an error message.
   */
  static async findAllTasks(workspaceID) {
    try {
      const tasks = await Task.findAll({
        where: {
          workspaceID: workspaceID,
        },
        include: [
          {
            model: SubTask,
            attributes: ["subTaskID", "title", "status", "dueDate"],
          },
          {
            model: Notification,
            attributes: [
              "notificationID",
              "content",
              "createdAt",
              "readStatus",
            ],
          },
          {
            model: Tag,
            attributes: ["tagID", "name"],
            through: { attributes: [] },
          },
          {
            model: Category,
            attributes: ["categoryID", "name"],
          },
        ],
      });
      return Messages.success(tasks);
    } catch (error) {
      console.error("Error finding all tasks:", error);
      return Messages.error(error?.message);
    }
  }

  /**
   * Saves a new task along with its subtasks.
   * @param {object} taskData - The data of the task to save.
   * @param {Array<object>} subTasksData - The data of the subtasks to save.
   * @returns {Promise<object>} A promise that resolves with the newly created task object or an error message.
   */
  static async saveTask(taskData, subTasksData = []) {
    try {
      const newTask = await Task.create(taskData);
      const subTasks = await Promise.all(
        subTasksData.map((subTask) =>
          SubTask.create({ ...subTask, taskID: newTask.taskID })
        )
      );
      newTask.SubTasks = subTasks;
      return Messages.success(newTask);
    } catch (error) {
      console.error("Error saving task:", error);
      return Messages.error(error?.message);
    }
  }

  /**
   * Updates an existing task along with its subtasks.
   * @param {string} taskID - The ID of the task to update.
   * @param {object} updatedTaskData - The updated data of the task.
   * @param {Array<object>} updatedSubTasksData - The updated data of the subtasks.
   * @returns {Promise<object>} A promise that resolves with the updated task object or an error message.
   */
  static async updateTask(taskID, updatedTaskData, updatedSubTasksData = []) {
    try {
      const taskToUpdate = await Task.findByPk(taskID, {
        include: [SubTask],
      });
      if (!taskToUpdate) {
        throw new Error("Task not found");
      }

      await taskToUpdate.update(updatedTaskData);

      await Promise.all(
        updatedSubTasksData.map((subTask) => {
          if (subTask.subTaskID) {
            return SubTask.update(subTask, {
              where: { subTaskID: subTask.subTaskID },
            });
          } else {
            return SubTask.create({ ...subTask, taskID: taskToUpdate.taskID });
          }
        })
      );

      return Messages.success(taskToUpdate);
    } catch (error) {
      console.error("Error updating task:", error);
      return Messages.error(error?.message);
    }
  }

  /**
   * Deletes a task along with its subtasks.
   * @param {string} taskID - The ID of the task to delete.
   * @returns {Promise<object>} A promise that resolves with the deleted task object or an error message.
   */
  static async deleteTask(taskID) {
    try {
      const taskToDelete = await Task.findByPk(taskID, {
        include: [SubTask],
      });
      if (!taskToDelete) {
        throw new Error("Task not found");
      }
      await Promise.all(
        taskToDelete.SubTasks.map((subTask) => subTask.destroy())
      );
      await taskToDelete.destroy();
      return Messages.success(taskToDelete);
    } catch (error) {
      console.error("Error deleting task:", error);
      return Messages.error(error?.message);
    }
  }
}

export default TaskService;
