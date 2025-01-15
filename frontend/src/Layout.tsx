import { Box, BottomNavigation, BottomNavigationAction, Badge } from "@mui/material";
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HelpIcon from '@mui/icons-material/Help';
import { useContext } from "react";
import { CartContext } from "./context/CartContext/CartContext";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Main Content */}
      <Box >
        {children}
      </Box>

      {/* Bottom Navigation */}
      <BottomNavigation 
        sx={{ 
          position: 'fixed', 
          bottom: 0, 
          width: '100%', 
          maxWidth: 410, 
          left: '50%', 
          transform: 'translateX(-50%)', 
          display: 'flex',
          justifyItems: 'center',
          
        }} 
        showLabels
      >
        <BottomNavigationAction 
          label="Ajuda" 
          icon={<HelpIcon />} 
          onClick={() => navigate('/takeat/help')}
        />
        <BottomNavigationAction
          onClick={() => cartContext && cartContext.cart.length > 0 && navigate('/takeat/carrinho')}
          label="Pedir"
          icon={
            cartContext && cartContext.cart.length > 0 ? 
            <Badge badgeContent={cartContext.cart.length} color="primary">
              <ShoppingBagIcon />
            </Badge> 
            : <ShoppingBagIcon />
          }
        />
        <BottomNavigationAction label="Pedidos" icon={<DeliveryDiningIcon />} />
      </BottomNavigation>
    </Box>
  );
};

export default Layout;
