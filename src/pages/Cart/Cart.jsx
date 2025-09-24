
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeItem, clearCart, getTotalPrice, getTotalItems, debugCart } = useCart();

  
  React.useEffect(() => {
    console.log('Cart page - Carrito actual:', cart);
    debugCart();
  }, [cart, debugCart]);

  if (cart.length === 0) {
    return (
      <div className="page-container">
        <div className="cart-empty cyberpunk-card">
          <h2>🛒 CARRITO VACÍO</h2>
          <p>No hay productos en tu carrito</p>
          <Link to="/" className="cyberpunk-button">
            IR A COMPRAR
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="cart-page">
        <div className="cart-header">
          <h2>TU CARRITO DE COMPRAS</h2>
          <button onClick={clearCart} className="cyberpunk-button secondary">
            VACIAR CARRITO
          </button>
        </div>

        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item cyberpunk-card">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="cart-item-category">{item.category}</p>
                <p className="cart-item-price">${item.price} c/u</p>
              </div>
              <div className="cart-item-quantity">
                <span>Cantidad: {item.quantity}</span>
              </div>
              <div className="cart-item-total">
                <span>Subtotal: ${(item.price * item.quantity).toFixed(2)}</span>
              </div>
              <button 
                onClick={() => removeItem(item.id)} 
                className="cyberpunk-button secondary small"
              >
                ELIMINAR
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary cyberpunk-card">
          <div className="summary-row">
            <span>Total de productos:</span>
            <span>{getTotalItems()}</span>
          </div>
          <div className="summary-row total">
            <span>Total a pagar:</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
          <div className="cart-actions">
            <Link to="/" className="cyberpunk-button secondary">
              SEGUIR COMPRANDO
            </Link>
            <button className="cyberpunk-button">
              FINALIZAR COMPRA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;