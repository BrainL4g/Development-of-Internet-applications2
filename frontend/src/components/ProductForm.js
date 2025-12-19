import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductForm({ products, setProducts }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: ''
  });

  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      const product = products.find(p => p.id === parseInt(id));
      if (product) setFormData(product);
    }
  }, [id, products, isEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      // Редактирование
      setProducts(products.map(p => p.id === parseInt(id) ? { ...formData, id: parseInt(id) } : p));
    } else {
      // Добавление нового
      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      const newProduct = { ...formData, id: newId, price: Number(formData.price) };
      setProducts([...products, newProduct]);
    }

    navigate('/');
  };

  return (
    <div className="container form-container">
      <h2>{isEdit ? 'Редактировать продукт' : 'Добавить продукт'}</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Название" required />
        <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Описание" />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Цена (₽)" min="1" required />
        <div className="form-actions">
          <button type="submit" className="btn-save">Сохранить</button>
          <button type="button" onClick={() => navigate('/')} className="btn-cancel">Отмена</button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;