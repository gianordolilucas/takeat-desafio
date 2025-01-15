import { ReactNode, useState, useEffect } from "react";
import { MenuItem, MenuContext, Restaurant } from "./MenuContext";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";


export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [filteredMenuData, setFilteredMenuData] = useState<MenuItem[]>([]);
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      if (restaurant?.username) {
        try {
          const response = await api.get(`/restaurant/products/${restaurant.username}`);
          setRestaurant((prev)=>({...prev,  email: response.data.email, phone: response.data.phone}))
          setMenuData(response.data.products);
          setFilteredMenuData(response.data.products);
        } catch (error) {
          console.error('deu erro', error);
          navigate("*", { replace: true });
        }
      }
    };
    fetchMenu();
  }, [restaurant?.username]);

  const searchMenuItem = (name: string) => {
    const filteredItems = menuData.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredMenuData(filteredItems);
  };

  const clearFilter = () => {
    setFilteredMenuData(menuData); 
  };

  const setRestaurantName = (name: string) => {
    setRestaurant((prev)=>({...prev, username: name}))
  }

  return (
    <MenuContext.Provider value={{ menuData:filteredMenuData, restaurant, setRestaurantName, searchMenuItem, clearFilter }}>
      {children}
    </MenuContext.Provider>
  );
};
