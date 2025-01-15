import { Request, Response } from 'express';
import { createRestaurantService, getRestaurantProductsByIdService, getRestaurantOrderService, createRestaurantProductService, getRestaurantProductsByNameService } from '../services/RestaurantService';

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

export const createRestaurantController = async (req: Request, res: Response) => {
  try {
    const restaurant = await createRestaurantService(req.body);
    res.status(201).json(restaurant);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const createProductController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const restaurantId = req.user?.id;
    const product = await createRestaurantProductService({restaurantId, ...req.body});
    res.status(201).json(product);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const getRestaurantsProductsController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const restaurantId = req.user?.id;
    const restaurants = await getRestaurantProductsByIdService(Number(restaurantId));
    res.status(200).json(restaurants);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const getPublicRestaurantProductsController = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const restaurantsProducts = await getRestaurantProductsByNameService(name);
    res.status(200).json(restaurantsProducts);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const getRestaurantsOrdersController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const restaurantId = req.user?.id;
    const orders = await getRestaurantOrderService(Number(restaurantId));
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
