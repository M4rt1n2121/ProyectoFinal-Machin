import { 
  collection, 
  addDoc, 
  doc, 
  getDoc, 
  writeBatch  
} from 'firebase/firestore';
import { db } from '../firebase/config';

export const createOrder = async (orderData) => {
  try {
    console.log('Datos de la orden recibidos:', orderData);
    
    const batch = writeBatch(db);
    const outOfStockItems = [];

    
    for (const item of orderData.items) {
      const productRef = doc(db, 'productos', item.id);
      const productDoc = await getDoc(productRef);
      
      if (!productDoc.exists()) {
        throw new Error(`El producto ${item.name} no existe`);
      }

      const currentStock = productDoc.data().stock;
      
      if (currentStock < item.quantity) {
        outOfStockItems.push(item.name);
      } else {
        
        batch.update(productRef, {
          stock: currentStock - item.quantity
        });
      }
    }

    if (outOfStockItems.length > 0) {
      throw new Error(`No hay suficiente stock para: ${outOfStockItems.join(', ')}`);
    }

    
    const ordersCollection = collection(db, 'orders');
    const orderRef = await addDoc(ordersCollection, {
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString()
    });

    
    await batch.commit();
    
    console.log('Orden creada con ID:', orderRef.id);
    return orderRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getOrder = async (orderId) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    const orderDoc = await getDoc(orderRef);
    
    if (orderDoc.exists()) {
      return {
        id: orderDoc.id,
        ...orderDoc.data()
      };
    } else {
      throw new Error('Order not found');
    }
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};