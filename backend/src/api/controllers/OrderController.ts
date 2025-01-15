import { Request, Response } from 'express';
import { createOrderService } from '../services/OrderService';
import { getRestaurantProductsByNameService } from '../services/RestaurantService';

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

export const createPublicOrderController = async (req: Request, res: Response) => {
  try {
    
    const { name:restaurant_name } = req.params;
    const order = await createOrderService({restaurant_name, ...req.body});
    res.status(200).json(order);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

export const createOrderController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const restaurant_id = req.user?.id
    const order = await createOrderService({restaurant_id, ...req.body});
    res.status(200).json(order);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
}
