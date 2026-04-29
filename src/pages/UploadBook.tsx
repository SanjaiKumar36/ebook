import { useState } from "react";

export default function UploadBook() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!title || !price || !file || !cover) {
      alert("Fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("file", file);
    formData.append("cover", cover);

    const res = await fetch("https://ebook-fmjq.onrender.com/api/upload-book", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      alert("Book uploaded 🚀");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen pt-28 px-6 bg-gray-50">

      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow">

        <h1 className="text-2xl font-bold mb-6">
          Upload Book 📚
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Book Title"
            className="w-full p-3 border rounded-xl"
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price ₹"
            className="w-full p-3 border rounded-xl"
            onChange={(e) => setPrice(e.target.value)}
          />

          <div>
            <p className="text-sm mb-1">Upload PDF</p>
            <input type="file" accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          <div>
            <p className="text-sm mb-1">Upload Cover Image</p>
            <input type="file" accept="image/*"
              onChange={(e) => setCover(e.target.files?.[0] || null)}
            />
          </div>

          <button
            onClick={handleUpload}
            className="w-full bg-purple-600 text-white py-3 rounded-xl"
          >
            Upload 🚀
          </button>

        </div>

      </div>

    </div>
  );
}