import { createContext } from "react";

export interface MenuItem {
  id: number;
  name: string;
  value: number;
}

export interface Restaurant {
  username?: string;
  email?: string;
  phone?: string;
}

export interface MenuContextProps {
  menuData: MenuItem[];
  restaurant?: Restaurant;
  setRestaurantName: (name: string) => void;
  searchMenuItem: (name: string) => void;
  clearFilter: () => void;
}

export const MenuContext = createContext<MenuContextProps | undefined>(undefined);
