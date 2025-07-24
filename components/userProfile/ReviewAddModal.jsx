
// "use client";
// import { useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";

// const ReviewAddModal = ({ isOpen, onClose, title, productId, orderId, onReviewAdded }) => {
//   const [rating, setRating] = useState(0);
//   const [description, setDescription] = useState("");
//   const [error, setError] = useState("");

//   if (!isOpen) return null;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!orderId) {
//       setError("No valid order found for this product.");
//       return;
//     }
//     try {
//       const token = JSON.parse(Cookies.get("auth"));
//       await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/submit-review`,
//         {
//           orderId,
//           productId,
//           productRating: Number(rating),
//           productDescription: description,
//           sellerRating: 0,
//           sellerReview: "",
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       onReviewAdded();
//       onClose();
//     } catch (err) {
//       setError("Failed to submit review. Try again.");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg w-[400px]">
//         <h2 className="text-xl font-bold mb-4">{title}</h2>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block mb-2">Rating (1-5)</label>
//             <input
//               type="number"
//               min="1"
//               max="5"
//               value={rating}
//               onChange={(e) => setRating(e.target.value)}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2">Description</label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <div className="flex justify-end gap-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-300 rounded"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded"
//               disabled={!orderId || !rating || !description}
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ReviewAddModal;









"use client";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const ReviewAddModal = ({ isOpen, onClose, title, productId, orderId, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [sellerRating, setSellerRating] = useState(0);
  const [sellerReview, setSellerReview] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orderId) {
      setError("No valid order found for this product.");
      return;
    }
    try {
      const token = JSON.parse(Cookies.get("auth"));
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/submit-review`,
        {
          orderId,
          productId,
          productRating: Number(rating),
          productDescription: description,
          sellerRating: Number(sellerRating),
          sellerReview: sellerReview,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onReviewAdded();
      onClose();
    } catch (err) {
      setError("Failed to submit review. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Product Rating (1-5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Product Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Seller Rating (1-5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={sellerRating}
              onChange={(e) => setSellerRating(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Seller Review</label>
            <textarea
              value={sellerReview}
              onChange={(e) => setSellerReview(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
              disabled={!orderId || !rating || !description || !sellerRating || !sellerReview}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewAddModal;