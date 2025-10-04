import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchProducts } from '../../services/productService';
import ItemList from '../ItemList/ItemList';
import './SearchResults.css';

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Obtener el término de búsqueda de la URL
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('q');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (searchTerm) {
          const searchResults = await searchProducts(searchTerm);
          setProducts(searchResults);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError('Error al buscar productos');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="cyberpunk-loading">
          <div className="loading-spinner"></div>
          <p>BUSCANDO PRODUCTOS...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-container">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="search-results-container">
        <h2 className="search-results-title">
          RESULTADOS DE BÚSQUEDA: "{searchTerm}"
        </h2>
        {products.length > 0 ? (
          <ItemList products={products} />
        ) : (
          <div className="no-results cyberpunk-card">
            <h3>No se encontraron productos</h3>
            <p>Intenta con otros términos de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;