import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, getDoc, getDocs, collection, deleteDoc, setDoc, serverTimestamp, query, where, addDoc } from 'firebase/firestore';
import { Book } from '../types';

interface CartContextType {
  cart: Book[];
  cartTotal: number;
  addToCart: (book: Book) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (book: Book) => Promise<void>;
  myPurchases: Book[];
  fetchPurchases: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<Book[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [myPurchases, setMyPurchases] = useState<Book[]>([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => {
    if (user) {
      fetchWishlist();
      fetchPurchases();
    } else {
      setWishlist([]);
      setMyPurchases([]);
    }
  }, [user]);

  const fetchWishlist = async () => {
    if (!user) return;
    try {
      const snap = await getDocs(collection(db, 'users', user.uid, 'wishlist'));
      setWishlist(snap.docs.map(d => d.id));
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, `users/${user.uid}/wishlist`);
    }
  };

  const fetchPurchases = async () => {
    if (!user) return;
    try {
      const snap = await getDocs(collection(db, 'users', user.uid, 'library'));
      const bks: Book[] = [];
      snap.forEach(d => {
        bks.push({ id: d.id, ...d.data() } as Book);
      });
      setMyPurchases(bks);
    } catch (err) {
      console.error('Error fetching purchases:', err);
    }
  };

  const addToCart = (book: Book) => {
    if (cart.find(i => i.id === book.id)) {
      alert('Asset already in queue');
      return;
    }
    setCart([...cart, book]);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(i => i.id !== id));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = async (book: Book) => {
    if (!user) {
      alert('Please login to use wishlist');
      return;
    }
    const isWishlisted = wishlist.includes(book.id);
    const wishRef = doc(db, 'users', user.uid, 'wishlist', book.id);
    
    if (isWishlisted) {
      try {
        await deleteDoc(wishRef);
        setWishlist(prev => prev.filter(id => id !== book.id));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `users/${user.uid}/wishlist/${book.id}`);
      }
    } else {
      try {
        await setDoc(wishRef, { ...book, addedAt: serverTimestamp() });
        setWishlist(prev => [...prev, book.id]);
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}/wishlist/${book.id}`);
      }
    }
  };

  return (
    <CartContext.Provider value={{ 
      cart, cartTotal, addToCart, removeFromCart, clearCart, 
      wishlist, toggleWishlist, myPurchases, fetchPurchases 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) throw new Error('useCart must be used within CartProvider');
  return context;
};
