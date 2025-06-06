"use client";

import { useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { OfferPopup } from "./OfferPopup";
import { FcLike } from "react-icons/fc";
import { GoHeart } from "react-icons/go";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useFilter } from "../context/FilterContext";

export const FilterBySubcategory = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null;
  const [currentPage, setCurrentPage] = useState(1);
  const [isOfferPopupOpen, setIsOfferPopupOpen] = useState(false);
  const [offerSubmitted, setOfferSubmitted] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState([]);
  const [selectedSellerId, setSelectedSellerId] = useState([]);

  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const cardsPerPage = 9;

  // Access the filter context
  const filterContext = useFilter();

  // Get context values with error handling
  const contextFilteredProducts = filterContext?.filteredProducts || [];
  const apiFilteredProducts = filterContext?.apiFilteredProducts || [];
  const apiLoading = filterContext?.apiLoading || false;
  const apiError = filterContext?.apiError || null;
  const fetchProductsWithFilters = filterContext?.fetchProductsWithFilters;
  const clearApiFilters = filterContext?.clearApiFilters;

  const [followingIds, setFollowingIds] = useState([]);

  // Get URL parameters
  const parentCategory = searchParams.get("parentCategory");
  const categoryName = searchParams.get("categoryName");
  const subCategoryName = searchParams.get("subCategoryName");

  // Determine which products to use - prioritize API filtered products if we have filter params
  const hasFilterParams = Boolean(
    parentCategory || categoryName || subCategoryName
  );
  const productsToDisplay = hasFilterParams
    ? apiFilteredProducts
    : contextFilteredProducts;

  // Calculate pagination
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = productsToDisplay.slice(
    indexOfFirstCard,
    indexOfLastCard
  );
  const totalPages = Math.ceil(productsToDisplay.length / cardsPerPage);

  const wishlist = useSelector((state) => state.wishlist.items);
  const details = useSelector((state) => state.auth.user);
  const userID = details?._id;

  const [AllWishlist, setAllWishlist] = useState([]);

  // Use the context function to fetch products when URL params change
  useEffect(() => {
    if (fetchProductsWithFilters) {
      fetchProductsWithFilters(parentCategory, categoryName, subCategoryName);
    }
  }, [parentCategory, categoryName, subCategoryName, fetchProductsWithFilters]);

  // Clean up API filters when component unmounts or params change
  useEffect(() => {
    return () => {
      if (!hasFilterParams && clearApiFilters) {
        clearApiFilters();
      }
    };
  }, [hasFilterParams, clearApiFilters]);

  const getUserWishlistdata = async () => {
    try {
      const token = JSON.parse(Cookies.get("auth"));
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAllWishlist(res.data.wishlist.products);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getUserFollowingList = async () => {
    try {
      const token = JSON.parse(Cookies.get("auth"));
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/following-ids`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFollowingIds(res.data?.following);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    if (token) {
      getUserWishlistdata();
      getUserFollowingList();
    }
  }, [token]);

  // Reset to first page when products change
  useEffect(() => {
    setCurrentPage(1);
  }, [productsToDisplay.length]);

  // Check if a product is in the wishlist
  const isProductInWishlist = (productId) => {
    return AllWishlist.some(
      (wishlistItem) => wishlistItem.productId === productId
    );
  };

  // Check if the user is following a seller
  const isFollowingSeller = (sellerId) => {
    return followingIds.some((id) => id === sellerId);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const handleOpenOfferPopup = (id, sellerid) => {
    if (!token) {
      toast.success("please login");
      setTimeout(() => {
        router.push("/login");
      }, [500]);
    } else {
      setSelectedProductId(id);
      setSelectedSellerId(sellerid || "admin");
      setIsOfferPopupOpen(true);
    }
  };

  const handleCloseOfferPopup = () => {
    setIsOfferPopupOpen(false);
  };

  const handleOfferSubmit = async (price) => {
    try {
      const token = JSON.parse(Cookies.get("auth"));
      const data = { offerPrice: price, seller: selectedSellerId };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/offer/add/${selectedProductId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setOfferSubmitted(true);
        handleCloseOfferPopup();
      } else {
        setErrorMessage(`Failed to submit offer: ${response.data.message}`);
        setErrorPopupOpen(true);
      }
    } catch (error) {
      setErrorMessage(`${error.response?.data?.message || error.message}`);
      setErrorPopupOpen(true);
    }
  };

  const handleLikeClick = async (id) => {
    try {
      const token = JSON.parse(Cookies.get("auth"));
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist/remove/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Update local wishlist state after successful API call
        setAllWishlist((prevWishlist) =>
          prevWishlist.filter((item) => item.productId !== id)
        );
      } else {
        setErrorMessage(
          `Failed to remove from wishlist: ${response.data.message}`
        );
        setErrorPopupOpen(true);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setErrorPopupOpen(true);
    }
  };

  const handleLoginNotification = async (id) => {
    if (!token) {
      toast.success("please Login First.");
      setTimeout(() => {
        router.push("/login");
      }, [500]);
    } else {
      try {
        const token = JSON.parse(Cookies.get("auth"));
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist/add`,
          { productId: id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          // Update local wishlist state after successful API call
          getUserWishlistdata();
        } else {
          setErrorMessage(
            `Failed to add to wishlist: ${response.data.message}`
          );
          setErrorPopupOpen(true);
        }
      } catch (error) {
        setErrorMessage(error.response?.data?.message || error.message);
        setErrorPopupOpen(true);
      }
    }
  };

  const handleToggleFollow = async (sellerId) => {
    if (!token) {
      toast.success("please Login First.");
      setTimeout(() => {
        router.push("/login");
      }, [500]);
      return;
    }

    try {
      const token = JSON.parse(Cookies.get("auth"));
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/toggleFollowUser/${sellerId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Update the followingIds state based on the response
        if (response.data.isFollowing) {
          setFollowingIds((prev) => [...prev, sellerId]);
        } else {
          setFollowingIds((prev) => prev.filter((id) => id !== sellerId));
        }

        // Show success toast
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Error while toggling follow status", error);
      toast.error("Failed to update follow status");
    }
  };

  // Check if a product is admin-created
  const isAdminProduct = (product) => {
    return !product.seller && product.admin;
  };

  const innerSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    customPaging: (i) => (
      <div
        className="custom-dot"
        style={{
          height: "5px",
          borderRadius: "20px",
          background: "rgba(235, 235, 228, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          marginTop: "-80px",
        }}
      />
    ),
    appendDots: (dots) => (
      <div
        style={{
          padding: "15px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ul style={{ display: "flex", gap: "5px" }}> {dots} </ul>
      </div>
    ),
  };

  const handleCartNavigation = () => {
    toast.success("please Login");
    setTimeout(() => {
      router.push("/login");
    }, [500]);
  };

  const handleClearFilters = () => {
    if (clearApiFilters) {
      clearApiFilters();
    }
    // Clear URL parameters and navigate to base page
    router.push("/selling-page");
  };

  // Show loading state while fetching filtered products
  if (apiLoading) {
    return (
      <div className="p-6 ml-8 h-auto w-auto font-karla z-10">
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="text-xl text-gray-500 mt-4">
            Loading filtered products...
          </p>
        </div>
      </div>
    );
  }

  // Show error state if there's an error
  if (apiError) {
    return (
      <div className="p-6 ml-8 h-auto w-auto font-karla z-10">
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-xl text-red-500 mb-4">Error: {apiError}</p>
          <div className="flex gap-4">
            <button
              onClick={() => {
                if (fetchProductsWithFilters) {
                  fetchProductsWithFilters(
                    parentCategory,
                    categoryName,
                    subCategoryName
                  );
                }
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Retry
            </button>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              View All Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 ml-8 h-auto w-auto font-karla z-10">
      {/* Display current filter info */}
      {hasFilterParams && (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Filtered Results
              </h2>
              <div className="flex flex-wrap gap-2">
                {parentCategory && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {parentCategory}
                  </span>
                )}
                {categoryName && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    {categoryName}
                  </span>
                )}
                {subCategoryName && (
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    {subCategoryName}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Showing {productsToDisplay.length} product
                {productsToDisplay.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {productsToDisplay.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-xl text-gray-500 mb-4">
            {hasFilterParams
              ? "No products found for the selected filters"
              : "No products found matching your filters"}
          </p>
          <Image
            src="/no-results.svg"
            alt="No results"
            width={150}
            height={150}
            className="opacity-50"
          />
          <button
            onClick={handleClearFilters}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            View All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentCards.map((card) => (
            <div key={card._id} className="flex flex-col">
              <div className="flex justify-between items-center space-x-4">
                <div className="flex space-x-4 items-center">
                  {!isAdminProduct(card) ? (
                    <Link href={`/user_profile/${card?.seller?._id}`}>
                      <Image
                        src={card?.seller?.avatar || "/profile_icon.svg"}
                        alt="User avatar"
                        width={48}
                        height={48}
                        className="object-contain h-12 w-12"
                      />
                    </Link>
                  ) : (
                    <Image
                      src="/profile_icon.svg"
                      alt="Admin avatar"
                      width={48}
                      height={48}
                      className="object-contain h-12 w-12"
                    />
                  )}
                  <p className="font-bold text-sm">
                    {isAdminProduct(card)
                      ? card.admin?.name || "Admin"
                      : card?.seller?.username}
                  </p>
                </div>
                {!isAdminProduct(card) && card?.seller?._id && (
                  <button
                    className={`mt-2 px-4 sm:px-6 py-1 ${
                      isFollowingSeller(card?.seller?._id)
                        ? "bg-gray-500"
                        : "bg-custom-green"
                    } text-white rounded-full transition-colors duration-300`}
                    onClick={() => handleToggleFollow(card?.seller?._id)}
                  >
                    {isFollowingSeller(card?.seller?._id)
                      ? "Unfollow"
                      : "Follow"}
                  </button>
                )}
              </div>

              <div className="relative mt-4">
                {/* Heart icon for like functionality */}
                <div className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-custom-gray cursor-pointer z-10 hover:bg-gray-300 transition-colors duration-300">
                  {isProductInWishlist(card._id) ? (
                    <FcLike
                      className="text-2xl text-red-500"
                      onClick={() => handleLikeClick(card._id)}
                    />
                  ) : (
                    <GoHeart
                      className="text-2xl text-gray-300"
                      onClick={() => handleLoginNotification(card._id)}
                    />
                  )}
                </div>

                {/* Slider for product images */}
                <Slider {...innerSliderSettings}>
                  {card.images.map((imgSrc, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="w-[307px] h-[390px] flex items-center justify-center overflow-hidden rounded-md"
                    >
                      <Image
                        src={imgSrc}
                        width={307}
                        height={390}
                        layout="fixed"
                        alt={`${card.name} - image ${imgIndex + 1}`}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  ))}
                </Slider>

                {/* Buy Now button and handshake icon */}
                <div className="absolute w-full bottom-4 flex justify-evenly items-center px-4">
                  {token ? (
                    <Link
                      href={`/selling-page/${card._id}`}
                      className="w-[70%]"
                    >
                      <button className="w-full p-2 py-[15px] sm:px-10 bg-custom-yellow text-black rounded-2xl font-bold mr-1 hover:bg-yellow-400 transition-colors duration-300">
                        Buy Now
                      </button>
                    </Link>
                  ) : (
                    <button
                      className="w-[70%] p-2 py-[15px] sm:px-10 bg-custom-yellow text-black rounded-2xl font-bold mr-1 hover:bg-yellow-400 transition-colors duration-300"
                      onClick={handleCartNavigation}
                    >
                      Buy Now
                    </button>
                  )}

                  <div className="h-12 w-12 flex items-center justify-center bg-white rounded-full hover:bg-gray-100 transition-colors duration-300">
                    <Image
                      unoptimized
                      width={30}
                      height={30}
                      src="handshake_img.png"
                      alt="Open Offer Popup"
                      className="cursor-pointer"
                      onClick={() =>
                        handleOpenOfferPopup(
                          card._id,
                          card.seller?._id || card.admin?._id || "admin"
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <h5 className="text-sm font-medium text-gray-700 mt-4">
                {card.name}
              </h5>
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
                AED {card.price}
              </h2>

              {/* Display additional product details */}
              <div className="mt-2 flex flex-wrap gap-2">
                {card.category?.parentCategory && (
                  <span className="text-xs bg-gray-200 rounded-full px-2 py-1">
                    {card.category.parentCategory}
                  </span>
                )}
                {card.size?.sizeName && (
                  <span className="text-xs bg-gray-200 rounded-full px-2 py-1">
                    Size: {card.size.sizeName}
                  </span>
                )}
                {card.condition?.conditionName && (
                  <span className="text-xs bg-gray-200 rounded-full px-2 py-1">
                    {card.condition.conditionName}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Component */}
      {productsToDisplay.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          handlePageChange={handlePageChange}
        />
      )}

      {/* Error Popup */}
      {errorPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
            <p className="text-red-600 font-semibold text-center">
              {errorMessage}
            </p>
            <button
              onClick={() => setErrorPopupOpen(false)}
              className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Offer Popup */}
      <OfferPopup
        isOpen={isOfferPopupOpen}
        onClose={handleCloseOfferPopup}
        onSubmit={handleOfferSubmit}
      />
    </div>
  );
};
