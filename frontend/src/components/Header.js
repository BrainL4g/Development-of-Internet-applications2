import { Link, useNavigate } from 'react-router-dom';
import { logout as authLogout } from '../services/auth';

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  const handleLogout = () => {
    authLogout();
    navigate('/login');
  };

  return (
    <header className="main-header">
      <div className="container header-content">
        <h1>
          <Link to="/" className="logo-link">
            🛒 Магазин продуктов
          </Link>
        </h1>
        {token && <button onClick={handleLogout} className="btn-logout">Выйти</button>}
      </div>
    </header>
  );
}

export default Header;