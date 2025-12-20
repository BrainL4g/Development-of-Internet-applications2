import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/auth';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError('Пароли не совпадают');
      return;
    }
    try {
      await register(email, password, passwordConfirm);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container form-container">
      <h2>Регистрация</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="product-form">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" required />
        <input type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} placeholder="Повторите пароль" required />
        <div className="form-actions">
          <button type="submit" className="btn-save">Зарегистрироваться</button>
        </div>
      </form>
      <p>Уже есть аккаунт? <a href="/login">Войти</a></p>
    </div>
  );
}

export default Register;