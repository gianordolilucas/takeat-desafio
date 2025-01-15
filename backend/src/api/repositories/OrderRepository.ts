import { Buyer, Order } from "../../database/models";


export const createOrder = async (payload: any) => {
  const { product_id, amount, restaurant_id, total_price, total_service_price, buyer_id } = payload;
  try {
    return await Order.create({
      amount,
      total_price,
      total_service_price,
      product_id,
      restaurant_id,
      buyer_id: buyer_id,
    });
  }
  catch (err) {
    console.error(err)
    throw {status:500, message: "aiai"}
  }
}

export const getOrder = async (order_id: number) => {
  return await Order.findByPk(order_id, {
    include: [
      {
        model: Buyer,
        as: "buyer",
        attributes: ["id", "name", "phone"], // Ajuste os atributos conforme necessário
      },
    ],
  });
}