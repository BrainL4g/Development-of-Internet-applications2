import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import './index.css';

const initialProducts = [
  { id: 1, name: 'Яблоки', description: 'Свежие зелёные яблоки', price: 120 },
  { id: 2, name: 'Молоко', description: '3.2% жирности, 1л', price: 85 },
  { id: 3, name: 'Хлеб', description: 'Ржаной, нарезанный', price: 45 },
  { id: 4, name: 'Бананы', description: 'Спелые, Эквадор', price: 95 },
];

function App() {
  const [products, setProducts] = useState(initialProducts);

  return (
    <Router>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<ProductList products={products} setProducts={setProducts} />} />
          <Route path="/add" element={<ProductForm products={products} setProducts={setProducts} />} />
          <Route path="/edit/:id" element={<ProductForm products={products} setProducts={setProducts} />} />
        </Routes>
      </main>
      <Link to="/add" className="fab-button">+</Link>
    </Router>
  );
}

export default App;