import jwt from 'jsonwebtoken';
import redisClient from '../../config/redis';
import { findRestaurantByEmail } from '../repositories/RestaurantRepository';
import { Restaurant } from '../../database/models';

const generateToken = async (userId: string): Promise<string> => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });
  const exipringTime = process.env.JWT_EXPIRATION_TIME ?? 3600;
  await redisClient.set(`auth:${userId}`, token, 'EX', exipringTime ); 
  return token;
};

const logoutUser = async (userId: string): Promise<void> => {
  await redisClient.del(`auth:${userId}`);
};


const loginRestaurant = async ( email: string, password: string): Promise<Restaurant> => {

  // Find restaurant by email
  const restaurant = await findRestaurantByEmail(email);
  // Verify password
  if (!restaurant || !restaurant?.comparePassword(password)) {
    throw{ status: 401, message: 'Invalid username or password.' };
  }

  // Return restaurant data without password
  const { password: _, ...restaurantData } = restaurant.get();
  return restaurantData;
};

export { generateToken, logoutUser, loginRestaurant };
