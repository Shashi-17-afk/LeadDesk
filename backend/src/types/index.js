/**
 * JSDoc type definitions for the LeadDesk Mini backend.
 *
 * Using JSDoc types in plain JS provides IDE IntelliSense, autocomplete,
 * and documentation benefits without the overhead of a TypeScript build step.
 * These types mirror the Supabase database schema defined in Phase 2.
 */

/**
 * @typedef {'new' | 'contacted' | 'closed'} LeadStatus
 */

/**
 * @typedef {Object} Lead
 * @property {string} id             - UUID primary key
 * @property {string} name           - Submitter's full name
 * @property {string} email          - Submitter's email address
 * @property {string} budget_range   - Selected budget range
 * @property {string} message        - Lead message / project description
 * @property {LeadStatus} status     - Current CRM status
 * @property {string} created_at     - ISO 8601 creation timestamp
 * @property {string} updated_at     - ISO 8601 last-updated timestamp
 */

/**
 * @typedef {Object} AdminUser
 * @property {string} id         - UUID primary key
 * @property {string} email      - Admin email address
 * @property {string} created_at - ISO 8601 creation timestamp
 */

/**
 * @typedef {Object} JwtPayload
 * @property {string} id    - Admin user's UUID
 * @property {string} email - Admin user's email
 * @property {number} iat   - Issued at (Unix timestamp)
 * @property {number} exp   - Expiry (Unix timestamp)
 */
