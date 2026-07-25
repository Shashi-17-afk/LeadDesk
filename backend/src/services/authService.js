import bcrypt from 'bcryptjs';
import { supabase } from '../config/supabase.js';
import { createAppError } from '../utils/apiResponse.js';

/**
 * Auth Service — Handles admin credential validation and user retrieval.
 * All functions are database-focused and completely decoupled from Express HTTP.
 */

/**
 * Authenticates an admin user by checking email and bcrypt password hash.
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<import('../types/index.js').AdminUser>} Admin record without password_hash
 */
export const authenticateAdmin = async (email, password) => {
  // Query admin user by email
  const { data: admin, error } = await supabase
    .from('admin_users')
    .select('id, email, password_hash, created_at')
    .eq('email', email.toLowerCase().trim())
    .single();

  if (error || !admin) {
    throw createAppError('Invalid email or password', 401);
  }

  // Compare submitted plain-text password with stored bcrypt hash
  // bcrypt.compare transparently handles both $2a$ and $2b$ hashes
  const isMatch = await bcrypt.compare(password, admin.password_hash);

  if (!isMatch) {
    throw createAppError('Invalid email or password', 401);
  }

  // Omit password_hash before returning user object
  delete admin.password_hash;
  return admin;
};

/**
 * Retrieves an admin user by ID (used for session restoration).
 *
 * @param {string} id - Admin UUID
 * @returns {Promise<import('../types/index.js').AdminUser>}
 */
export const getAdminById = async (id) => {
  if (!id) {
    throw createAppError('Admin ID is required', 400);
  }

  const { data: admin, error } = await supabase
    .from('admin_users')
    .select('id, email, created_at')
    .eq('id', id)
    .single();

  if (error || !admin) {
    throw createAppError('Admin session invalid or user no longer exists', 401);
  }

  return admin;
};
