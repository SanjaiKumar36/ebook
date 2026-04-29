import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CATEGORIES } from "../constants/categories";

// ✅ ENV BASED API (IMPORTANT)
const API_URL = import.meta.env.VITE_API_URL;

const Home: React.FC = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const isAuthor = localStorage.getItem("role") === "author";

<button
  onClick={() =>
    navigate(isAuthor ? "/author/dashboard" : "/become-author")
  }
>
  
</button>
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await fetch(`${API_URL}/api/books`);
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 SAFE SEARCH FILTER
  const filteredBooks = books.filter((b) =>
    b.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="section-container pt-32 pb-32">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between mb-16">

        <div>
          <h1 className="text-4xl font-bold">
            Welcome,{" "}
            <span className="text-purple-600">
              {user?.displayName || "Reader"}
            </span>
          </h1>
        </div>

        {/* SEARCH */}
        <div className="relative mt-6 lg:mt-0">
          <Search className="absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-xl"
          />
        </div>

      </div>

      {/* CATEGORIES */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {CATEGORIES.slice(0, 8).map((cat) => (
          <button
            key={cat.id}
            onClick={() => navigate(`/browse?cat=${cat.name}`)}
            className="p-4 border rounded-xl hover:bg-gray-100"
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* 🔥 BOOKS SECTION */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold mb-6">Books</h2>

        {loading ? (
          <p>Loading...</p>
        ) : filteredBooks.length === 0 ? (
          <p>No books found</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            {filteredBooks.map((b) => (
              <div
                key={b.id}
                className="bg-white p-4 rounded-xl shadow hover:scale-105 transition"
              >

                {/* COVER */}
                <img
                  src={`${API_URL}/${b.cover}`}
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/150")
                  }
                  className="w-full h-40 object-cover rounded mb-2"
                />

                {/* TITLE */}
                <h3 className="font-bold text-sm">{b.title}</h3>

                {/* PRICE */}
                <p className="text-purple-600 font-semibold">
                  ₹{b.price}
                </p>

                {/* BUTTON */}
                <button
                  onClick={() => navigate(`/book/${b.id}`)}
                  className="text-sm text-purple-600 mt-1 hover:underline"
                >
                  View Details
                </button>

              </div>
            ))}

          </div>
        )}
      </div>

      {/* AUTHOR SECTION */}
      {profile?.role !== "admin" && (
        <div className="p-8 border rounded-2xl flex justify-between items-center">

          <div>
            <h3 className="text-xl font-bold">
              {isAuthor ? "Welcome Author 🚀" : "Become an Author"}
            </h3>

            <p className="text-gray-500">
              {isAuthor ? "Manage your books" : "Publish and earn"}
            </p>
          </div>

          <button
            onClick={() =>
              navigate(isAuthor ? "/author/dashboard" : "/become-author")
            }
            className="bg-purple-600 text-white px-6 py-2 rounded-xl"
          >
            {isAuthor ? "Dashboard" : "Become Author"}
          </button>

        </div>
      )}

    </div>
  );
};

export default Home;