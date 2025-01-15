import React, { useContext, useEffect } from 'react';
import { MenuContext, MenuItem } from '../../context/MenuContext/MenuContext';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../context/CartContext/CartContext';
import { AppBar, Toolbar, Avatar, Box, Typography, Card, CardContent, Button, CircularProgress, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { SearchBar } from '../../components/SearchBar';

export const CardapioPage: React.FC = () => {
  const { restaurantName } = useParams<{ restaurantName: string }>();
  const menuContext = useContext(MenuContext);
  const cartContext = useContext(CartContext);

  useEffect(() => {
    if (restaurantName && menuContext && restaurantName !== menuContext.restaurant?.username) {
      menuContext.setRestaurantName(restaurantName);
    }
  }, [restaurantName, menuContext]);

  if (!menuContext || !cartContext) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const { menuData } = menuContext;
  const { addToCart } = cartContext;

  return (
    <div>
      {/* Top AppBar */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ padding: 1 }}>
        <Toolbar>
          <Avatar alt="Foodies Logo" src="https://via.placeholder.com/50" sx={{ marginRight: 2 }} />
          <Box>
            <Typography variant="h6" color="textPrimary">
              {menuContext?.restaurant?.username}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Typography variant="h4" sx={{ padding: 2 }}>
        Cardápio
      </Typography>

      <Box sx={{ padding: 2 }}>
        <SearchBar />
      </Box>


      <Grid container spacing={2} sx={{ padding: 2 }}>
        {menuData.length > 0 ? (
          menuData.map((item: MenuItem) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    R$ {Number(item.value).toFixed(2)}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => addToCart({ amount: 1, ...item })}
                      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                      <AddIcon />
                      Adicionar
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" color="textSecondary" align="center">
              Sem itens no cardápio...
            </Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
};
