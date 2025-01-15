import express, { Request, Response, Router } from 'express';
import { loginController, logoutController } from '../controllers/authController';
import { createRestaurantController } from '../controllers/RestaurantController';

const router: Router = express.Router();


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticates user and returns a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "user123"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "jwt_token_example"
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', loginController);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logs out user and invalidates the JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "user123"
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post('/logout', logoutController);

/**
 * @swagger
 * /api/restaurants:
 *   post:
 *     summary: Creates a new restaurant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "restaurant123"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "contact@restaurant.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "securepassword123"
 *               phone:
 *                 type: string
 *                 example: "27000000000"
 *               address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                     example: "Rua Exemplo"
 *                   number:
 *                     type: string
 *                     example: "123"
 *                   complement:
 *                     type: string
 *                     example: "Apt 101"
 *                   neighborhood:
 *                     type: string
 *                     example: "Centro"
 *                   city:
 *                     type: string
 *                     example: "São Paulo"
 *                   state:
 *                     type: string
 *                     example: "SP"
 *                   country:
 *                     type: string
 *                     example: "Brasil"
 *                   postal_code:
 *                     type: string
 *                     example: "01234-567"
 *               has_service_tax:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Successfully created the restaurant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "restaurant_id_123"
 *                 username:
 *                   type: string
 *                   example: "restaurant123"
 *                 email:
 *                   type: string
 *                   example: "contact@restaurant.com"
 *                 phone:
 *                   type: string
 *                   example: "+1234567890"
 *                 address:
 *                   type: object
 *                   properties:
 *                     street:
 *                       type: string
 *                       example: "Rua Exemplo"
 *                     number:
 *                       type: string
 *                       example: "123"
 *                     complement:
 *                       type: string
 *                       example: "Apt 101"
 *                     neighborhood:
 *                       type: string
 *                       example: "Centro"
 *                     city:
 *                       type: string
 *                       example: "São Paulo"
 *                     state:
 *                       type: string
 *                       example: "SP"
 *                     country:
 *                       type: string
 *                       example: "Brasil"
 *                     postal_code:
 *                       type: string
 *                       example: "01234-567"
 *                 has_service_tax:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: A restaurant with the same username or email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "A restaurant with this username or email already exists."
 */
router.post('/restaurants', createRestaurantController);

export default router;
