/**
 * Auth Service — Phase 4
 *
 * Contains all authentication business logic.
 * Handles password comparison (bcrypt) and token generation (JWT).
 * This service has no knowledge of Express (req, res, cookies).
 */

/**
 * Validates admin credentials and returns the admin user if valid.
 * @param {string} _email
 * @param {string} _password
 * @returns {Promise<import('../types/index.js').AdminUser>}
 */
export const authenticateAdmin = async (_email, _password) => {
  throw new Error('authenticateAdmin not implemented — coming in Phase 4');
};

/**
 * Retrieves an admin user by ID (used for session restoration).
 * @param {string} _id - Admin user UUID
 * @returns {Promise<import('../types/index.js').AdminUser>}
 */
export const getAdminById = async (_id) => {
  throw new Error('getAdminById not implemented — coming in Phase 4');
};
