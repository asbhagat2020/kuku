"use client";
import { useState } from "react";

// const cardData = [
//   {
//     id: 1,
//     user: "Kuku1222",
//     img: "/kuki_img.png",
//     productImg: "bg-custom-image1",
//     heard_img: "/heard_img.png",
//     title: "Dress",
//     price: "AED 120.00",
//   },
//   {
//     id: 2,
//     user: "Kuku1222",
//     img: "/kuki_img.png",
//     productImg: "bg-custom-image2",
//     heard_img: "/heard_img.png",
//     title: "Dress",
//     price: "AED 120.00",
//   },
//   {
//     id: 3,
//     user: "Kuku1222",
//     img: "/kuki_img.png",
//     productImg: "bg-custom-image3",
//     heard_img: "/heard_img.png",
//     title: "Dress",
//     price: "AED 120.00",
//   },
//   {
//     id: 4,
//     user: "Kuku1222",
//     img: "/kuki_img.png",
//     productImg: "bg-custom-image4",
//     heard_img: "/heard_img.png",
//     title: "Dress",
//     price: "AED 120.00",
//   },
//   {
//     id: 5,
//     user: "Kuku1222",
//     img: "/kuki_img.png",
//     productImg: "bg-custom-image5",
//     heard_img: "/heard_img.png",
//     title: "Dress",
//     price: "AED 120.00",
//   },
//   {
//     id: 6,
//     user: "Kuku1222",
//     img: "/kuki_img.png",
//     productImg: "bg-custom-image6",
//     heard_img: "/heard_img.png",
//     title: "Dress",
//     price: "AED 120.00",
//   },
//   {
//     id: 7,
//     user: "Kuku1222",
//     img: "/kuki_img.png",
//     productImg: "bg-custom-image2",
//     heard_img: "/heard_img.png",
//     title: "Dress",
//     price: "AED 120.00",
//   },
//   {
//     id: 8,
//     user: "Kuku1222",
//     img: "/kuki_img.png",
//     productImg: "bg-custom-image1",
//     heard_img: "/heard_img.png",
//     title: "Dress",
//     price: "AED 120.00",
//   },
//   {
//     id: 9,
//     user: "Kuku1222",
//     img: "/kuki_img.png",
//     productImg: "bg-custom-image3",
//     heard_img: "/heard_img.png",
//     title: "Dress",
//     price: "AED 120.00",
//   },
//   {
//     id: 10,
//     user: "Kuku1222",
//     img: "/kuki_img.png",
//     productImg: "bg-custom-image1",
//     heard_img: "/heard_img.png",
//     title: "Dress",
//     price: "AED 120.00",
//   },
//   {
//     id: 11,
//     user: "Kuku1222",
//     img: "/kuki_img.png",
//     productImg: "bg-custom-image2",
//     heard_img: "/heard_img.png",
//     title: "Dress",
//     price: "AED 120.00",

//   },
//   {
//     id: 12,
//     user: "Kuku1222",
//     img: "/kuki_img.png",
//     productImg: "bg-custom-image3",
//     heard_img: "/heard_img.png",
//     title: "Dress",
//     price: "AED 120.00",
//   },
//   {
//     id: 13,
//     user: "Kuku1222",
//     img: "/kuki_img.png",
//     productImg: "bg-custom-image4",
//     heard_img: "/heard_img.png",
//     title: "Dress",
//     price: "AED 120.00",
//   },
//   {
//     id: 14,
//     user: "Kuku1222",
//     img: "/kuki_img.png",
//     productImg: "bg-custom-image5",
//     heard_img: "/heard_img.png",
//     title: "Dress",
//     price: "AED 120.00",
//   },
//   {
//     id: 15,
//     user: "Kuku1222",
//     img: "/kuki_img.png",
//     productImg: "bg-custom-image6",
//     heard_img: "/heard_img.png",
//     title: "Dress",
//     price: "AED 120.00",
//   },
//   {
//     id: 16,
//     user: "Kuku1222",
//     img: "/kuki_img.png",
//     productImg: "bg-custom-image2",
//     heard_img: "/heard_img.png",
//     title: "Dress",
//     price: "AED 120.00",
//   },
//   {
//     id: 17,
//     user: "Kuku1222",
//     img: "/kuki_img.png",
//     productImg: "bg-custom-image1",
//     heard_img: "/heard_img.png",
//     title: "Dress",
//     price: "AED 120.00",
//   },
//   {
//     id: 18,
//     user: "Kuku1222",
//     img: "/kuki_img.png",
//     productImg: "bg-custom-image3",
//     heard_img: "/heard_img.png",
//     title: "Dress",
//     price: "AED 120.00",
//   },
// ];

export const SellingCards = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const cardsPerPage = 9;

//   // Calculate indices for pagination
//   const indexOfLastCard = currentPage * cardsPerPage;
//   const indexOfFirstCard = indexOfLastCard - cardsPerPage;
//   const currentCards = cardData.slice(indexOfFirstCard, indexOfLastCard);

//   // Calculate total pages
//   const totalPages = Math.ceil(cardData.length / cardsPerPage);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handlePageChange = (selectedPage) => {
//     setCurrentPage(selectedPage);
//   };

  return (
    <div className="p-6   font-karla">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardData.map((card) => (
          <div key={card.id} className="flex flex-col">
            <div
              className={`h-80 w-full sm:h-96 flex ${card.productImg} bg-cover bg-center bg-white rounded-2xl shadow-md p-6 mt-4 relative`}
            >
              <div className="absolute top-4 right-4 w-14 h-14 flex items-center justify-center rounded-full bg-custom-gray">
                <img
                  src={card.heard_img}
                  alt="heard avatar"
                  className="w-5 h-4"
                />
              </div>
              <div className="flex items-end w-full">
                <div className="flex w-full">
                  <button className="w-full px-4 sm:px-10 bg-custom-yellow text-black rounded-2xl">
                    Buy Now
                  </button>
                  <div className="h-10 w-16 flex items-center justify-center bg-white rounded-full text-center ml-4">
                    <img src="handsake_img.jpg" alt="handshake avtar"/>
                  </div>
                </div>
              </div>
            </div>
            <h5 className="text-sm font-medium text-gray-700 mt-4">
              {card.title}
            </h5>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
              {card.price}
            </h2>
          </div>
        ))}
      </div>
      {/* Use the Pagination component with dynamic page change */}
      {/* <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        handlePageChange={handlePageChange} // Pass the handlePageChange function
      /> */}
    </div>
  );
};
