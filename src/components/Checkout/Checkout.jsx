import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { createOrder } from '../../services/orderService';
import './Checkout.css';

const Checkout = () => {
  const { cart, clearCart, getTotalPrice, getTotalItems } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [orderData, setOrderData] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Carrito actual:', cart);
      console.log('Total:', getTotalPrice());
      console.log('Total items:', getTotalItems());

      
      const currentCart = [...cart];
      const currentTotal = getTotalPrice();
      const currentTotalItems = getTotalItems();

      const orderDataToSave = {
        buyer: formData,
        items: currentCart, 
        total: currentTotal,
        totalItems: currentTotalItems,
        date: new Date().toISOString()
      };

      console.log('Datos a enviar a la orden:', orderDataToSave);

      const orderId = await createOrder(orderDataToSave);
      
      
      setOrderData(orderDataToSave);
      setOrderId(orderId);
      
      console.log('Orden creada, limpiando carrito...'); 
      
      clearCart();
      
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error al procesar la orden. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (orderId && orderData) {
    console.log('Mostrando confirmación con datos:', orderData); 
    return (
      <div className="page-container">
        <div className="checkout-success cyberpunk-card">
          <h2>¡ORDEN CONFIRMADA! 🎉</h2>
          <div className="success-details">
            <p><strong>Número de orden:</strong> {orderId}</p>
            <p><strong>Total:</strong> ${orderData.total.toFixed(2)}</p>
            <p><strong>Productos:</strong> {orderData.totalItems}</p>
            <p><strong>Cliente:</strong> {orderData.buyer.name}</p>
            <p><strong>Email:</strong> {orderData.buyer.email}</p>
            <div className="order-items">
              <h4>Productos comprados:</h4>
              {orderData.items.map(item => (
                <div key={item.id} className="order-item">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
          <p>Te hemos enviado un email con los detalles de tu compra.</p>
          <div className="success-actions">
            <button 
              onClick={() => window.location.href = '/'}
              className="cyberpunk-button"
            >
              VOLVER A LA TIENDA
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="checkout-page">
        <div className="checkout-form-section">
          <h2>FINALIZAR COMPRA</h2>
          
          <form onSubmit={handleSubmit} className="checkout-form cyberpunk-card">
            <div className="form-group">
              <label htmlFor="name">Nombre completo *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Ingresa tu nombre completo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="tu@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Teléfono *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="+598 XX-XXX-XXX"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Dirección de envío *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                placeholder="Calle, número, ciudad, código postal"
                rows="3"
              />
            </div>

            <button 
              type="submit" 
              className="cyberpunk-button"
              disabled={loading || cart.length === 0}
            >
              {loading ? 'PROCESANDO...' : `CONFIRMAR COMPRA - $${getTotalPrice().toFixed(2)}`}
            </button>
          </form>
        </div>

        <div className="checkout-summary">
          <div className="summary-card cyberpunk-card">
            <h3>RESUMEN DE COMPRA</h3>
            <div className="summary-items">
              {cart.map(item => (
                <div key={item.id} className="summary-item">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="summary-total">
              <span>Total: ${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="summary-items-count">
              <span>Productos: {getTotalItems()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;