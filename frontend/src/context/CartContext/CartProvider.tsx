import { ReactNode, useCallback, useState } from "react";
import { CartItem, CartContext, Buyer } from "./CartContext";
import api from "../../services/api";
import { useNavigate } from 'react-router-dom';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [buyer, setBuyer] = useState<Buyer | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const navigate = useNavigate();

  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
      console.log('item.amount',item.amount)
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        const updatedAmount =  item.amount;

        if (updatedAmount <= 0) {
          prevCart.filter(cartItem => cartItem.id !== item.id)
        }else{
          updatedCart[existingItemIndex].amount = updatedAmount ;
        }
        return updatedCart
      }

      return item.amount > 0 ? [...prevCart, item] : prevCart;
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart(prevCart => prevCart.filter(cartItem => cartItem.id !== itemId));
  };

  const setCartBuyer = (buyer: Buyer) => {
    setBuyer({name:buyer?.name, phone: buyer.phone});
  };

  const saveOrder = useCallback(async (restaurantName: string) => {
    setLoading(true);
    setError(null);

    const orderPromises = cart.map(item => 
      api.post(`/restaurant/orders/${restaurantName}`,{
        product_id: item.id,
        amount: item.amount,
        buyer_name: buyer?.name,
        buyer_phone: buyer?.phone,
      })
    );

    try {
      const responses = await Promise.all(orderPromises);
      setCart([]);
      navigate('/confirmation');
      return responses;
    } catch (err) {
      setError('Erro ao salvar pedidos');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [buyer?.name, buyer?.phone, cart, navigate])

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, setCartBuyer, buyer, saveOrder, loading, error }}>
      {children}
    </CartContext.Provider>
  );
};
