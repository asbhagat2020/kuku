import React from 'react';
import ItemList from '@/components/ItemList';

const Page = () => {
  const style = {
    backgroundColor: '#3AD385', // Updated background color
    minHeight: '100vh', // Changed from height to minHeight for better control
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px', // Added padding to prevent overflow
    flexDirection: 'column',
    overflow: 'auto', // Added overflow to handle large forms
  };

  return (
    <div style={style}>
      <ItemList />
    </div>
  );
};

export default Page;
