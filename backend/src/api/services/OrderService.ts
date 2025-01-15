import { ValidationError } from "sequelize";
import { findBuyerByPhone } from "../repositories/BuyerRepository";
import { createBuyerService } from "./BuyerService";
import { createOrder, getOrder } from "../repositories/OrderRepository";
import { findProductById } from "../repositories/ProductRepository";
import { findRestaurantByEmailOrUsername, findRestaurantById } from "../repositories/RestaurantRepository";

export const createOrderService = async (payload: any) => {
  try {
    const { product_id, amount, restaurant_id, buyer_phone, buyer_name, restaurant_name } = payload;

    // Fetch product and restaurant details
    const product = await findProductById(product_id);

    const restaurant = restaurant_name ? await findRestaurantByEmailOrUsername(restaurant_name) : await findRestaurantById(restaurant_id);
    if (!product) {
      throw { status: 404, message: `Product not found with id: ${product_id}` };
    }

    if (!restaurant) {
      throw { status: 404, message: `Restaurant not found with id: ${restaurant_id}` };
    }

    // Calculate total prices
    const totalPrice = amount * product.value;
    const totalServicePrice = restaurant.has_service_tax ? totalPrice * 1.1 : totalPrice;

    

    // Find or create buyer
    let buyer = await findBuyerByPhone(buyer_phone );
    if (!buyer) {
      buyer = await createBuyerService({ phone: buyer_phone, name: buyer_name || null });
    }

    // Create the order
    const order = await createOrder({ 
      product_id,
      amount,
      total_price: totalPrice,
      total_service_price: totalServicePrice,
      restaurant_id: restaurant.id,
      buyer_id: buyer.id,
    });

    return await getOrder(order.id) 
    
  } catch (error) {
    if (error instanceof ValidationError) {
      const validationErrors = error.errors.map((err: any) => err.message);

      if (validationErrors.some((msg: string) => msg.includes('Product'))) {
        throw { status: 422, message: `Product validation error: ${validationErrors.join(', ')}` };
      }

      if (validationErrors.some((msg: string) => msg.includes('Buyer'))) {
        throw { status: 422, message: `Buyer validation error: ${validationErrors.join(', ')}` };
      }

      if (validationErrors.some((msg: string) => msg.includes('Order'))) {
        throw { status: 422, message: `Order validation error: ${validationErrors.join(', ')}` };
      }

      throw { status: 422, message: `Validation error: ${validationErrors.join(', ')}` };
    }

    throw new Error(`Unexpected error: ${String(error)}`);
  }
};



