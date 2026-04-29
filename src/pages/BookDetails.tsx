import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  const isPurchased =
    localStorage.getItem(`book_${id}_paid`) === "true";

  // 🔥 FETCH BOOK
  useEffect(() => {
    fetch("https://ebook-fmjq.onrender.com/api/books")
      .then(res => res.json())
      .then(data => {
        const found = data.find((b: any) => b.id == id);
        setBook(found);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // 🔥 FETCH REVIEWS
  const loadReviews = async () => {
    const res = await fetch("https://ebook-fmjq.onrender.com/api/reviews/" + id);
    const data = await res.json();
    setReviews(data);
  };

  useEffect(() => {
    loadReviews();
  }, [id]);

  // 🔥 SUBMIT REVIEW
  const submitReview = async () => {
    if (!comment.trim()) {
      alert("Write something");
      return;
    }

    await fetch("https://ebook-fmjq.onrender.com/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookId: id,
        user: "User",
        comment,
        rating,
      }),
    });

    setComment("");
    setRating(5);

    loadReviews(); // 🔥 no reload
  };

  // 🔥 PAYMENT
  const handleBuy = async () => {
    if (!book) return;

    const res = await fetch("https://ebook-fmjq.onrender.com/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: book.price }),
    });

    const order = await res.json();

    const options = {
      key: "rzp_test_SiWc6w5QCu6cpS",
      amount: order.amount,
      currency: "INR",
      name: "ZippyBooks",
      description: book.title,
      order_id: order.id,

      handler: function () {
        localStorage.setItem(`book_${book.id}_paid`, "true");
        alert("Payment Successful 🎉");

        // 🔥 update UI instantly
        window.location.reload();
      },

      theme: {
        color: "#7c3aed",
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  if (loading) return <div className="p-10">Loading...</div>;
  if (!book) return <div className="p-10">Book not found</div>;

  return (
    <div className="min-h-screen pt-28 px-6 bg-gray-50">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

        {/* COVER */}
        <div className="sticky top-32">
          <div className="bg-white p-6 rounded-2xl shadow">
            <img
              src={`https://ebook-fmjq.onrender.com/${book.cover}`}
              className="w-full h-[450px] object-cover rounded-xl"
            />
          </div>
        </div>

        {/* DETAILS */}
        <div>

          <h1 className="text-4xl font-bold mb-2">
            {book.title}
          </h1>

          <p className="text-gray-500 mb-4">
            by <span className="font-semibold">Zippy Author</span>
          </p>

          <div className="text-3xl font-bold text-purple-600 mb-6">
            ₹{book.price}
          </div>

          <div className="bg-white p-6 rounded-xl shadow mb-6">
            <h3 className="font-bold mb-2">About this book</h3>
            <p className="text-gray-600">
              {book.description || "No description available"}
            </p>
          </div>

          {/* BUY BOX */}
          <div className="bg-white p-6 rounded-xl shadow border">

            <p className="text-sm text-gray-500 mb-2">
              Instant Access • Secure Payment
            </p>

            <p className="text-xl font-bold mb-4">
              ₹{book.price}
            </p>

            {!isPurchased ? (
              <button
                onClick={handleBuy}
                className="w-full bg-yellow-400 text-black py-3 rounded-xl font-semibold"
              >
                Buy Now
              </button>
            ) : (
              <button
                onClick={() => navigate(`/reader/${book.id}`)}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold"
              >
                Read Now
              </button>
            )}

          </div>

        </div>
      </div>

      {/* ⭐ REVIEWS */}
      <div className="max-w-4xl mx-auto mt-16">

        <h2 className="text-2xl font-bold mb-6">
          Customer Reviews ⭐
        </h2>

        {/* WRITE REVIEW */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">

          <h3 className="font-semibold mb-3">Write a review</h3>

          <div className="flex gap-2 mb-4">
            {[1,2,3,4,5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={`cursor-pointer text-2xl ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border p-3 rounded-xl mb-4"
            placeholder="Write your review..."
          />

          <button
            onClick={submitReview}
            className="bg-purple-600 text-white px-6 py-2 rounded-xl"
          >
            Submit Review
          </button>

        </div>

        {/* REVIEW LIST */}
        <div className="space-y-4">

          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet</p>
          ) : (
            reviews.map((r) => (
              <div key={r.id} className="bg-white p-5 rounded-xl shadow">

                <div className="flex justify-between mb-2">
                  <p className="font-semibold">{r.user}</p>

                  <div className="text-yellow-400">
                    {"★".repeat(r.rating || 5)}
                  </div>
                </div>

                <p className="text-gray-600">{r.comment}</p>

              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}