
"use client";

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ReturnOrderPage from '@/components/ReturnOrderPage';
import React from 'react';

export default function ReturnOrder() {
  return (
    <>
      <Header />
      <ReturnOrderPage /> {/* searchParams prop ki zarurat nahi */}
      <Footer />
    </>
  );
}