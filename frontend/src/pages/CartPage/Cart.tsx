import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import { Add, Remove, Delete, ArrowBack, PersonAdd } from "@mui/icons-material";
import { MenuContext } from "../../context/MenuContext/MenuContext";
import { CartContext } from "../../context/CartContext/CartContext";
import { useNavigate } from "react-router-dom";
import ModalBuyer from "../../components/Buyer/Modal";

const CartPage: React.FC = () => {
  const [ModalBuyerOpen, setModalBuyerOpen] = useState(false);
  const navigate = useNavigate();

  const menuContext = useContext(MenuContext);
  const context = useContext(CartContext);

  if (!context) return <Typography>Erro ao carregar o carrinho</Typography>;
  if (!menuContext) return <Typography>Erro ao carregar o menu</Typography>;

  const { cart, setCartBuyer, addToCart, removeFromCart, buyer } = context;

  const handleSaveBuyerInfo = ({buyerName, buyerPhone}:{buyerName: string, buyerPhone: string}) => {
    setCartBuyer({ name: buyerName, phone: buyerPhone });
  };

  const totalValue = cart.reduce(
    (sum, item) => sum + item.value * item.amount,
    0
  );

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
      <Button 
        variant="contained" 
        color="primary" 
        onClick={()=>{setModalBuyerOpen(true)}} 
        sx={{ marginBottom: 3 }}
      ><PersonAdd /></Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: 'column', gap: 2, marginBottom: 3 }}>
        <TextField
          label="Nome (opicional)"
          fullWidth
          value={buyer?.name}
          disabled={true}
        />
        <TextField
          label="Telefone*"
          fullWidth
          value={buyer?.phone}
          disabled={true}
        />
      </Box>

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
      >
        Realizar Pedido
      </Button>
      
      <ModalBuyer 
        open={ModalBuyerOpen} 
        onClose={()=>{setModalBuyerOpen(false)}} 
        handleSaveBuyer={handleSaveBuyerInfo} 
      />
    </Box>
  );
};

export default CartPage;
