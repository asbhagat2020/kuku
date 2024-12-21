"use client"

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import OrderDetails from '@/components/userProfile/OrderDetails';
import React from 'react';

const page = () => {
  return (
    <>
      <Header />
      <OrderDetails />
      <Footer />
    </>
  );
};

export default page;
