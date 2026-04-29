import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus, ArrowRight, ShieldCheck, Zap, Upload, Image,
  FileText, ChevronLeft, Database, AlertCircle, Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CATEGORIES } from '../constants/categories';

const PublishBook: React.FC = () => {
  const { user, profile } = useAuth();

  const [isProcessing, setIsProcessing] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  const [newBook, setNewBook] = useState({
    title: '',
    description: '',
    price: 0,
    category: CATEGORIES[0].name,
    coverUrl: '',
    pdfUrl: ''
  });

  const navigate = useNavigate();

  // ✅ FIXED UPLOAD (NO API)
  const handleFileUpload = async (file: File) => {
    return URL.createObjectURL(file); // local preview only
  };

  // ✅ FIXED PUBLISH (NO FIREBASE)
  const publishBook = async () => {
    setFormError('');

    if (!user) {
      setFormError('Login required');
      return;
    }

    if (!newBook.title.trim()) {
      setFormError('Book title required');
      return;
    }

    if (newBook.description.length < 50) {
      setFormError('Description min 50 chars');
      return;
    }

    if (newBook.price <= 0) {
      setFormError('Invalid price');
      return;
    }

    if (!newBook.coverUrl || !newBook.pdfUrl) {
      setFormError('Upload files required');
      return;
    }

    setIsProcessing(true);

    try {
      // ✅ DEMO SAVE
      await new Promise(res => setTimeout(res, 1500));

      setFormSuccess(true);

      setTimeout(() => navigate('/author/dashboard'), 1500);

    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // SUCCESS SCREEN
  if (formSuccess) {
    return (
      <div className="section-container flex flex-col items-center justify-center min-h-[80vh] text-center">
        <div className="w-24 h-24 bg-purple-600 rounded-[32px] flex items-center justify-center text-white mb-8">
          <Database size={48} />
        </div>
        <h2 className="text-4xl font-bold mb-4">Book Submitted 🚀</h2>
        <p className="text-gray-500">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="section-container pt-32 pb-32">

      {/* HEADER */}
      <button onClick={() => navigate('/author/dashboard')}>
        <ChevronLeft /> Back
      </button>

      <h1 className="text-5xl font-bold mb-10">
        Publish Book
      </h1>

      <form onSubmit={(e) => { e.preventDefault(); publishBook(); }}>

        {formError && (
          <div className="bg-red-100 p-4 mb-6 flex gap-2">
            <AlertCircle /> {formError}
          </div>
        )}

        {/* TITLE */}
        <input
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          className="block w-full mb-4 p-3 border"
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Description"
          value={newBook.description}
          onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
          className="block w-full mb-4 p-3 border"
        />

        {/* PRICE */}
        <input
          type="number"
          placeholder="Price"
          value={newBook.price}
          onChange={(e) => setNewBook({ ...newBook, price: Number(e.target.value) })}
          className="block w-full mb-4 p-3 border"
        />

        {/* CATEGORY */}
        <select
          value={newBook.category}
          onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
          className="block w-full mb-4 p-3 border"
        >
          {CATEGORIES.map(cat => (
            <option key={cat.id}>{cat.name}</option>
          ))}
        </select>

        {/* COVER */}
        <input
          type="file"
          onChange={async (e) => {
            if (e.target.files?.[0]) {
              const url = await handleFileUpload(e.target.files[0]);
              setNewBook({ ...newBook, coverUrl: url });
            }
          }}
        />

        {/* PDF */}
        <input
          type="file"
          onChange={async (e) => {
            if (e.target.files?.[0]) {
              const url = await handleFileUpload(e.target.files[0]);
              setNewBook({ ...newBook, pdfUrl: url });
            }
          }}
        />

        <button type="submit" className="mt-6 bg-purple-600 text-white p-4 w-full">
          {isProcessing ? "Uploading..." : "Submit Book"}
        </button>

      </form>
    </div>
  );
};

export default PublishBook;