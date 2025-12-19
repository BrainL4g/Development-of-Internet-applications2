import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="main-header">
      <div className="container header-content">
        <h1>
          <Link to="/" className="logo-link">
            🛒 Магазин продуктов
          </Link>
        </h1>
      </div>
    </header>
  );
}

export default Header;