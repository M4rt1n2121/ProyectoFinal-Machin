import React, { useState } from 'react';
import './ItemCount.css';

const ItemCount = ({ stock, onAdd }) => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="item-count cyberpunk-counter">
      <div className="quantity-controls">
        <button onClick={decrement} className="cyberpunk-button small">-</button>
        <span className="quantity">{quantity}</span>
        <button onClick={increment} className="cyberpunk-button small">+</button>
      </div>
      <button 
        onClick={() => onAdd(quantity)} 
        className="cyberpunk-button add-to-cart"
        disabled={stock === 0}
      >
        {stock === 0 ? 'SIN STOCK' : 'AGREGAR AL CARRITO'}
      </button>
    </div>
  );
};

export default ItemCount;