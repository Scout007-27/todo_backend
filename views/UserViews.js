/**
 * UserEditView - Converts a user object to a DTO (Data Transfer Object) for editing purposes.
 * @namespace UserEditView
 * @memberof module:views
 * @author Kousheek Mahendaran
 */
export const UserEditView = {
  /**
   * Converts a user object to a DTO for editing.
   * @memberof UserEditView
   * @function toDTO
   * @param {Object} user - The user object to convert.
   * @returns {Object} DTO representing the user for editing.
   */
  toDTO(user) {
    return {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.Email,
      phoneNumber: user?.phoneNumber,
      password: user?.Password,
      createdAt: user?.createdAt,
    };
  },
};

/**
 * UserView - Converts a user object to a DTO (Data Transfer Object) for viewing purposes.
 * @namespace UserView
 * @memberof module:views
 * @author Kousheek Mahendaran
 */
export const UserView = {
  /**
   * Converts a user object to a DTO for viewing.
   * @memberof UserView
   * @function toDTO
   * @param {Object} user - The user object to convert.
   * @returns {Object} DTO representing the user for viewing.
   */
  toDTO(user) {
    return {
      userId: user?.UserID,
      fullName: `${user?.firstName} ${user?.lastName}`,
      email: user?.Email,
      phoneNumber: user?.phoneNumber,
      createdAt: user?.createdAt,
    };
  },
};
