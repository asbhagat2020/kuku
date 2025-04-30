"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import DownloadKuku from "@/components/home/DownloadKuku";
import { ReviewOffer } from "@/components/ReviewOffer";

export default function Renting() {
  return (
    <>
      <Header />
      <ReviewOffer/>
      <DownloadKuku />
      <Footer />
    </>
  );
}

