import { Router } from 'express';
import authRoutes from './auth';
import userRoutes from './user';
import schoolRoutes from './school';
import publicRoutes from './public';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/school', schoolRoutes);
router.use('/', publicRoutes);

export default router;
