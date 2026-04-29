import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ===== FILE CREATE =====
if (!fs.existsSync("authors.json")) {
  fs.writeFileSync("authors.json", "[]");
}

// ===== APPLY AUTHOR =====
app.post("/api/author/apply", (req, res) => {
  const { name, bio, category, experience, uid } = req.body;

  if (!name || !bio || !category || !experience || !uid) {
    return res.status(400).json({ error: "Missing fields ❌" });
  }

  const authors = JSON.parse(fs.readFileSync("authors.json", "utf-8"));

  authors.push({
    id: Date.now(),
    name,
    bio,
    category,
    experience,
    uid,
    status: "pending",
  });

  fs.writeFileSync("authors.json", JSON.stringify(authors, null, 2));

  res.json({ success: true });
});

// ===== GET AUTHORS =====
app.get("/api/authors", (req, res) => {
  const data = JSON.parse(fs.readFileSync("authors.json", "utf-8"));
  res.json(data);
});

// ===== ROOT TEST =====
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// ===== START =====
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});