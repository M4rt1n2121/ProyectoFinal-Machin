import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../data/products';
import ItemDetail from '../ItemDetail/ItemDetail';
import './ItemDetailContainer.css';

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    
    getProductById(id).then(data => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="cyberpunk-loading">
          <div className="loading-spinner"></div>
          <p>CARGANDO PRODUCTO...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="item-detail-container">
        {product ? <ItemDetail product={product} /> : <p>Producto no encontrado</p>}
      </div>
    </div>
  );
};

export default ItemDetailContainer;