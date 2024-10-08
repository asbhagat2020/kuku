"use client"; // Ensure this is at the top if you're using a client component

import { useState } from 'react'; // Import useState from React
import { FiMenu, FiChevronUp, FiChevronDown } from 'react-icons/fi';

export const SideBar = () => {
  const [isCategoryCollapsed, setIsCategoryCollapsed] = useState(true);
  const [isPriceCollapsed, setIsPriceCollapsed] = useState(true);
  const [isSizeCollapsed, setIsSizeCollapsed] = useState(true);
  const [isConditionCollapsed, setIsConditionCollapsed] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleCategoryCollapse = () => setIsCategoryCollapsed(!isCategoryCollapsed);
  const togglePriceCollapse = () => setIsPriceCollapsed(!isPriceCollapsed);
  const toggleSizeCollapse = () => setIsSizeCollapsed(!isSizeCollapsed);
  const toggleConditionCollapse = () => setIsConditionCollapsed(!isConditionCollapsed);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      {/* Hamburger Icon for Mobile */}
      <div className="lg:hidden p-4">
        <button
          onClick={toggleSidebar}
          className="text-custom-pink text-3xl focus:outline-none"
        >
          <FiMenu />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-40 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform lg:relative lg:translate-x-0 lg:w-80 lg:mt-10 lg:ml-2`}
      >
        <div className="p-4 lg:p-0">
          <h1 className="text-2xl text-custom-pink font-bold">Filter By</h1>

          <div className="mt-4 filter-section flex flex-col space-y-4">
            {/* Category Filter */}
            <div className="filter-section flex flex-col">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={toggleCategoryCollapse}
                aria-expanded={!isCategoryCollapsed}
                aria-controls="category-options"
              >
                <label className="font-semibold mb-2">Category</label>
                <span className="text-gray-500">
                  {isCategoryCollapsed ? <FiChevronDown /> : <FiChevronUp />}
                </span>
              </div>
              {!isCategoryCollapsed && (
                <div id="category-options" className="flex flex-col space-y-1 mt-2 ml-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="electronics"
                      name="category"
                      value="electronics"
                      className="mr-2"
                    />
                    <label htmlFor="electronics">Electronics</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="clothing"
                      name="category"
                      value="clothing"
                      className="mr-2"
                    />
                    <label htmlFor="clothing">Clothing</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="books"
                      name="category"
                      value="books"
                      className="mr-2"
                    />
                    <label htmlFor="books">Books</label>
                  </div>
                </div>
              )}
            </div>

            <hr />

            {/* Price Filter */}
            <div className="filter-section flex flex-col">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={togglePriceCollapse}
                aria-expanded={!isPriceCollapsed}
                aria-controls="price-options"
              >
                <label className="font-semibold mb-2">Price</label>
                <span className="text-gray-500">
                  {isPriceCollapsed ? <FiChevronDown /> : <FiChevronUp />}
                </span>
              </div>
              {!isPriceCollapsed && (
                <div id="price-options" className="flex flex-col space-y-1 mt-2 ml-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="low"
                      name="price"
                      value="low"
                      className="mr-2"
                    />
                    <label htmlFor="low">Low</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="medium"
                      name="price"
                      value="medium"
                      className="mr-2"
                    />
                    <label htmlFor="medium">Medium</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="high"
                      name="price"
                      value="high"
                      className="mr-2"
                    />
                    <label htmlFor="high">High</label>
                  </div>
                </div>
              )}
            </div>

            <hr />

            {/* Size Filter */}
            <div className="filter-section flex flex-col">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={toggleSizeCollapse}
                aria-expanded={!isSizeCollapsed}
                aria-controls="size-options"
              >
                <label className="font-semibold mb-2">Size</label>
                <span className="text-gray-500">
                  {isSizeCollapsed ? <FiChevronDown /> : <FiChevronUp />}
                </span>
              </div>
              {!isSizeCollapsed && (
                <div id="size-options" className="flex flex-col space-y-1 mt-2 ml-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="small"
                      name="size"
                      value="small"
                      className="mr-2"
                    />
                    <label htmlFor="small">Small</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="medium-size"
                      name="size"
                      value="medium"
                      className="mr-2"
                    />
                    <label htmlFor="medium-size">Medium</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="large"
                      name="size"
                      value="large"
                      className="mr-2"
                    />
                    <label htmlFor="large">Large</label>
                  </div>
                </div>
              )}
            </div>

            <hr />

            {/* Condition Filter */}
            <div className="filter-section flex flex-col">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={toggleConditionCollapse}
                aria-expanded={!isConditionCollapsed}
                aria-controls="condition-options"
              >
                <label className="font-semibold mb-2">Condition</label>
                <span className="text-gray-500">
                  {isConditionCollapsed ? <FiChevronDown /> : <FiChevronUp />}
                </span>
              </div>
              {!isConditionCollapsed && (
                <div id="condition-options" className="flex flex-col space-y-1 mt-2 ml-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="never-used"
                      name="condition"
                      value="never-used"
                      className="mr-2"
                    />
                    <label htmlFor="never-used">Never Used</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="used-once"
                      name="condition"
                      value="used-once"
                      className="mr-2"
                    />
                    <label htmlFor="used-once">Used Once</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rarely-used"
                      name="condition"
                      value="rarely-used"
                      className="mr-2"
                    />
                    <label htmlFor="rarely-used">Rarely Used</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="medium-used"
                      name="condition"
                      value="medium-used"
                      className="mr-2"
                    />
                    <label htmlFor="medium-used">Medium Used</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="well-used"
                      name="condition"
                      value="well-used"
                      className="mr-2"
                    />
                    <label htmlFor="well-used">Well Used</label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
