import React from "react";

export const Pagination = ({
  currentPage,
  totalPages,
  handleNextPage,
  handlePrevPage,
  handlePageChange, // New prop for handling page change from the dropdown
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  // Function to handle dropdown change
  const handleChange = (e) => {
    const selectedPage = parseInt(e.target.value);
    handlePageChange(selectedPage); // Call the passed function to handle page change
  };

  const formatPageNumber = (number) => {
    return number < 10 ? `Show 0${number}` : `Show ${number}`;
  };

  return (
    <div className="flex items-center justify-center mt-6 space-x-0">
      {/* Dropdown for page selection */}
      <select
        onChange={handleChange}
        value={currentPage}
        className="p-2 border rounded-md text-gray-700 mr-2"
      >
        {pageNumbers.map((number) => (
          <option key={number} value={number}>
            {formatPageNumber(number)}
          </option>
        ))}
      </select>

      {/* Previous Button */}
      <button
        onClick={() => handlePrevPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-8 h-8 p-2 border rounded-l-md flex items-center justify-center ${
          currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-black hover:bg-gray-200"
        }`}
      >
        &lt;
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => handlePageChange(number)}
          className={`w-8 h-8 p-2 border flex items-center justify-center ${
            number === currentPage ? "bg-gray-200 text-black" : "hover:bg-gray-100"
          }`}
        >
          {number}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => handleNextPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-8 h-8 p-2 border rounded-r-md flex items-center justify-center ${
          currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-black hover:bg-gray-200"
        }`}
      >
        &gt;
      </button>
    </div>
  );
};
