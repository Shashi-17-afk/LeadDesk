/**
 * useAuth hook — ergonomic re-export.
 *
 * Separating the hook into its own file follows the convention of
 * importing from `@/hooks/useAuth` rather than the longer context path.
 * Also makes it easier to mock in tests.
 */
export { useAuth } from '@/contexts/AuthContext';
