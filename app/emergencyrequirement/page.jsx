"use client";

import React from 'react';
import Header from '@/components/Header'; 
import Footer from '@/components/Footer';
import Emergency from '@/components/Emergency';



const Page = () => {
  return (
    <div className="min-h-screen m-0">
      <Header backgroundColor="#FFF" />
      <div 
        className="bg-cover bg-center min-h-[calc(100vh-100px)] flex flex-col justify-center items-center p-4 sm:p-8 overflow-auto"
        style={{ backgroundImage: "url('kukuit_bg.png')" }}
      >
        <Emergency />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
