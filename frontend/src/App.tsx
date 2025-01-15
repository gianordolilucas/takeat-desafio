import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CardapioPage } from './pages/Cardapio/CardapioPage';
import { MenuProvider as CardapioMenuProvider } from './context/MenuContext/MenuProvider'; // Provedor específico para cardápio
import { CartProvider } from './context/CartContext/CartProvider';
import Layout from './Layout';
import NotFound from './pages/NotFound/NotFound';
import CartPage from './pages/CartPage/Cart';
import HelpPage from './pages/Help/HelpPage';

const App = () => {
  return (
    <Router>
      <CardapioMenuProvider>
        <CartProvider>
          <Routes>
            {/* Rotas com Layout */}
            <Route element={<LayoutWrapper />}>
              <Route path="/takeat/cardapio/:restaurantName" element={<CardapioPage />} />
              <Route path="/takeat/help" element={<HelpPage />} />
            </Route>

            {/* Rotas sem Layout */}
            <Route path="/takeat/carrinho" element={<CartPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CartProvider>
      </CardapioMenuProvider>
    </Router>
  );
};

const LayoutWrapper = () => (
  <Layout>
    <Routes>
      <Route path="/takeat/cardapio/:restaurantName" element={<CardapioPage />} />
      <Route path="/takeat/help" element={<HelpPage />} />
    </Routes>
  </Layout>
);

export default App;
