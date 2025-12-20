import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container form-container">
      <h2>Вход</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="product-form">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" required />
        <div className="form-actions">
          <button type="submit" className="btn-save">Войти</button>
        </div>
      </form>
      <p>Нет аккаунта? <a href="/register">Зарегистрироваться</a></p>
    </div>
  );
}

export default Login;