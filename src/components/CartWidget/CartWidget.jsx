import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartWidget.css';

const CartWidget = () => {
  const { getTotalItems } = useCart();

  return (
    <Link to="/cart" className="cart-widget cyberpunk-cart">
      <span className="cart-icon">🛒</span>
      {getTotalItems() > 0 && (
        <span className="cart-badge">{getTotalItems()}</span>
      )}
    </Link>
  );
};

export default CartWidget;