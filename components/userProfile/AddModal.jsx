import React, { useState, useEffect } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import axios from "axios";
import Cookies from 'js-cookie';

const AddModal = ({ isOpen, onClose, title }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [comments, setComments] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchProducts = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`;
      const response = await axios.get(url);
      setProducts(response?.data);
    } catch (err) {
      setError("Failed to fetch product details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (!isOpen) return null;

  const handleRating = (value, isHalf) => {
    if (isHalf) {
      setRating(value - 0.5);
    } else {
      if (Math.ceil(rating) === value) {
        setRating(value - 0.5);
      } else {
        setRating(value);
      }
    }
  };

  const handleMouseMove = (e, value) => {
    const star = e.currentTarget;
    const rect = star.getBoundingClientRect();
    const isHalf = e.clientX - rect.left < rect.width / 2;
    setHoverRating(isHalf ? value - 0.5 : value);
  };

  const renderStar = (index) => {
    const activeRating = hoverRating || rating;

    if (activeRating >= index) {
      return <FaStar className="text-yellow-500 w-8 h-8" />;
    } else if (activeRating >= index - 0.5) {
      return <FaStarHalfAlt className="text-yellow-500 w-8 h-8" />;
    } else {
      return <FaRegStar className="text-gray-300 w-8 h-8" />;
    }
  };
  const uploadImage = async (imageFile) => {
    if (!imageFile || imageFile.length === 0) {
      throw new Error("No files provided for upload");
    }
  
    console.log(imageFile, "Image Files");
  
    const imageData = new FormData();
    
    // Populate FormData
    for (let i = 0; i < imageFile.length; i++) {
      imageData.append("files", imageFile[i]);
    }
    imageData.append("folder", "avatar");
  
    // Debug FormData contents
    console.log("FormData contents:");
    for (let pair of imageData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
  
    try {
      const token = JSON.parse(Cookies.get("auth"));
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/multiple`,
        imageData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      return response.data.fileUrls;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      // Upload images if provided
      let imageUrl = null;
      console.log(productImages, "Product Images");
      
      if (productImages && productImages.length > 0) {
        imageUrl = await uploadImage(productImages); // Ensure this function returns the URLs properly
      }
  
    
      const data = {
        productId:selectedProduct,
        rating:rating,
        description:comments,
        images:imageUrl
      }
     
  const token = JSON.parse(Cookies.get("auth"));
      // API endpoint
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/review/add`;
  
      // POST request to the server
      await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
         
        },
      });
  
      // On successful submission
      onClose();
      setSelectedProduct("");
      setComments("");
      setRating(0);

    } catch (err) {
      console.error("Error submitting review:", err);
      setError("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full mx-4 sm:mx-0 mt-8 sm:mt-20">
        <h2 className="text-2xl font-semibold mb-6 text-center">{title}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="productName">
              Product Name
            </label>
            <select
              id="productName"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="comments">
              Comments
            </label>
            <textarea
              id="comments"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter comments"
              rows="4"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="productImages">
              Product Images
            </label>
            <input
              id="productImages"
              type="file"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              accept="image/*"
              multiple
              onChange={(e) => setProductImages(Array.from(e.target.files))}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Rating</label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <div
                  key={value}
                  className="cursor-pointer relative"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const isHalf = e.clientX - rect.left < rect.width / 2;
                    handleRating(value, isHalf);
                  }}
                  onMouseMove={(e) => handleMouseMove(e, value)}
                  onMouseEnter={() => setHoverRating(value)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  {renderStar(value)}
                  <div className="absolute inset-0 flex">
                    <div className="w-1/2 h-full" />
                    <div className="w-1/2 h-full" />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-500 mt-1">Selected Rating: {rating.toFixed(1)}</p>
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
