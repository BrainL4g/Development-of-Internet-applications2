import { Link } from 'react-router-dom';

function ProductItem({ product, onDelete }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      {product.description && <p className="description">{product.description}</p>}
      <p className="price">{product.price} ₽</p>
      <div className="actions">
        <Link to={`/edit/${product.id}`} className="btn-edit">Редактировать</Link>
        <button onClick={() => onDelete(product.id)} className="btn-delete">
          Удалить
        </button>
      </div>
    </div>
  );
}

export default ProductItem;