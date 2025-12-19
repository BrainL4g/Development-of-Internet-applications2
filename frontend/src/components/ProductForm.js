import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: ''
  });

  const isEdit = !!id;

  const fetchProduct = useCallback(async () => {
    if (!isEdit) return;
    try {
      const response = await fetch(`http://127.0.0.1:8000/products/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData({
          name: data.name || '',
          description: data.description || '',
          price: data.price || ''
        });
      }
    } catch (error) {
      console.error('Ошибка загрузки продукта:', error);
    }
  }, [id, isEdit]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await fetch(`http://127.0.0.1:8000/products/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        const form = new FormData();
        form.append('name', formData.name);
        form.append('description', formData.description || '');
        form.append('price', formData.price);

        await fetch('http://127.0.0.1:8000/products/', {
          method: 'POST',
          body: form
        });
      }
      navigate('/');
    } catch (error) {
      console.error('Ошибка сохранения:', error);
    }
  };

  return (
    <div className="container form-container">
      <h2>{isEdit ? 'Редактировать продукт' : 'Добавить продукт'}</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Название" required />
        <input type="text" name="description" value={formData.description || ''} onChange={handleChange} placeholder="Описание" />
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
