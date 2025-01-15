import { createContext } from "react";
import { MenuItem } from "../MenuContext/MenuContext";

export interface CartItem extends MenuItem {
  amount: number;
}

export interface Buyer {
  phone: string
  name?: string
}

export interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  buyer?: Buyer;
  setCartBuyer: (buyer: Buyer) => void;
  saveOrder: (restaurantName: string) => void;
  loading: boolean;
  error: string | null;
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);
