"use client";

import React from 'react';
import ItemList from '@/components/ItemList';
import Header from '@/components/Header'; 
import Footer from '@/components/Footer';

const Page = () => {
  return (
    <div style={{ minHeight: '100vh', margin: 0 }}>
      <Header backgroundColor="#FFF" />
      <div 
        style={{ 
          backgroundImage: "url('kukuit_bg.png')", 
          minHeight: 'calc(100vh - 100px)', 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          flexDirection: 'column',
          overflow: 'auto',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <ItemList />
      </div>
      <Footer />
    </div>
  );
};

export default Page; 
