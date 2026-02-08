import { Routes, Route, useParams } from 'react-router-dom';

import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import Catalog from './pages/Catalog';
import Product from './pages/Product';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

import productsData from './data/products.json';

function ProductWrapper() {
  const { id } = useParams();
  const product = productsData.items.find((item) => item.id === Number(id));
  if (!product) return <NotFound />;
  return <Product {...product} />;
}

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Catalog items={productsData.items} categories={productsData.categories} />} />
          <Route path="product/:id" element={<ProductWrapper />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;
