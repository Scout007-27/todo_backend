import { Router } from "express";
import TagService from "../service/TagService.js";

/**
 * Controller class for handling tag-related routes.
 * @memberof module:controller
 * @class
 * @author Charan Mahendaran
 */

class TagController {
    /**
     * Fetch a tag by its ID.
     * @route GET /tags/:tagID
     * @param {Express.Request} request - The request object containing the tag ID in the URL parameters. Example: `request.params.tagID`.
     * @param {Express.Response} response - The response object that will contain the tag object if successful or an error message. The response body will be in JSON format, with the following structure:
     *   - Success: `{ status: "success", data: tagObject }`
     *   - Error: `{ status: "error", message: "Error message" }`
     * @returns {Promise<Express.Response>} - A Promise that resolves to the response containing the tag object or an error message.
     */
    static async getTagByID(request, response) {
        const { tagID } = request.params;
        const result = await TagService.findTagByID(tagID);
        return response
            .status(result.status === "success" ? 200 : 400)
            .json(result);
    }

    /**
     * Fetch a tag by its name.
     * @route GET /tags/:tagName
     * @param {Express.Request} request - The request object containing the tag name in the URL parameters. Example: `request.params.tagName`.
     * @param {Express.Response} response - The response object that will contain the tag object if successful or an error message. The response body will be in JSON format, with the following structure:
     *   - Success: `{ status: "success", data: tagObject }`
     *   - Error: `{ status: "error", message: "Error message" }`
     * @returns {Promise<Express.Response>} - A Promise that resolves to the response containing the tag object or an error message.
     */
    static async getTagByName(request, response) {
        const { tagName, workspaceID } = request.query;
        const result = await TagService.findTagByName(tagName, workspaceID);
        return response
            .status(result.status === "success" ? 200 : 400)
            .json(result);
    }

    /**
     * Fetch all tags.
     * @route GET /tags
     * @param {Express.Request} request - The request object.
     * @param {Express.Response} response - The response object that will contain an array of all tags or an error message. The response body will be in JSON format, with the following structure:
     *   - Success: `{ status: "success", data: [tagObject1, tagObject2, ...] }`
     *   - Error: `{ status: "error", message: "Error message" }`
     * @returns {Promise<Express.Response>} - A Promise that resolves to the response containing the tags or an error message.
     */
    static async getAllTags(request, response) {
        const { workspaceID } = request.query;
        const result = await TagService.findAllTags(workspaceID);
        return response
            .status(result.status === "success" ? 200 : 400)
            .json(result);
    }

    /**
     * Save a new tag.
     * @route POST /tags
     * @param {Express.Request} request - The request object containing the tag data, and the workspace ID in the body. Example: `request.body.tagData` and `request.body.workspaceID`.
     * @param {Express.Response} response - The response object that will contain the newly created tag object or an error message. The response body will be in JSON format, with the following structure:
     *   - Success: `{ status: "success", data: newTagObject }`
     *   - Error: `{ status: "error", message: "Error message" }`
     * @returns {Promise<Express.Response>} - A Promise that resolves to the response containing the new tag or an error message.
     */
    static async createTag(request, response) {
        const { tagData, workspaceID } = request.body;
        const result = await TagService.saveTag(
            tagData,
            workspaceID
        );
        return response
            .status(result.status === "success" ? 201 : 400)
            .json(result);
    }

    /**
     * Update an existing tag.
     * @route PUT /tags/:tagID
     * @param {Express.Request} request - The request object containing the tag ID in the URL parameters and the updated tag data, and the workspace ID in the body. Example: `request.params.tagID`, `request.body.updatedTagData` and `request.body.workspaceID`.
     * @param {Express.Response} response - The response object that will contain the updated tag object or an error message. The response body will be in JSON format, with the following structure:
     *   - Success: `{ status: "success", data: updatedTagObject }`
     *   - Error: `{ status: "error", message: "Error message" }`
     * @returns {Promise<Express.Response>} - A Promise that resolves to the response containing the updated tag or an error message.
     */
    static async updateTag(request, response) {
        const { tagID } = request.params;
        const { updatedTagData, workspaceID } = request.body;
        const result = await TagService.updateTag(
            tagID,
            updatedTagData,
            workspaceID
        );
        return response
            .status(result.status === "success" ? 200 : 400)
            .json(result);
    }

    /**
     * Delete a tag.
     * @route DELETE /tags/:tagID
     * @param {Express.Request} request - The request object containing the tag ID in the URL parameters. Example: `request.params.tagsId`.
     * @param {Express.Response} response - The response object that will contain the deleted tag object or an error message. The response body will be in JSON format, with the following structure:
     *   - Success: `{ status: "success", message: "Tag deleted successfully" }`
     *   - Error: `{ status: "error", message: "Error message" }`
     * @returns {Promise<Express.Response>} - A Promise that resolves to the response containing the deleted tag or an error message.
     */
    static async deleteTag(request, response) {
        const { tagID } = request.params;
        const result = await TagService.deleteTag(tagID);
        return response
            .status(result.status === "success" ? 200 : 400)
            .json(result);
    }
}

// Define the router for tag routes
const tagRouter = Router();

// Define the routes and their handlers
tagRouter.get("/tags/:tagID", TagController.getTagByID);
tagRouter.get("/tags/tagName", TagController.getTagByName);
tagRouter.get("/tags", TagController.getAllTags);
tagRouter.post("/tag", TagController.createTag);
tagRouter.put("/tags/:tagID", TagController.updateTag);
tagRouter.delete("/tags/:tagID", TagController.deleteTag);

export default tagRouter;
