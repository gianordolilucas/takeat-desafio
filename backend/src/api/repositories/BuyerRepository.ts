import { Buyer } from "../../database/models";

// Find Buyer by phone
export const findBuyerByPhone = async (phone: string) => {
  return Buyer.findOne({ where: { phone: phone } });
};

export const createBuyer = async (payload: any) => {
  const { phone, name } = payload;

  return Buyer.create({
    phone,
    name,
  });
};