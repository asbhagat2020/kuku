"use client";

import Cookies from "js-cookie";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import DownloadKuku from "@/components/home/DownloadKuku";
import ProductCard from "@/components/ProductCard";
import Recommendations from "@/components/Recommendations";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [recommendedProducts, setRecomendation] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const details = useSelector((state) => state.auth.user);
  const ids = details?._id;



  const fetchProductDetails = async (id) => {
    try {
      const token = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null;
      // console.log(token, "yyyyyyy")
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${id}`;

      const response = await axios.get(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}, // Only add headers if token exists
      });
      // console.log('fff...........', response.data)
      setProduct(response.data.product);
      // console.log("response.data.recommendedProducts.............", response.data.recommendedProducts)
      setRecomendation(response.data.recommendedProducts);
    } catch (err) {
      setError("Failed to fetch product details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, [id]);

  // console.log("productproductproduct", product);

  return (
    <div>
      <Header />
      {product ? <ProductCard product={product} /> : null}
      <Recommendations product={recommendedProducts} />
      <DownloadKuku />
      <Footer />
    </div>
  );
};

export default ProductDetail;
