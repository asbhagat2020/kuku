"use client";
import Header from "@/components/Header";
import { MainComponent } from "../../components/MainComponent";
import Footer from "@/components/Footer";
import MegaFilterComponent from "@/components/MegaFilterComponent";

const Page = () => {
  return (
    <>
      <Header />
      <div className="max-w-screen-xl mx-auto px-4 ">
        <p className=" inline-block mt-8 font-bold text-3xl font-luckiest ">
          SEE WHAT&#39;S SELLING
        </p>
        <MegaFilterComponent/>
      </div>
      <Footer />
    </>
  );
};

export default Page;
