/**
 * Messages - Utility object for creating standardized message objects.
 * @namespace Messages
 * @memberof module:utils
 * @author Kousheek Mahendaran
 */
export const Messages = {
  /**
   * Creates a success message object.
   * @memberof Messages
   * @function success
   * @param {any} message - The message or data to include in the success object.
   * @returns {Object} Object with status "success", timestamp, and the provided message or data.
   */
  success(message) {
    return { status: "success", timestamp: new Date().toISOString(), message };
  },

  /**
   * Creates an error message object.
   * @memberof Messages
   * @function error
   * @param {any} message - The error message or data to include in the error object.
   * @returns {Object} Object with status "error", timestamp, and the provided error message or data.
   */
  error(message) {
    return { status: "error", timestamp: new Date().toISOString(), message };
  },
};
