import { useState } from "react";

// ✅ ENV BASED API
const API_URL = import.meta.env.VITE_API_URL;

export default function UploadBook() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!title || !price || !file || !cover) {
      alert("Fill all fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("file", file);
      formData.append("cover", cover);

      const res = await fetch(`${API_URL}/api/upload-book`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Book uploaded 🚀");

        // ✅ reset form
        setTitle("");
        setPrice("");
        setFile(null);
        setCover(null);
      } else {
        alert(data.error || "Upload failed");
      }

    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
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
            value={title}
            className="w-full p-3 border rounded-xl"
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price ₹"
            value={price}
            className="w-full p-3 border rounded-xl"
            onChange={(e) => setPrice(e.target.value)}
          />

          <div>
            <p className="text-sm mb-1">Upload PDF</p>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          <div>
            <p className="text-sm mb-1">Upload Cover Image</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCover(e.target.files?.[0] || null)}
            />
          </div>

          <button
            onClick={handleUpload}
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white ${
              loading
                ? "bg-gray-400"
                : "bg-purple-600 hover:scale-105 transition"
            }`}
          >
            {loading ? "Uploading..." : "Upload 🚀"}
          </button>

        </div>

      </div>

    </div>
  );
}