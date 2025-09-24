// src/components/ItemDetail/ItemDetail.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount';
import { useCart } from '../../context/CartContext';
import './ItemDetail.css';

const ItemDetail = ({ product }) => {
  const [quantityAdded, setQuantityAdded] = useState(0);
  const { addItem } = useCart();

  const handleOnAdd = (quantity) => {
    console.log('ItemDetail - Cantidad seleccionada:', quantity); // Debug
    setQuantityAdded(quantity);
    addItem(product, quantity);
  };

  return (
    <div className="item-detail cyberpunk-card">
      <div className="item-detail-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="item-detail-info">
        <h2>{product.name}</h2>
        <p className="item-price">${product.price}</p>
        <p className="item-description">{product.description}</p>
        <p className="item-stock">Stock disponible: {product.stock}</p>
        
        {quantityAdded > 0 ? (
          <div className="item-added">
            <p>✓ {quantityAdded} producto(s) agregado(s) al carrito</p>
            <Link to="/cart" className="cyberpunk-button">
              VER CARRITO
            </Link>
            <Link to="/" className="cyberpunk-button secondary">
              SEGUIR COMPRANDO
            </Link>
          </div>
        ) : (
          <ItemCount 
            stock={product.stock} 
            onAdd={handleOnAdd} 
            initial={1}
          />
        )}
        
        <Link to={`/category/${product.category}`} className="back-link">
          ← Volver a {product.category}
        </Link>
      </div>
    </div>
  );
};

export default ItemDetail;