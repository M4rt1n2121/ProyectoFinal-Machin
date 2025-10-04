
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (product, quantity) => {
    console.log('Agregando al carrito:', product.name, 'Cantidad:', quantity); // Debug
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeItem = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
  const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  console.log('Calculando total:', total, 'con carrito:', cart); // DEBUG
  return total;
};

const getTotalItems = () => {
  const total = cart.reduce((total, item) => total + item.quantity, 0);
  console.log('Calculando total items:', total, 'con carrito:', cart); // DEBUG
  return total;
};

  
  const debugCart = () => {
    console.log('Carrito actual:', cart);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addItem,
      removeItem,
      clearCart,
      getTotalItems,
      getTotalPrice,
      debugCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};