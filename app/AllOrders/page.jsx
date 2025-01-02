"use client"

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import OrdersPage from '@/components/userProfile/OrdersPage';

import React from 'react';

const page = () => {
  return (
    <>
      <Header />
      <OrdersPage />
      <Footer />
    </>
  );
};

export default page;
