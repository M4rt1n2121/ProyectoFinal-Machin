import React from 'react';
import { Link } from 'react-router-dom';
import './ItemList.css';

const ItemList = ({ products }) => {
  return (
    <div className="item-list">
      {products.map(product => (
        <div key={product.id} className="item-card cyberpunk-card">
          <img src={product.image} alt={product.name} />
          <div className="item-info">
            <h3>{product.name}</h3>
            <p className="item-price">${product.price}</p>
            <Link to={`/item/${product.id}`} className="cyberpunk-button">
              VER DETALLE
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;