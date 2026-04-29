import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL + "/api";

export default function AdminDashboard() {
  const [authors, setAuthors] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);

  // 🔥 FETCH AUTHORS
  const fetchAuthors = async () => {
    const res = await fetch(`${API}/admin/authors`);
    const data = await res.json();
    setAuthors(data);
  };

  // 🔥 FETCH BOOKS
  const fetchBooks = async () => {
    const res = await fetch(`${API}/admin/books`);
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchAuthors();
    fetchBooks();
  }, []);

  // 🔥 APPROVE AUTHOR
  const approveAuthor = async (id: number) => {
    await fetch(`${API}/admin/approve-author/${id}`, {
      method: "POST",
    });

    fetchAuthors();
  };

  // 🔥 APPROVE BOOK
  const approveBook = async (id: number) => {
    await fetch(`${API}/admin/approve-book/${id}`, {
      method: "POST",
    });

    fetchBooks();
  };

  return (
    <div className="min-h-screen pt-28 px-6 bg-gray-50">

      <h1 className="text-3xl font-bold mb-10">
        Admin Panel 👨‍💼
      </h1>

      {/* 🔥 AUTHORS */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Author Requests</h2>

        {authors.length === 0 ? (
          <p>No authors</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">

            {authors.map((a) => (
              <div key={a.id} className="bg-white p-5 rounded-xl shadow">

                <img
                  src={`${import.meta.env.VITE_API_URL}/${a.photo}`}
                  className="w-full h-40 object-cover rounded mb-2"
                />

                <h3 className="font-bold">{a.name}</h3>
                <p className="text-sm text-gray-500">{a.category}</p>

                <p className="text-xs mt-2">
                  Status:
                  <span className={`ml-1 ${
                    a.status === "approved"
                      ? "text-green-600"
                      : "text-yellow-500"
                  }`}>
                    {a.status}
                  </span>
                </p>

                {a.status !== "approved" && (
                  <button
                    onClick={() => approveAuthor(a.id)}
                    className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Approve
                  </button>
                )}

              </div>
            ))}

          </div>
        )}
      </div>

      {/* 🔥 BOOKS */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Books Approval</h2>

        {books.length === 0 ? (
          <p>No books</p>
        ) : (
          <div className="grid md:grid-cols-4 gap-6">

            {books.map((b) => (
              <div key={b.id} className="bg-white p-4 rounded-xl shadow">

                <img
                  src={`${import.meta.env.VITE_API_URL}/${b.cover}`}
                  className="w-full h-40 object-cover rounded mb-2"
                />

                <h3 className="font-bold text-sm">{b.title}</h3>

                <p className="text-xs mt-1">
                  Status:
                  <span className={`ml-1 ${
                    b.status === "approved"
                      ? "text-green-600"
                      : "text-yellow-500"
                  }`}>
                    {b.status}
                  </span>
                </p>

                {b.status !== "approved" && (
                  <button
                    onClick={() => approveBook(b.id)}
                    className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                )}

              </div>
            ))}

          </div>
        )}
      </div>

    </div>
  );
}