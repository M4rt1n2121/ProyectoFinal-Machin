import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBYTGREmDl2Y6Fb1oT89ckSXzitZcdDQ-I",
  authDomain: "tiendalien-d3d37.firebaseapp.com",
  projectId: "tiendalien-d3d37",
  storageBucket: "tiendalien-d3d37.firebasestorage.app",
  messagingSenderId: "212011053207",
  appId: "1:212011053207:web:c7f72b29930c58532039d2"
};



const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export default app;