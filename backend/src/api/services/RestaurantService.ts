import { 
  createRestaurant, 
  createRestaurantProduct, 
  findRestaurantByEmailOrUsername, 
  findRestaurantProductByName, 
  getRestaurantOrders, 
  getRestaurantProductsById, 
  getRestaurantProductsByNme } from "../repositories/RestaurantRepository";

export const createRestaurantService = async (payload: any) => {

  const { username, email } = payload;

  // Veryfy username or email is unique
  const existingRestaurant = await findRestaurantByEmailOrUsername(username, email);
  if (existingRestaurant) {
    throw { status: 400, message: 'A restaurant with this username or email already exists.' };
  }

  // Create restaurant
  const restaurant = await createRestaurant({ ...payload });

  // Return restaurant data without password
  const { password: _, ...restaurantData } = restaurant.get();
  return restaurantData;
};  

export const createRestaurantProductService = async (payload: any) => {
  const {restaurantId , name, value } = payload

  // Veryfy username or email is unique
  const existingProduct = await findRestaurantProductByName(restaurantId, name);
  if (existingProduct) {
    throw { status: 400, message: 'A product in this restaurant with this name already exists.' };
  }

  // Create restaurant
  const product = await createRestaurantProduct({...payload});

  // Return restaurant data without password
  // const { password: _, ...restaurantData } = restaurant.get();
  return product;
};
  
export const getRestaurantProductsByIdService = async (restaurantId: number) => {
  try {
    const products = await getRestaurantProductsById(restaurantId);
    return products
  } catch (error) {
    throw new Error(`Unexpected error: ${String(error)}`);
  }
};

export const getRestaurantProductsByNameService = async (name: string) => {
  const restaurantProducts = await getRestaurantProductsByNme(name);
  if (!restaurantProducts) {
    throw { status: 404, message: 'A restaurant with this username no exists.' };
  }
  const { password: _, ...restaurantData } = restaurantProducts.get();
  return restaurantData 
};

export const getRestaurantOrderService = async (restaurantId: number) => {
  try {
    const products = await getRestaurantOrders(restaurantId);
    return products
  } catch (error) {
    throw new Error(`Unexpected error: ${String(error)}`);
  }
};



