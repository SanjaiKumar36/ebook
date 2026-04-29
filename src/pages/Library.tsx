import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Library() {
  const [books, setBooks] = useState<any[]>([]);
  const [myBooks, setMyBooks] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await fetch("http://localhost:3000/api/books");
    const data = await res.json();
    setBooks(data);

    const purchased = data.filter((b: any) =>
      localStorage.getItem(`book_${b.id}_paid`)
    );

    setMyBooks(purchased);
  };

  return (
    <div className="min-h-screen pt-28 px-6 bg-gray-50">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">My Library 📚</h1>
        <p className="text-gray-500 mt-2">
          Your purchased books
        </p>
      </div>

      {/* EMPTY STATE */}
      {myBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <h2 className="text-2xl font-semibold mb-2">
            No books yet 📭
          </h2>
          <p className="text-gray-500 mb-6">
            Start exploring and purchase your first book
          </p>

          <button
            onClick={() => navigate("/browse")}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl"
          >
            Explore Books
          </button>
        </div>
      ) : (

        /* BOOK GRID */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {myBooks.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition group"
            >

              {/* COVER */}
              <div className="overflow-hidden rounded-t-2xl">
                <img
                  src={`http://localhost:3000/${b.cover}`}
                  className="w-full h-56 object-cover group-hover:scale-105 transition"
                />
              </div>

              {/* DETAILS */}
              <div className="p-4">

                <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                  {b.title}
                </h3>

                <button
                  onClick={() => navigate(`/reader/${b.id}`)}
                  className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm hover:bg-purple-700 transition"
                >
                  Read Now
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}