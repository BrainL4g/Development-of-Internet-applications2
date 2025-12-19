import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductItem from './ProductItem';

const initialProducts = [
  { id: 1, name: 'Яблоки', description: 'Свежие зелёные яблоки', price: 120 },
  { id: 2, name: 'Молоко', description: '3.2% жирности, 1л', price: 85 },
  { id: 3, name: 'Хлеб', description: 'Ржаной, нарезанный', price: 45 },
  { id: 4, name: 'Бананы', description: 'Спелые, Эквадор', price: 95 },
];

function ProductList({ products, setProducts }) {
  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
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