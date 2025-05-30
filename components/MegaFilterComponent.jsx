import React from "react";
import { FilterProvider } from "../context/FilterContext";
import { FilterBySubcategory } from "./FilterBySubcategory";
import MegaSideBar from "./MegaSideBar";
import MegaActiveFilters from "./MegaActiveFilters";

export const MegaFilterComponent = () => {
  return (
    <FilterProvider>
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="h-auto lg:w-[1297px] flex flex-col lg:flex-row">
          <MegaSideBar/>
          <main className="flex-1 mt-4 lg:mt-0">
            <MegaActiveFilters/>
            <FilterBySubcategory />
          </main>
        </div>
      </div>
    </FilterProvider>
  );
};

export default MegaFilterComponent;