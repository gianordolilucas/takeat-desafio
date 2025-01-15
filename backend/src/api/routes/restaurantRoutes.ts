import { Router } from 'express';
import { createProductController, getPublicRestaurantProductsController, getRestaurantsOrdersController, getRestaurantsProductsController } from '../controllers/RestaurantController';
import authenticateToken from '../middleware/authMiddleware';
import { createOrderController, createPublicOrderController } from '../controllers/OrderController';

const router = Router();
/**
 * @swagger
 * /products/{name}:
 *   get:
 *     summary: Retrieve public restaurant products by name
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the restaurant
 *     responses:
 *       200:
 *         description: Successfully retrieved products
 *       404:
 *         description: Products not found for the given restaurant name
 */
router.get('/products/:name', getPublicRestaurantProductsController);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve restaurant products (authentication required)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved products
 *       401:
 *         description: Unauthorized access
 */
router.get('/products', authenticateToken, getRestaurantsProductsController);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product (authentication required)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Product Name"
 *               price:
 *                 type: number
 *                 example: 19.99
 *               description:
 *                 type: string
 *                 example: "Product description here"
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid product data
 */
router.post('/products', authenticateToken, createProductController);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Retrieve restaurant orders (authentication required)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved orders
 *       401:
 *         description: Unauthorized access
 */
router.get('/orders', authenticateToken, getRestaurantsOrdersController);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_name:
 *                 type: string
 *                 example: "Customer Name"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: string
 *                       example: "product_id_123"
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid order data
 */
router.post('/orders', createOrderController);

/**
 * @swagger
 * /orders/{name}:
 *   post:
 *     summary: Create a public order by restaurant name
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the restaurant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_name:
 *                 type: string
 *                 example: "Customer Name"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: string
 *                       example: "product_id_123"
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Public order created successfully
 *       400:
 *         description: Invalid order data
 */
router.post('/orders/:name', createPublicOrderController);



export default router;
