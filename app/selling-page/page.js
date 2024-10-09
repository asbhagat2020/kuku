"use client"; 
import Header from '@/components/Header';
import { MainComponent } from '../../components/MainComponent';
import Footer from '@/components/Footer';

const Page = () => {
  return (
    <>
    <Header/>
    <div className="max-w-screen-xl mx-auto px-4 ">
      <p className="font-bold text-3xl font-luckiest">SEE WHAT'S SELLING</p>
      <MainComponent />
    </div>
    <Footer/>
    </>
  );
};

// Export as default
export default Page;
