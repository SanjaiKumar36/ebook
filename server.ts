import express from "express";
import cors from "cors";
import fs from "fs";
import multer from "multer";
import path from "path";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ================= AUTO CREATE FILES =================
const ensureFile = (file: string) => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, "[]");
  }
};

ensureFile("authors.json");
ensureFile("books.json");
ensureFile("reviews.json");
ensureFile("sales.json");

// ================= UPLOAD FOLDER =================
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// ================= STATIC =================
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ================= MULTER =================
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, "uploads/"),
  filename: (_, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ================= HELPERS =================
const readJSON = (file: string) => {
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch {
    return [];
  }
};

const writeJSON = (file: string, data: any) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

// ================= AUTHOR APPLY =================
app.post("/api/author/apply", (req, res) => {
  try {
    const { name, bio, category, experience, uid } = req.body;

    if (!name || !bio || !category || !experience || !uid) {
      return res.status(400).json({ error: "Missing fields ❌" });
    }

    const authors = readJSON("authors.json");

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

    writeJSON("authors.json", authors);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error ❌" });
  }
});

// ================= GET AUTHORS =================
app.get("/api/authors", (req, res) => {
  res.json([]);
});

// ================= ADMIN APPROVE =================
app.post("/api/admin/approve-author/:id", (req, res) => {
  let authors = readJSON("authors.json");

  authors = authors.map((a: any) =>
    a.id == req.params.id ? { ...a, status: "approved" } : a
  );

  writeJSON("authors.json", authors);

  res.json({ success: true });
});

// ================= BOOK UPLOAD =================
app.post(
  "/api/upload-book",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  (req: any, res) => {
    try {
      const { title, price } = req.body;

      const pdf = req.files?.file?.[0];
      const cover = req.files?.cover?.[0];

      if (!title || !price || !pdf || !cover) {
        return res.status(400).json({ error: "Missing data" });
      }

      const books = readJSON("books.json");

      books.push({
        id: Date.now(),
        title,
        price,
        file: pdf.path,
        cover: cover.path,
        status: "pending",
      });

      writeJSON("books.json", books);

      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Upload failed" });
    }
  }
);

// ================= GET BOOKS =================
app.get("/api/books", (req, res) => {
  const books = readJSON("books.json");
  res.json(books.filter((b: any) => b.status === "approved"));
});

// ================= SALES =================
app.post("/api/sale", (req, res) => {
  const { bookId } = req.body;

  const sales = readJSON("sales.json");

  sales.push({
    id: Date.now(),
    bookId,
  });

  writeJSON("sales.json", sales);

  res.json({ success: true });
});

app.get("/api/sales", (req, res) => {
  res.json(readJSON("sales.json"));
});

// ================= TEST =================
app.get("/test", (req, res) => {
  res.send("WORKING 🔥");
});

// ================= START =================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:3000`);
});