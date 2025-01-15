import { Router } from 'express';
import restaurantRoutes from './restaurantRoutes';
import publicRoutes from './publicRoutes';

const router = Router();

router.use('/public', publicRoutes);
router.use('/restaurant', restaurantRoutes);

export default router;
