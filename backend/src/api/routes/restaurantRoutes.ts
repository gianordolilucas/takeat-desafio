import { Router } from 'express';
import { createProductController, getPublicRestaurantProductsController, getRestaurantsOrdersController, getRestaurantsProductsController } from '../controllers/RestaurantController';
import authenticateToken from '../middleware/authMiddleware';
import { createOrderController, createPublicOrderController } from '../controllers/OrderController';

const router = Router();
//Public
router.get('/products/:name', getPublicRestaurantProductsController)

router.get('/products', authenticateToken, getRestaurantsProductsController);

router.post('/products',authenticateToken, createProductController);


router.get('/orders', authenticateToken, getRestaurantsOrdersController);

router.post('/orders', createOrderController);

//Public
router.post('/orders/:name', createPublicOrderController)


export default router;
