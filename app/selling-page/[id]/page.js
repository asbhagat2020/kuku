"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import DownloadKuku from "@/components/home/DownloadKuku";
import ProductCard from "@/components/ProductCard";
import Recommendations from "@/components/Recommendations";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const fetchProductDetails = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${id}`;
      
      const response = await axios.get(url);
      setProduct(response.data.product);
    
    } catch (err) {
      setError("Failed to fetch product details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  return (
    <div>
      <Header />
      {product ? <ProductCard product={product} /> : null}
      <Recommendations product={product}/>
      <DownloadKuku />
      <Footer />
    </div>
  );
};

export default ProductDetail;
