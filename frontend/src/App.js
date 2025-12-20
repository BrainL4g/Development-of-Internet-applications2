import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Chat from './components/Chat';
import Login from './components/Login';
import Register from './components/Register';
import './index.css';

function App() {
  return (
    <Router>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<ProductForm />} />
          <Route path="/edit/:id" element={<ProductForm />} />
        </Routes>
        <Chat />
      </main>
      <Link to="/add" className="fab-button">+</Link>
    </Router>
  );
}

export default App;