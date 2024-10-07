import Image from "next/image";
import amiriImg from "../public/product-image.png";
import kukuLogo from "../public/emojiKuku.png";
import {
  FaStar,
  FaRegHeart,
  FaRegHandshake,
  FaShoppingBag,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

const ProductCard = () => {
  return (
    <div className="max-w-screen-xl mx-auto pl-1 pr-6">
      {/* Breadcrumbs */}
      <div className="breadcrumb text-gray-500 text-sm mb-3 mt-2">
        <span>Home</span> | <span>Categories</span> | <span>Tshirt</span> |{" "}
        <span className="font-bold">AMIRI Men Oversize T-shirt</span>
      </div>

      <hr className="border-gray-300 mb-4" />

      <div className="flex flex-col md:flex-row items-start gap-6 relative">
        <div className="w-full md:w-1/2 relative">
          <Image
            src={amiriImg}
            alt="AMIRI Men Oversize T-shirt"
            className="object-cover rounded-md"
            style={{
              width: "100%",
              height: "500px",
              maxWidth: "650px",
            }}
          />
          <button
            className="absolute left-1 top-1/2 transform -translate-y-1/2 rounded-full p-2 shadow-md"
            style={{
              backgroundColor: "#E5E5E5",
              boxShadow: "inset -20px -6px 24px rgba(209, 209, 209, 0.07)",
              filter: "drop-shadow(0px 10px 44px rgba(0, 0, 0, 0.09))",
            }}
          >
            <FaArrowLeft className="text-black w-4 h-4" />
          </button>
          <button
            className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full p-2 shadow-md"
            style={{
              backgroundColor: "#E5E5E5",
              boxShadow: "inset -20px -6px 24px rgba(209, 209, 209, 0.07)",
              filter: "drop-shadow(0px 10px 44px rgba(0, 0, 0, 0.09))",
            }}
          >
            <FaArrowRight className="text-black w-4 h-4" />
          </button>
        </div>

        <div
          className="hidden md:block"
          style={{
            width: "1px",
            backgroundColor: "lightgray",
            height: "832px",
            marginLeft: "10px",
          }}
        ></div>

        <div className="w-full md:w-1/2 space-y-4">
          <div className="flex space-x-2">
            <span
              className="inline-block px-4 py-2 text-black rounded-full text-xs font-semibold border border-gray-400 shadow-sm"
              style={{ backgroundColor: "#E6E6E6" }}
            >
              T-shirt
            </span>
            <span
              className="inline-block px-4 py-2 text-black rounded-full text-xs font-semibold border border-gray-400 shadow-sm"
              style={{ backgroundColor: "#E6E6E6" }}
            >
              Men
            </span>
          </div>

          <h1 className="text-3xl font-bold">AMIRI | Men Oversize T-shirt</h1>

          <p className="text-gray-400" style={{ marginTop: "0.2rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>

          <div className="text-2xl font-bold">
            AED250.00{" "}
            <span style={{ color: "#30BD75", fontSize: "1.50rem" }}>
              (55% OFF)
            </span>
            <p
              className="text-gray-400 line-through"
              style={{ fontSize: "0.985rem", margin: 0, fontWeight: "normal" }}
            >
              MRP AED650
            </p>
          </div>

          <div className="flex items-center text-gray-600 space-x-4 font-medium">
            <div>
              <span className="font-bold">SIZE</span>
              <span className="inline-block ml-2 px-2 py-1 border border-red-500 text-red-500 rounded">
                OS
              </span>
            </div>
            <div>
              <span className="font-bold">CONDITION:</span>
              <span className="font-bold"> GOOD</span>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              className="border-2 text-pink-500 rounded-md px-4 py-3 w-full max-w-[200px] font-bold flex items-center justify-center"
              style={{ borderColor: "#E4086F", borderRadius: "16px" }}
            >
              <FaRegHeart className="mr-2 w-5 h-5" />
              WISHLIST
            </button>

            <button
              className="border-2 text-green-500 rounded-md px-4 py-3 w-full max-w-[377px] h-20 font-bold flex items-center justify-center"
              style={{ borderColor: "#30BD75", borderRadius: "16px" }}
            >
              <FaRegHandshake className="mr-2 w-5 h-5" />
              MAKE AN OFFER
            </button>
          </div>

          <button
            className="mt-4 text-black w-full font-bold flex items-center justify-center"
            style={{
              height: "72px",
              backgroundColor: "#FDE504",
              borderRadius: "16px",
            }}
          >
            <FaShoppingBag className="mr-2" />
            ADD TO BAG
          </button>

          <div className="flex flex-col mt-2">
            <a href="/rent" className="text-center font-bold text-black ">
              Or Rent it for
            </a>

            <button
              className="mt-2 text-black w-full font-bold"
              style={{
                height: "72px",
                backgroundColor: "#69D3FA",
                borderRadius: "16px",
              }}
            >
              AED 70
            </button>
          </div>

          <div
            className="mt-10 mb-0.75"
            style={{ marginTop: "3rem", marginBottom: "0.75rem" }}
          >
            <p className="font-bold mb-3">Sold by</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    backgroundColor: "#AF65E6",
                    width: "70px",
                    height: "70px",
                  }}
                >
                  <Image
                    src={kukuLogo}
                    alt="Kuku Logo"
                    className="object-contain w-12 h-12"
                  />
                </div>

                <div className="ml-3">
                  <p className="font-bold">Kuku1222</p>
                </div>
              </div>

              <button
                className="ml-auto rounded-md px-4 py-2 bg-green-500 text-white w-full max-w-[136px] font-bold"
                style={{ borderRadius: "20px" }}
              >
                Follow
              </button>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p
                  className="text-black-500 text-sm font-medium"
                  style={{ marginBottom: "10px", marginTop: "10px" }}
                >
                  Seller rating based on 100+ reviews
                </p>
                <div className="flex items-center">
                  <span className="text-black font-bold">4.7</span>
                  <FaStar className="text-[#69D3FA] ml-1" />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <hr className="border-gray-300 my-3" />
              <div className="flex items-center justify-between">
                <p
                  className="text-black-500 text-sm font-medium"
                  style={{ marginBottom: "10px", marginTop: "10px" }}
                >
                  106 Products Sold
                </p>

                <button
                  className="text-[#E4086F] text-sm font-bold"
                  style={{ border: "none", background: "transparent" }}
                >
                  View
                </button>
              </div>
            </div>

            <div className="my-6">
              <hr className="border-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
