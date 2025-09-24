import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts, getProductsByCategory } from '../../data/products';
import ItemList from '../ItemList/ItemList';
import './ItemListContainer.css';

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  useEffect(() => {
    setLoading(true);
    
    const fetchProducts = category ? 
      getProductsByCategory(category) : 
      getProducts();
    
    fetchProducts.then(data => {
      setProducts(data);
      setLoading(false);
    });
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