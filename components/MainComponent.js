
// import React from "react";
// import { SideBar } from "./SideBar";
// import { ImagesComponent } from "./ImagesComponent";
// import { ActiveFilters } from "./ActiveFilters";
// import { FilterProvider } from "../context/FilterContext";

// export const MainComponent = () => {
//   return (
//     <FilterProvider>
//       <div className="max-w-screen-xl mx-auto px-4">
//         <div className="h-auto lg:w-[1297px] flex flex-col lg:flex-row">
//           <SideBar />
//           <main className="flex-1 mt-4 lg:mt-0">
//             <ActiveFilters />
//             <ImagesComponent />
//           </main>
//         </div>
//       </div>
//     </FilterProvider>
//   );
// };

// export default MainComponent;










"use client";
import React from "react";
import { SideBar } from "./SideBar";
import { ImagesComponent } from "./ImagesComponent";
import { ActiveFilters } from "./ActiveFilters";
import { FilterProvider } from "../context/FilterContext";

export const MainComponent = ({ initialSearch }) => {
  return (
    <FilterProvider initialSearch={initialSearch}>
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="h-auto lg:w-[1297px] flex flex-col lg:flex-row">
          <SideBar />
          <main className="flex-1 mt-4 lg:mt-0">
            <ActiveFilters />
            <ImagesComponent />
          </main>
        </div>
      </div>
    </FilterProvider>
  );
};
