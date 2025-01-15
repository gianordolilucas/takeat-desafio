import { Product } from "../../database/models";

// Find Product
export const findProductById = async (product_id: string) => {
  return Product.findOne({ where: { id: product_id } });
};