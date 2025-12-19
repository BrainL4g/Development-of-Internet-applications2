import ProductItem from './ProductItem';
import { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch('http://127.0.0.1:8000/products');
    const data = await response.json();
    setProducts(data);
  };

  const handleDelete = async (id) => {
    await fetch(`http://127.0.0.1:8000/products/${id}`, { method: 'DELETE' });
    fetchProducts();
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