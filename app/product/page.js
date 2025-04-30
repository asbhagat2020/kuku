"use client";
import Header from "@/components/Header";
import ProductCard from "../../components/ProductCard";
import Recommendations from "../../components/Recommendations";
import Footer from "@/components/Footer";
import DownloadKuku from "@/components/home/DownloadKuku";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
  const [product, setProduct] = useState(null);
  const[products, setProducts] =useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams()
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

  useEffect(() => {
      if (id) {
        fetchProductDetails();
      }
    }, [id]);

  return (
    <div>
      <Header/>
      {product ? <ProductCard product={product} /> : null}
      <Recommendations product={products} />
      <DownloadKuku/>
      <Footer/>
    </div>
  );
};

export default Home;
