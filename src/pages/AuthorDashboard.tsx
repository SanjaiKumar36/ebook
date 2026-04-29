import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthorDashboard() {
  const { profile } = useAuth();
  const [books, setBooks] = useState<any[]>([]);
  const [sales, setSales] = useState<any[]>([]);
  const navigate = useNavigate();

  // 🔥 FETCH BOOKS
  useEffect(() => {
    fetch("https://ebook-fmjq.onrender.com/api/admin/books")
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error(err));
  }, []);

  // 🔥 FETCH SALES
  useEffect(() => {
    fetch("https://ebook-fmjq.onrender.com/api/sales")
      .then(res => res.json())
      .then(data => setSales(data))
      .catch(err => console.error(err));
  }, []);

  // ✅ REMOVED: All the broken localStorage role-setting useEffects.
  // Role is now managed exclusively in Firestore by admin approval.
  // ProtectedRoute checks profile.role from Firestore — no localStorage hacks needed.

  const totalSales = sales.length;
  const earnings = totalSales * 70;

  return (
    <div className="min-h-screen pt-28 px-6 bg-gray-50">

      {/* 🔥 EARNINGS */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-bold">Earnings 💰</h2>
        <p className="text-2xl font-bold text-green-600 mt-2">₹{earnings}</p>
        <p className="text-sm text-gray-500">Total Sales: {totalSales}</p>
      </div>

      {/* HEADER */}
      <div className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Author Dashboard 🚀</h1>
          <p className="text-gray-500">Manage your books</p>
        </div>

        <button
          onClick={() => navigate("/upload-book")}
          className="bg-purple-600 text-white px-5 py-2 rounded-xl hover:scale-105 transition"
        >
          Upload Book
        </button>
      </div>

      {/* BOOK LIST */}
      {books.length === 0 ? (
        <p className="text-gray-500">No books uploaded yet</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {books.map((b) => (
            <div
              key={b.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={`https://ebook-fmjq.onrender.com/${b.cover || "uploads/default.jpg"}`}
                className="w-full h-40 object-cover rounded mb-2"
              />

              <h3 className="font-bold text-sm">{b.title}</h3>

              <p className="text-xs mt-1">
                Status:
                <span className={`ml-1 font-semibold ${
                  b.status === "approved"
                    ? "text-green-600"
                    : "text-yellow-500"
                }`}>
                  {b.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
