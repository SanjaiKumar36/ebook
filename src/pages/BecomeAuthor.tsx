import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ================= AUTO CREATE FILE =================
const ensureFile = (file: string) => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, "[]");
  }
};

ensureFile("authors.json");

// ================= HELPERS =================
const readAuthors = () => {
  try {
    return JSON.parse(fs.readFileSync("authors.json", "utf-8"));
  } catch {
    return [];
  }
};

const writeAuthors = (data: any) => {
  fs.writeFileSync("authors.json", JSON.stringify(data, null, 2));
};

// ================= AUTHOR APPLY =================
app.post("/api/author/apply", (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { name, bio, category, experience, uid } = req.body;

    // 🔥 VALIDATION
    if (!name || !bio || !category || !experience || !uid) {
      return res.status(400).json({ error: "Missing fields ❌" });
    }

    const authors = readAuthors();

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

    writeAuthors(authors);

    res.json({ success: true });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ error: "Server error ❌" });
  }
});

// ================= GET AUTHORS =================
app.get("/api/authors", (req, res) => {
  const authors = readAuthors();
  res.json(authors);
});

// ================= TEST =================
app.get("/test", (req, res) => {
  res.send("WORKING 🔥");
});

// ================= START =================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});