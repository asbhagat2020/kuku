// import React from "react";
// import { FilterProvider } from "../context/FilterContext";
// import { FilterBySubcategory } from "./FilterBySubcategory";
// import MegaSideBar from "./MegaSideBar";
// import MegaActiveFilters from "./MegaActiveFilters";

// export const MegaFilterComponent = () => {
//   return (
//     <FilterProvider>
//       <div className="max-w-screen mx-auto px-4">
//         <div className="h-auto flex flex-col lg:flex-row">
//           <MegaSideBar/>
//           <main className="flex-1 mt-4 lg:mt-0">
//             <MegaActiveFilters/>
//             <FilterBySubcategory />
//           </main>
//         </div>
//       </div>
//     </FilterProvider>
//   );
// };

// export default MegaFilterComponent;






import React from "react";
import { FilterProvider } from "../context/FilterContext";
import { FilterBySubcategory } from "./FilterBySubcategory";
import MegaSideBar from "./MegaSideBar";
import MegaActiveFilters from "./MegaActiveFilters";

export const MegaFilterComponent = () => {
  return (
    <FilterProvider>
      <div className="w-full mx-auto">
        <div className="h-auto flex flex-col lg:flex-row gap-4 lg:gap-6 xl:gap-8">
          <MegaSideBar/>
           <main className="flex-1 mt-4 sm:mt-6 lg:mt-0 px-6 sm-px-8">
            <MegaActiveFilters/>
            <FilterBySubcategory />
          </main>
        </div>
      </div>
    </FilterProvider>
  );
};

export default MegaFilterComponent;