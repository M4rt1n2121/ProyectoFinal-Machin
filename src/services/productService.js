import { 
  collection, 
  getDocs, 
  query, 
  where,
  doc,
  getDoc 
} from 'firebase/firestore';
import { db } from '../firebase/config';


export const getProducts = async () => {
  try {
    const productsCollection = collection(db, 'productos');
    const snapshot = await getDocs(productsCollection);
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const searchProducts = async (searchTerm) => {
  try {
    const productsCollection = collection(db, 'productos');
    const snapshot = await getDocs(productsCollection);
    
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Filtrar productos localmente (Firestore no soporta búsqueda de texto completo fácilmente)
    const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredProducts;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};
export const getProductsByCategory = async (category) => {
  try {
    const productsCollection = collection(db, 'productos');
    const q = query(productsCollection, where('category', '==', category));
    const snapshot = await getDocs(q);
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return products;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};


export const getProductById = async (id) => {
  try {
    const docRef = doc(db, 'productos', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error('Product not found');
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};