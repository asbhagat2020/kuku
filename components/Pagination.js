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

  return (
    <div className="flex items-center justify-center mt-6 space-x-2">
      {/* Dropdown for page selection */}
      <select
        onChange={handleChange}
        value={currentPage} // Set the current page as the value
        className="p-2 border rounded-md text-gray-700"
      >
        {pageNumbers.map((number) => (
          <option key={number} value={number}>
            Show {number}
          </option>
        ))}
      </select>

      {/* Previous Button */}
      <button
        onClick={() => handlePrevPage(currentPage - 1)} // Move to previous page
        disabled={currentPage === 1}
        className={`p-2 border rounded-md ${
          currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-black hover:bg-gray-200"
        }`}
      >
        &lt;
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => handlePageChange(number)} // Move to selected page
          className={`p-2 border rounded-md ${
            number === currentPage ? "bg-gray-200 text-black font-bold" : "hover:bg-gray-100"
          }`}
        >
          {number}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => handleNextPage(currentPage + 1)} // Move to next page
        disabled={currentPage === totalPages}
        className={`p-2 border rounded-md ${
          currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-black hover:bg-gray-200"
        }`}
      >
        &gt;
      </button>
    </div>
  );
};
