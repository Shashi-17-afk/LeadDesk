import { Router } from 'express';
import authRoutes from './auth.js';
import leadsRoutes from './leads.js';

/**
 * v1 API root router.
 *
 * All routes are namespaced under /api/v1 in app.js.
 * Adding v2 in the future is as simple as creating a routes/v2/index.js
 * and mounting it alongside this one.
 */
const router = Router();

router.use('/auth', authRoutes);
router.use('/leads', leadsRoutes);

export default router;
