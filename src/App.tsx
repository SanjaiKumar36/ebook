import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Browse from './pages/Browse';
import BookDetails from './pages/BookDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import BecomeAuthor from './pages/BecomeAuthor';
import AuthorDashboard from './pages/AuthorDashboard';
import PublishBook from './pages/PublishBook';
import Reader from './pages/Reader';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Admin from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import Library from "./pages/Library";
import UploadBook from './pages/UploadBook';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // 🔥 SPLASH SCREEN
  if (showSplash) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-3xl font-bold">ZippyBooks</h1>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* MAIN LAYOUT */}
        <Route path="/" element={<Layout />}>

          {/* PUBLIC */}
          <Route index element={<LandingPage />} />
          <Route path="about" element={<About />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="browse" element={<Browse />} />
          <Route path="book/:id" element={<BookDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="success" element={<Success />} />

          {/* PROTECTED USER */}
          <Route path="home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />

          <Route path="cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />

          <Route path="checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />

          <Route path="library" element={
            <ProtectedRoute>
              <Library />
            </ProtectedRoute>
          } />

          <Route path="wishlist" element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          } />

          <Route path="author/dashboard" element={
            <ProtectedRoute requireAuthor={true}>
              <AuthorDashboard />
            </ProtectedRoute>
          } />

          <Route path="upload-book" element={
            <ProtectedRoute requireAuthor={true}>
              <UploadBook />
            </ProtectedRoute>
          } />

          <Route path="publish" element={
            <ProtectedRoute requireAuthor={true}>
              <PublishBook />
            </ProtectedRoute>
          } />

          {/* ADMIN 🔥 */}
          <Route path="admin" element={
            <ProtectedRoute requireAdmin={true}>
              <Admin />
            </ProtectedRoute>
          } />

          {/* AUTHOR APPLY (PUBLIC) */}
          <Route path="become-author" element={<BecomeAuthor />} />

        </Route>

        {/* OUTSIDE LAYOUT */}
        <Route path="reader/:id" element={
          <ProtectedRoute>
            <Reader />
          </ProtectedRoute>
        } />

      </Routes>
    </AnimatePresence>
  );
}