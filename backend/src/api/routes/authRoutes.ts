import express, { Request, Response, Router } from 'express';
import { loginController, logoutController } from '../controllers/authController';

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

export default router;
