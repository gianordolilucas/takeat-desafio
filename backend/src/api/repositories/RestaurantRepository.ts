import { Op, ValidationError } from "sequelize";
import Restaurant from "../../database/models/Restaurant";
import Address from "../../database/models/Address";
import { Buyer, Order, Product } from "../../database/models";

// Find Restaurant
export const findRestaurantById = async (product_id: string) => {
  return Restaurant.findOne({where: {id: product_id}});
};

// Find restaurante by username or email
export const findRestaurantByEmailOrUsername = async (username: string, email?: string) => {
  const whereCondition: any = [{ username }];

  if (email) {
    whereCondition.push({ email });
  }

  return Restaurant.findOne({
    where: {
      [Op.or]: whereCondition,
    },
  });
};
// Find restaurante by email
export const findRestaurantByEmail = async (email: string) => {
  return Restaurant.findOne({ where: { [Op.or]: [{ email }] } });
};

// Find restaurante by username or email
export const findRestaurantProductByName = async (restaurantId: number, productName: string) => {
  return Product.findOne({ where: {restaurant_id: restaurantId, name: productName } });
};



// Creation of restaurant with address association
export const createRestaurant = async (data: any) => {
  try {
    const { address, ...restaurantData } = data;

    return await Restaurant.create(restaurantData, {
      include: [
        {
          model: Address,
          as: 'address',
          required: true,
          validate: true,
          through: {
            attributes: []
          }
        },
      ],
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error(error.errors)
      const validationErrors = error.errors.map((err: any) => err.message);

      if (validationErrors.some((msg: string) => msg.includes('Address'))) {
        throw { status: 422, message: `Address validation error: ${validationErrors.join(', ')}` }
      }
      
      if (validationErrors.some((msg: string) => msg.includes('Restaurant'))) {
        throw { status: 422, message: `Restaurant validation error: ${validationErrors.join(', ')}` }
      }
      throw { status: 422, message: `Validation error: ${validationErrors.join(', ')}` }
    }

    throw new Error(`Unexpected error: ${String(error)}`);
  }
};

export const createRestaurantProduct = async (data: any): Promise<Product> => {
  const {restaurantId, name, value } = data
  return Product.create({restaurant_id: restaurantId, name, value});
}

export const getRestaurantProductsById = async (restauratId: number): Promise<Product[]> => { 
  return Product.findAll({ where: { restaurant_id: restauratId } });
}

export const getRestaurantProductsByNme = async (name: string): Promise<Restaurant | null> => { 
  return await Restaurant.findOne({
    where: { username: name },
    include: [{
      model: Product,
      as: 'products' 
    }]
  });
}

export const getRestaurantOrders = async (restauratId: number): Promise<Order[]> => { 
  return Order.findAll({ where: { restaurant_id: restauratId }, include: [Buyer, ] });
}

