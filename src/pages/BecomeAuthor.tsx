import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 🔥 AUTO CREATE FILES
const ensureFile = (file: string) => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, "[]");
  }
};

ensureFile("authors.json");

// 🔥 AUTHOR APPLY (NO FILE UPLOAD)
app.post("/api/author/apply", (req, res) => {
  try {
    console.log("BODY:", req.body);

    const name = req.body.name;
    const bio = req.body.bio;
    const category = req.body.category;
    const experience = req.body.experience;
    const uid = req.body.uid;

    // 🔥 VALIDATION
    if (!name || !bio || !category || !experience || !uid) {
      return res.status(400).json({ error: "Missing fields ❌" });
    }

    let authors = [];

    if (fs.existsSync("authors.json")) {
      authors = JSON.parse(fs.readFileSync("authors.json", "utf-8"));
    }

    authors.push({
      id: Date.now(),
      uid,
      name,
      bio,
      category,
      experience,
      photo: "no-image",
      status: "pending",
    });

    fs.writeFileSync("authors.json", JSON.stringify(authors, null, 2));

    res.json({ success: true });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ error: "Server error ❌" });
  }
});

// 🔥 TEST ROUTE
app.get("/api/authors", (req, res) => {
  const data = fs.existsSync("authors.json")
    ? JSON.parse(fs.readFileSync("authors.json", "utf-8"))
    : [];

  res.json(data);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});