// "use client";
// import Header from "@/components/Header";
// import { MainComponent } from "../../components/MainComponent";
// import Footer from "@/components/Footer";
// import MegaFilterComponent from "@/components/MegaFilterComponent";

// const Page = () => {
//   return (
//     <>
//       <Header />
//       <div className="max-w-screen mx-auto px-4 ">
//         <p className=" inline-block mt-8 font-bold text-3xl font-luckiest ">
//           SEE WHAT&#39;S SELLING
//         </p>
//         <MegaFilterComponent/>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Page;

"use client";
import Header from "@/components/Header";
import { MainComponent } from "../../components/MainComponent";
import Footer from "@/components/Footer";
import MegaFilterComponent from "@/components/MegaFilterComponent";

const Page = () => {
  return (
    <>
      <Header />
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex items-center justify-between mt-4 sm:mt-6 lg:mt-8">
          <p className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-luckiest md:pl-6 lg:pl-8">
            SEE WHAT&#39;S SELLING
          </p>
        </div>
        <MegaFilterComponent />
      </div>
      <Footer />
    </>
  );
};

export default Page;
