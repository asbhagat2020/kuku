// "use client";
// import Header from "@/components/Header";
// import { MainComponent } from "../../components/MainComponent";
// import Footer from "@/components/Footer";

// const Page = () => {
//   return (
//     <>
//       <Header />
//       <div className="max-w-screen-xl mx-auto px-4 ">
//         <p className=" inline-block mt-8 font-bold text-3xl font-luckiest ">
//           SEE WHAT&#39;S SELLING
//         </p>
//         <MainComponent />
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Page;







"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Header from "@/components/Header";
import { MainComponent } from "../../components/MainComponent";
import Footer from "@/components/Footer";
import { useFilter } from "@/context/FilterContext";

const Page = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search');

  return (
    <>
      <Header />
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between mt-8">
          <p className="font-bold text-3xl font-luckiest">
            SEE WHAT&#39;S SELLING
          </p>
        </div>
        <MainComponent initialSearch={searchQuery} />
      </div>
      <Footer />
    </>
  );
};

export default Page;
