import React from "react";

export const Pagination = ({
  currentPage,
  totalPages,
  handleNextPage,
  handlePrevPage,
  handlePageChange,
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handleChange = (e) => {
    const selectedPage = parseInt(e.target.value);
    handlePageChange(selectedPage);
  };

  const formatPageNumber = (number) => {
    return number < 10 ? `Show 0${number}` : `Show ${number}`;
  };

  return (
    <div className="flex items-center justify-center mt-6 space-x-0">
      {/* Styled Dropdown for page selection */}
      <div className="relative inline-block">
        <select
          onChange={handleChange}
          value={currentPage}
          className="appearance-none bg-white border border-gray-300 rounded-md py-2 mr-2 pl-3 pr-10 text-gray-700 leading-tight focus:outline-none "
          style={{ minWidth: '10px' }} // Adjust width as needed
        >
          {pageNumbers.map((number) => (
            <option key={number} value={number}>
              {formatPageNumber(number)}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>

      {/* Previous Button */}
      <button
        onClick={() => handlePrevPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`ml-2 w-8 h-8 p-4 border rounded-l-md flex items-center justify-center ${
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
          className={`w-8 h-8 p-4 border flex items-center justify-center ${
            number === currentPage ? "bg-gray-200 text-gray-400" : "hover:bg-gray-100"
          }`}
        >
          {number}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => handleNextPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-8 h-8 p-4 border rounded-r-md flex items-center justify-center ${
          currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-black hover:bg-gray-200"
        }`}
      >
        &gt;
      </button>
    </div>
  );
};