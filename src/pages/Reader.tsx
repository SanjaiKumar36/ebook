import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Reader() {
  const { id } = useParams();
  const [book, setBook] = useState<any>(null);
const isPaid = localStorage.getItem(`book_${id}_paid`);

if (!isPaid) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Access Denied ❌
        </h1>
        <p className="text-gray-600">
          You need to purchase this book first
        </p>
      </div>
    </div>
  );
}
useEffect(() => {
  const disableRightClick = (e: any) => e.preventDefault();
  document.addEventListener("contextmenu", disableRightClick);

  return () => {
    document.removeEventListener("contextmenu", disableRightClick);
  };
}, []);

useEffect(() => {
  const disableCopy = (e: any) => {
    if (e.ctrlKey && (e.key === "c" || e.key === "u")) {
      e.preventDefault();
    }
  };

  document.addEventListener("keydown", disableCopy);

  return () => {
    document.removeEventListener("keydown", disableCopy);
  };
}, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/books")
      .then(res => res.json())
      .then(data => {
        const found = data.find((b: any) => b.id == id);
        setBook(found);
      });
  }, [id]);

  if (!book) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen pt-20 bg-black">

      {/* HEADER */}
      <div className="p-4 bg-gray-900 text-white">
        <h1>{book.title}</h1>
      </div>

      {/* PDF VIEW */}
      <iframe
        src={`http://localhost:3000/${book.file}`}
        className="w-full h-[90vh]"
      />

    </div>
  );
}