import { Box, Button, Typography } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuContext } from '../../context/MenuContext/MenuContext';

const OrderConfirmedPage = () => {
  const navigate = useNavigate();
  const menuContext = useContext(MenuContext);
  const handleViewOrders = () => {
    navigate(`/takeat/cardapio/${menuContext?.restaurant?.username}`);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Pedido Confirmado!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Obrigado por sua compra. Seu pedido foi realizado com sucesso e está sendo processado.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleViewOrders}
        sx={{ marginTop: 2 }}
      >
        Veltar ao Menu
      </Button>
    </Box>
  );
};

export default OrderConfirmedPage;
