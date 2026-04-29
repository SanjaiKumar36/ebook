import { useState } from "react";

export default function BecomeAuthor() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [category, setCategory] = useState("Development");
  const [experience, setExperience] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!name || !bio || !experience) {
      alert("Fill all fields");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("bio", bio);
      formData.append("category", category);
      formData.append("experience", experience);

      if (photo) {
        formData.append("photo", photo);
      }

      const res = await fetch("https://ebook-fmjq.onrender.com/api/author/apply", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Application Submitted 🚀");

        // ✅ ONLY HERE
        localStorage.setItem("isAuthor", "true");

        setName("");
        setBio("");
        setExperience("");
        setPhoto(null);
      } else {
        alert(data.error || "Upload failed ❌");
      }

    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    }
  };

  return (
    <div className="min-h-screen pt-28 flex items-center justify-center bg-gradient-to-br from-purple-50 to-white px-4">
      
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-3xl p-10 border border-gray-100">

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          Become an Author ✍️
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Share your knowledge. Earn from your books.
        </p>

        {/* PHOTO */}
        <div className="flex flex-col items-center mb-6">
          <label className="cursor-pointer">

            <div className="w-28 h-28 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden border-4 border-purple-200">

              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm text-gray-500">Upload</span>
              )}

            </div>

            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files?.[0] || null)}
            />
          </label>

          <p className="text-xs text-gray-400 mt-2">
            Upload profile photo
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-4">

          <input
            type="text"
            placeholder="Author Name"
            value={name}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            placeholder="Author Bio"
            value={bio}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500"
            rows={4}
            onChange={(e) => setBio(e.target.value)}
          />

          <select
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Development</option>
            <option>Business</option>
            <option>Self Development</option>
            <option>Finance</option>
          </select>

          <input
            type="text"
            placeholder="Experience"
            value={experience}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setExperience(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-semibold hover:scale-105 transition"
          >
            Submit Application 🚀
          </button>

        </div>
      </div>
    </div>
  );
}