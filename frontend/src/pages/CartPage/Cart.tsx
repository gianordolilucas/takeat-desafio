import React, { useContext } from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import { Add, Remove, Delete, ArrowBack } from "@mui/icons-material";
import { MenuContext } from "../../context/MenuContext/MenuContext";
import { CartContext } from "../../context/CartContext/CartContext";
import { useNavigate } from "react-router-dom";
import BuyerEditor from "../../components/Buyer/Modal";

const CartPage: React.FC = () => {
  const navigate = useNavigate();

  const menuContext = useContext(MenuContext);
  const context = useContext(CartContext);

  if (!context) return <Typography>Erro ao carregar o carrinho</Typography>;
  if (!menuContext) return <Typography>Erro ao carregar o menu</Typography>;

  const { cart, setCartBuyer, addToCart, removeFromCart, saveOrder,  buyer } = context;

  const handleSaveBuyerInfo = ({buyerName, buyerPhone}:{buyerName: string, buyerPhone: string}) => {
    setCartBuyer({ name: buyerName, phone: buyerPhone });
  };

  const totalValue = cart.reduce(
    (sum, item) => sum + item.value * item.amount,
    0
  );

  const handleSaveOrder = () => {
    if(buyer?.phone && menuContext.restaurant?.username){
      saveOrder(menuContext.restaurant?.username);
    }else {
      alert("O número do cliente deve ser preenchido");

    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => navigate(-1)} 
        sx={{ marginBottom: 2, alignSelf: 'flex-start' }}
      >
        Voltar
      </Button>

      <Typography sx={{ marginBottom: 2 }} variant="h4" gutterBottom>
        Carrinho
      </Typography>

      <Divider sx={{ marginY: 2 }} />
      
      <Box sx={{ display: "flex", gap: 2, marginBottom: 1, justifyContent: 'space-between' }}>
        <Typography  variant="h6" gutterBottom>
          Dados do cliente
        </Typography>
      </Box>
      
      <BuyerEditor 
        buyerName={buyer?.name} 
        buyerPhone={buyer?.phone}
        handleSaveBuyer={handleSaveBuyerInfo} 
      />

      <Divider sx={{ marginY: 2 }} />

      {cart.length === 0 ? (
        <Typography>O carrinho está vazio</Typography>
      ) : (
        <List>
          {cart.map((item) => (
            <ListItem key={item.id} sx={{ display: "flex", alignItems: "center" }}>
              <ListItemText
                primary={`${item.name} - R$ ${Number(item.value).toFixed(2)}`}
                secondary={`Quantidade: ${item.amount}`}
              />
              <IconButton onClick={() => addToCart({...item, amount:item.amount+1})}>
                <Add />
              </IconButton>
              <IconButton 
                disabled={item.amount <= 1} 
                onClick={() => addToCart({...item, amount:item.amount-1})}
              >
                <Remove />
              </IconButton>
              <IconButton color="secondary" onClick={() => removeFromCart(item.id)}>
                <Delete />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}

      <Divider sx={{ marginY: 2 }} />

      {/* Resumo do Pedido */}
      <Box sx={{ textAlign: "right" }}>
        <Typography variant="h6">Total do Pedido: R$ {totalValue.toFixed(2)}</Typography>
      </Box>

      <Button 
        variant="contained" 
        color="primary" 
        fullWidth 
        sx={{ marginTop: 3 }} 
        disabled={cart.length === 0}
        onClick={handleSaveOrder}
      >
        Realizar Pedido
      </Button>
      
    </Box>
  );
};

export default CartPage;
