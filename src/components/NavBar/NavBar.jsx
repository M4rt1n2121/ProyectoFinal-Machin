import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';
import './NavBar.css';

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (searchTerm.trim()) {
      // Navegar a la ruta de búsqueda
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(''); // Limpiar el campo de búsqueda
    }
  };

  return (
    <nav className="navbar cyberpunk-navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" alt="Tiendalien Logo" className="logo-image" />
        </Link>
        
        <div className="navbar-search">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="BUSCAR PRODUCTOS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <span className="search-icon">⎘</span>
            </button>
          </form>
        </div>
        
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/category/Figuras Funkos" className="navbar-link">
              FIGURAS FUNKOS
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/category/Videojuegos" className="navbar-link">
              VIDEOJUEGOS
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/category/Remeras" className="navbar-link">
              REMERAS
            </Link>
          </li>
        </ul>
        
        <CartWidget />
      </div>
    </nav>
  );
};

export default NavBar;