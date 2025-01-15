import { Request, Response } from 'express';
import { generateToken, loginRestaurant, logoutUser } from '../services/authService';




export const logoutController = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    await logoutUser(userId);
    res.json({ message: 'Logout successful' });
  } catch (err) {
    res.status(500).json({ message: 'Error during logout' });
  }
};


export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const restaurant = await loginRestaurant(email, password)
    const token = await generateToken(String(restaurant.id));
    res.json({ token });
    // res.status(200).json({ message: 'Login successful' });
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err?.message || 'Error on login' });
  }
};