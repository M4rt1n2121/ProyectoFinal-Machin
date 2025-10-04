import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts, getProductsByCategory } from '../../services/productService'; // Ruta corregida
import ItemList from '../ItemList/ItemList';
import './ItemListContainer.css';

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { category } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const productsData = category ? 
          await getProductsByCategory(category) : 
          await getProducts();
        
        setProducts(productsData);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="cyberpunk-loading">
          <div className="loading-spinner"></div>
          <p>CARGANDO PRODUCTOS...</p>
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
      <div className="item-list-container">
        <h2 className="category-title">
          {category ? category.toUpperCase() : 'TODOS LOS PRODUCTOS'}
        </h2>
        <ItemList products={products} />
      </div>
    </div>
  );
};

export default ItemListContainer;