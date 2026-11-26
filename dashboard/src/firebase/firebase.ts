import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBP785OymKYiGdh41Aig8e1qtbkEoYQhmA",
  authDomain: "traffic-accidents-dashboard.firebaseapp.com",
  databaseURL: 'https://traffic-accidents-dashboard-default-rtdb.firebaseio.com',
  projectId: "traffic-accidents-dashboard",
  storageBucket: "traffic-accidents-dashboard.firebasestorage.app",
  messagingSenderId: "836155862979",
  appId: "1:836155862979:web:e5c59778f2c1ecc07fd776"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);