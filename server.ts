import Razorpay from "razorpay";
import express from "express";
import cors from "cors";
import fs from "fs";
import multer from "multer";

const app = express();
const PORT = 3000;

// 🔥 RAZORPAY
const razorpay = new Razorpay({
  key_id: "rzp_test_SiWc6w5QCu6cpS",
  key_secret: "yKJefZk6QlPsRchT9l101hF3",
});

app.use(cors());
app.use(express.json());

// 🔥 SERVE FILES (VERY IMPORTANT)
app.use("/uploads", express.static("uploads", {
  setHeaders: (res) => {
    res.setHeader("Content-Disposition", "inline");
  },
}));

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
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf-8"));
};

const writeJSON = (file: string, data: any) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

// ================= ROUTER =================
const apiRouter = express.Router();

// ================= AUTHOR APPLY =================
apiRouter.post("/author/apply", upload.single("photo"), (req, res) => {
  try {
    console.log("🔥 AUTHOR APPLY HIT");

    const { name, bio, category, experience } = req.body;

    if (!name || !bio || !category || !experience) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const authors = readJSON("authors.json");

    authors.push({
      id: Date.now(),
      name,
      bio,
      category,
      experience,
      photo: req.file ? req.file.path : "no-image",
      status: "pending",
    });

    writeJSON("authors.json", authors);

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

// ================= ADMIN AUTHORS =================
apiRouter.get("/admin/authors", (_, res) => {
  const authors = readJSON("authors.json");
  res.json(authors);
});

// ================= APPROVE AUTHOR =================
apiRouter.post("/admin/approve-author/:id", (req, res) => {
  let authors = readJSON("authors.json");

  authors = authors.map((a: any) =>
    a.id == req.params.id ? { ...a, status: "approved" } : a
  );

  writeJSON("authors.json", authors);

  res.json({ success: true });
});

// ================= PUBLIC AUTHORS =================
apiRouter.get("/authors", (_, res) => {
  const authors = readJSON("authors.json");

  // 🔥 DEBUG LOG
  console.log("Authors:", authors);

  res.json(authors.filter((a: any) => a.status === "approved"));
});

// ================= BOOK UPLOAD =================
apiRouter.post(
  "/upload-book",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  (req: any, res) => {
    try {
      console.log("🔥 BOOK UPLOAD HIT");

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

// ================= ADMIN BOOKS =================
apiRouter.get("/admin/books", (_, res) => {
  const books = readJSON("books.json");
  res.json(books);
});

// ================= APPROVE BOOK =================
apiRouter.post("/admin/approve-book/:id", (req, res) => {
  let books = readJSON("books.json");

  books = books.map((b: any) =>
    b.id == req.params.id ? { ...b, status: "approved" } : b
  );

  writeJSON("books.json", books);

  res.json({ success: true });
});

// ================= PUBLIC BOOKS =================
apiRouter.get("/books", (_, res) => {
  const books = readJSON("books.json");
  res.json(books.filter((b: any) => b.status === "approved"));
});

// ================= RAZORPAY =================
apiRouter.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "order_" + Date.now(),
    });

    res.json(order);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Payment error" });
  }
});

// ================= REVIEWS =================
apiRouter.get("/reviews/:bookId", (req, res) => {
  const reviews = readJSON("reviews.json");
  res.json(reviews.filter((r: any) => r.bookId == req.params.bookId));
});

apiRouter.post("/reviews", (req, res) => {
  const { bookId, user, comment } = req.body;

  if (!bookId || !comment) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const reviews = readJSON("reviews.json");

 reviews.push({
  id: Date.now(),
  bookId,
  user,
  comment,
  rating, // 🔥 ADD THIS
});

  writeJSON("reviews.json", reviews);

  res.json({ success: true });
});

apiRouter.post("/sale", (req, res) => {
  const { bookId } = req.body;

  let sales = [];

  if (fs.existsSync("sales.json")) {
    sales = JSON.parse(fs.readFileSync("sales.json", "utf-8"));
  }

  sales.push({
    id: Date.now(),
    bookId,
  });

  fs.writeFileSync("sales.json", JSON.stringify(sales, null, 2));

  res.json({ success: true });
});

apiRouter.get("/sales", (req, res) => {
  const sales = fs.existsSync("sales.json")
    ? JSON.parse(fs.readFileSync("sales.json", "utf-8"))
    : [];

  res.json(sales);
});


// ================= CONNECT =================
app.use("/api", apiRouter);

// ================= START =================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});