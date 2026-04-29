import { useEffect, useState } from "react";

type Author = {
  id: number;
  name: string;
  photo: string;
  status: string;
};

type Book = {
  id: number;
  title: string;
  price: number;
  cover: string;
  file: string; // 🔥 IMPORTANT (PDF path)
  status: string;
};

export default function Admin() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 LOAD DATA
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [aRes, bRes] = await Promise.all([
        fetch("http://localhost:3000/api/admin/authors"),
        fetch("http://localhost:3000/api/admin/books"),
      ]);

      const authorsData = await aRes.json();
      const booksData = await bRes.json();

      setAuthors(authorsData);
      setBooks(booksData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ APPROVE AUTHOR
  const approveAuthor = async (id: number) => {
    await fetch(`http://localhost:3000/api/admin/approve-author/${id}`, {
      method: "POST",
    });

    setAuthors((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "approved" } : a
      )
    );
  };

  // ✅ APPROVE BOOK
  const approveBook = async (id: number) => {
    await fetch(`http://localhost:3000/api/admin/approve-book/${id}`, {
      method: "POST",
    });

    setBooks((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: "approved" } : b
      )
    );
  };

  if (loading) {
    return <div className="p-10">Loading Admin Panel...</div>;
  }

  return (
    <div className="min-h-screen pt-28 px-6 pb-10 bg-gray-50">

      <h1 className="text-3xl font-bold mb-10">
        Admin Panel 🛠️
      </h1>

      {/* ================= AUTHORS ================= */}
      <h2 className="text-xl font-bold mb-4">Authors</h2>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {authors.length === 0 && <p>No authors found</p>}

        {authors.map((a) => (
          <div
            key={a.id}
            className="bg-white p-5 rounded-2xl shadow text-center hover:shadow-lg transition"
          >
            <img
              src={`http://localhost:3000/${a.photo}`}
              onError={(e) =>
                ((e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/100")
              }
              className="w-20 h-20 rounded-full mx-auto object-cover mb-3"
            />

            <h3 className="font-bold">{a.name}</h3>

            <p className="text-sm mt-1">
              Status:{" "}
              <span
                className={
                  a.status === "approved"
                    ? "text-green-600"
                    : "text-yellow-600"
                }
              >
                {a.status}
              </span>
            </p>

            {a.status === "pending" && (
              <button
                onClick={() => approveAuthor(a.id)}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Approve Author
              </button>
            )}
          </div>
        ))}
      </div>

      {/* ================= BOOKS ================= */}
      <h2 className="text-xl font-bold mb-4">Books</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {books.length === 0 && <p>No books found</p>}

        {books.map((b) => (
          <div
            key={b.id}
            className="bg-white p-5 rounded-2xl shadow text-center hover:shadow-lg transition"
          >

            {/* COVER */}
            <img
              src={`http://localhost:3000/${b.cover}`}
              onError={(e) =>
                ((e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/150x200")
              }
              className="w-28 h-36 object-cover mx-auto rounded mb-3"
            />

            <h3 className="font-bold">{b.title}</h3>

            <p className="text-purple-600 font-semibold">
              ₹{b.price}
            </p>

            <p className="text-sm mt-1">
              Status:{" "}
              <span
                className={
                  b.status === "approved"
                    ? "text-green-600"
                    : "text-yellow-600"
                }
              >
                {b.status}
              </span>
            </p>

            {/* 🔥 PREVIEW PDF */}
            {b.file && (
              <a
                href={`http://localhost:3000/${b.file}`}
                target="_blank"
                className="block mt-3 text-blue-500 underline"
              >
                Preview Book 📖
              </a>
            )}

            {/* 🔥 APPROVE */}
            {b.status === "pending" && (
              <button
                onClick={() => approveBook(b.id)}
                className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                Approve Book
              </button>
            )}

          </div>
        ))}
      </div>

    </div>
  );
}