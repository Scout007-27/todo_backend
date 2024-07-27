import { Messages } from "../utils/messages.js";
import db from "../configuration/Database.js";

const { models } = db;
const { Tag, Workspace } = models;

/**
 * Service class for handling tag-related operations.
 * @class
 * @memberof module:service
 * @author Charan Mahendaran
 */
class TagService {
    /**
     * Fetches a tag by its ID.
     * @param {string} tagID - The ID of the tag to fetch.
     * @returns {Promise<object>} A promise that resolves with the fetched tag object or an error message.
     */
    static async findTagByID(tagID) {
        try {
            const tag = await Tag.findByPk(tagID);
            if (!tag) {
                throw new Error("Tag not found");
            }
            return Messages.success(tag);
        } catch (error) {
            console.error("Error finding tag:", error);
            return Messages.error(error?.message);
        }
    }

    /**
     * Fetches a tag by its name.
     * @param {string} tagName - The name of the tag to fetch.
     * @param {string} workspaceID  - The ID of the workspace to filter tag.
     * @returns {Promise<object>} A promise that resolves with the fetched tag object or an error message.
     */
    static async findTagByName(tagName, workspaceID) {
        try {
            const tag = await Tag.findAll({ where: { name: tagName, workspaceID: workspaceID } });
            if (!tag) {
                throw new Error("Tag not found");
            }
            return Messages.success(tag);
        } catch (error) {
            console.error("Error finding tag:", error);
            return Messages.error(error?.message);
        }
    }

    /**
     * Fetches all tags.
     *@param {string} workspaceID - The ID of the workspace to filter tag.
     * @returns {Promise<object>} A promise that resolves with an array of all tags or an error message.
     */
    static async findAllTags(workspaceID) {
        try {
            const tags = await Tag.findAll({
                where: { workspaceID: workspaceID },
                include: [
                    {
                        model: Workspace,
                        attributes: ["workspaceID", "name", "description"],
                    },
                ],
            });
            return Messages.success(tags);
        } catch (error) {
            console.error("Error finding all tags:", error);
            return Messages.error(error?.message);
        }
    }

    /**
     * Saves a new tag.
     * @param {object} tagData - The data of the tag to save.
     * @returns {Promise<object>} A promise that resolves with the newly created tag object or an error message.
     */
    static async saveTag(tagData) {
        try {
            const newTag = await Tag.create(tagData);
            return Messages.success(newTag);
        } catch (error) {
            console.error("Error saving tag:", error);
            return Messages.error(error?.message);
        }
    }

    /**
     * Updates an existing tag.
     * @param {number} tagID - The ID of the tag to update.
     * @param {object} updatedTagData - The updated data of the tag.
     * @returns {Promise<object>} A promise that resolves with the updated tag object or an error message.
     */
    static async updateTag(tagID, updatedTagData) {
        try {
            const tagToUpdate = await Tag.findByPk(tagID);
            if (!tagToUpdate) {
                throw new Error("Tag not found");
            }
            await tagToUpdate.update(updatedTagData);
            return Messages.success(tagToUpdate);
        } catch (error) {
            console.error("Error updating tag:", error);
            return Messages.error(error?.message);
        }
    }

    /**
     * Deletes a tag.
     * @param {number} tagID - The ID of the tag to delete.
     * @returns {Promise<object>} A promise that resolves with the deleted tag object or an error message.
     */
    static async deleteTag(tagID) {
        try {
            const tagToDelete = await Tag.findByPk(tagID);
            if (!tagToDelete) {
                throw new Error("Tag not found");
            }
            await tagToDelete.destroy();
            return Messages.success(tagToDelete);
        } catch (error) {
            console.error("Error deleting tag:", error);
            return Messages.error(error?.message);
        }
    }
}

export default TagService;
