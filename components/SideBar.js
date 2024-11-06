"use client"; // Ensure this is at the top if you're using a client component

import { useState, useEffect, useRef } from "react";
import { FiMenu, FiChevronUp, FiChevronDown } from "react-icons/fi";

export const SideBar = () => {
  const [openDropdown, setOpenDropdown] = useState(null); // Track the open dropdown
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null); // Reference to the sidebar

  // Toggles the sidebar when the hamburger menu is clicked
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); // Toggle the sidebar state
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    // Add event listener to detect clicks outside
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  // Handles dropdown toggling
  const handleDropdownToggle = (dropdown) => {
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown)); // Toggle dropdown state
  };

  return (
    <>
      {/* Hamburger Icon for Mobile - Sticky */}
      <div className="lg:hidden sticky top-0 left-0 z-0 ">
        <button
          onClick={toggleSidebar}
          className="text-custom-pink text-3xl focus:outline-none"
        >
          <FiMenu />
        </button>
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef} // Attach the ref to the sidebar
        className={`fixed lg:sticky top-20 left-0 h-auto lg:h-[calc(100vh-210px)] w-64 pl-0 pr-4 pt-4 pb-4 z-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:translate-x-0 lg:w-80 lg:mt-10 lg:ml-2 lg:block overflow-y-auto`}
      >
        <div className="p-4 lg:p-4 shadow-md bg-white">
          <h1 className="text-2xl text-custom-pink font-bold">Filter by</h1>

          <div className="mt-4 filter-section flex flex-col space-y-4">
            {/* Category Filter */}
            <div className="filter-section flex flex-col">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => handleDropdownToggle("category")}
                aria-expanded={openDropdown === "category"}
                aria-controls="category-options"
              >
                <label className="font-semibold mb-2">Category</label>
                <div className="h-auto w-auto p-2 bg-gray-200 rounded-full">
                  <span className="text-gray-500">
                    {openDropdown === "category" ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </span>
                </div>
              </div>
              {openDropdown === "category" && (
                <div
                  id="category-options"
                  className="flex flex-col space-y-1 mt-2 ml-3"
                >
                  {["Men", "Women", "Kids"].map((category) => (
                    <div className="flex items-center" key={category}>
                      <input
                        type="checkbox"
                        id={category}
                        name="category"
                        value={category}
                        className="hidden"
                      />
                      <label
                        htmlFor={category}
                        className="flex items-center cursor-pointer"
                      >
                        <span className="custom-checkbox" />
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <hr />

            {/* Price Filter */}
            <div className="filter-section flex flex-col">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => handleDropdownToggle("price")}
                aria-expanded={openDropdown === "price"}
                aria-controls="price-options"
              >
                <label className="font-semibold mb-2">Price</label>
                <div className="h-auto w-auto p-2 bg-gray-200 rounded-full">
                  <span className="text-gray-500">
                    {openDropdown === "price" ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </span>
                </div>
              </div>
              {openDropdown === "price" && (
                <div
                  id="price-options"
                  className="flex flex-col space-y-1 mt-2 ml-3"
                >
                  {["low", "medium", "high"].map((price) => (
                    <div className="flex items-center" key={price}>
                      <input
                        type="checkbox"
                        id={`price-${price}`}
                        name="price"
                        value={price}
                        className="hidden"
                      />
                      <label
                        htmlFor={`price-${price}`}
                        className="flex items-center cursor-pointer"
                      >
                        <span className="custom-checkbox" />
                        {price.charAt(0).toUpperCase() + price.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <hr />

            {/* Size Filter */}
            <div className="filter-section flex flex-col">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => handleDropdownToggle("size")}
                aria-expanded={openDropdown === "size"}
                aria-controls="size-options"
              >
                <label className="font-semibold mb-2">Size</label>
                <div className="h-auto w-auto p-2 bg-gray-200 rounded-full">
                  <span className="text-gray-500">
                    {openDropdown === "size" ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </span>
                </div>
              </div>
              {openDropdown === "size" && (
                <div
                  id="size-options"
                  className="flex flex-col space-y-1 mt-2 ml-3"
                >
                  {["small", "medium", "large"].map((size) => (
                    <div className="flex items-center" key={size}>
                      <input
                        type="checkbox"
                        id={`size-${size}`}
                        name="size"
                        value={size}
                        className="hidden"
                      />
                      <label
                        htmlFor={`size-${size}`}
                        className="flex items-center cursor-pointer"
                      >
                        <span className="custom-checkbox" />
                        {size.charAt(0).toUpperCase() + size.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <hr />

            {/* Condition Filter */}
            <div className="filter-section flex flex-col">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => handleDropdownToggle("condition")}
                aria-expanded={openDropdown === "condition"}
                aria-controls="condition-options"
              >
                <label className="font-semibold mb-2">Condition</label>
                <div className="h-auto w-auto p-2 bg-gray-200 rounded-full">
                  <span className="text-gray-500">
                    {openDropdown === "condition" ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </span>
                </div>
              </div>
              {openDropdown === "condition" && (
                <div
                  id="condition-options"
                  className="flex flex-col space-y-1 mt-2 ml-3"
                >
                  {[
                    "Brand New",
                    "Like New",
                    "Gently Used",
                    "Moderately Used",
                    "Well Worn",
                  ].map((condition) => (
                    <div className="flex items-center" key={condition}>
                      <input
                        type="checkbox"
                        id={`condition-${condition}`}
                        name="condition"
                        value={condition}
                        className="hidden"
                      />
                      <label
                        htmlFor={`condition-${condition}`}
                        className="flex items-center cursor-pointer"
                      >
                        <span className="custom-checkbox" />
                        {condition
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (char) => char.toUpperCase())}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-checkbox {
          display: inline-block;
          width: 20px;
          height: 20px;
          background-color: white;
          border: 2px solid #555;
          border-radius: 4px;
          position: relative;
          margin-right: 8px;
        }

        input[type="checkbox"]:checked + label .custom-checkbox {
          background-color: #e4086f;
          border-color: #e4086f;
        }

        .custom-checkbox::after {
          content: "";
          position: absolute;
          top: 3px;
          left: 7px;
          width: 5px;
          height: 10px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
          opacity: 0;
        }

        input[type="checkbox"]:checked + label .custom-checkbox::after {
          opacity: 1;
        }
      `}</style>
    </>
  );
};

export default SideBar;
