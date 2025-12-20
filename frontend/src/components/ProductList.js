import ProductItem from './ProductItem';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authFetch } from '../services/api';

function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/login');
      return;
    }
    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const res = await authFetch('http://127.0.0.1:8000/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      navigate('/login');
    }
  };

  const handleDelete = async (id) => {
    try {
      await authFetch(`http://127.0.0.1:8000/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="products-grid">
        {products.length === 0 ? (
          <p className="empty">Нет продуктов. Добавьте первый!</p>
        ) : (
          products.map(product => (
            <ProductItem key={product.id} product={product} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
}

export default ProductList;