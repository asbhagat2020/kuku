"use client";
import Header from "@/components/Header";
import ProductCard from "../../components/ProductCard";
import Recommendations from "../../components/Recommendations";
import Footer from "@/components/Footer";
import DownloadKuku from "@/components/home/DownloadKuku";

const Home = () => {
  return (
    <div>
      <Header/>
      <ProductCard />
      <Recommendations />
      <DownloadKuku/>
      <Footer/>
    </div>
  );
};

export default Home;
