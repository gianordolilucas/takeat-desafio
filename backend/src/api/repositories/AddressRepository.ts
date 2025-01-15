import Address from "../../database/models/Address";

//  Create address on Postgres
export const createAddress = async (data: any) => {
  return Address.create(data);
};
