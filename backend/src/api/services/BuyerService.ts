import { createBuyer } from "../repositories/BuyerRepository";

export const createBuyerService = async (payload: any) => {
  const { phone, name } = payload;

   try {
      const buyer = await createBuyer({phone, name});
      return buyer
    } catch (error) {
      throw new Error(`Unexpected error: ${String(error)}`);
    }
};