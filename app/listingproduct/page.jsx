"use client";

import React from 'react';
import ItemList from '@/components/ItemList';
import Header from '@/components/Header'; 
import Footer from '@/components/Footer';

const Page = () => {
  const style = {
    backgroundColor: '#3AD385',
    minHeight: '100vh',
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    flexDirection: 'column',
    overflow: 'auto',
  };

  return (
    <div style={{ backgroundColor: '#3AD385', minHeight: '100vh', margin: 0 }}>
      <Header backgroundColor="#FFF" /> 
      <div style={style}>
        <ItemList />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
