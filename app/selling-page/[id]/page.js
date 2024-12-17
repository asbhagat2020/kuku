"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import DownloadKuku from "@/components/home/DownloadKuku";
import ProductCard from "@/components/ProductCard";
import Recommendations from "@/components/Recommendations";
import { useParams } from "next/navigation";

const ProductDetail = () => {
  const cardData = [
    {
      id: 1,
      user: {
        username: "Kuku1222",
        avatar: "/profile_icon.svg", // Path to the seller's avatar
        rating: 4.7,
        productsSold: 106,
        isFollowed: false,
      },
      productInfo: {
        title: "Dress",
        category: "T-shirt",
        gender: "Unisex",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        condition: "NEW",
        size: "O",
      },
      pricing: {
        currentPrice: 120.0,
        originalPrice: 200.0,
        discountPercentage: 40,
        rentPrice: 40.0,
        currency: "AED",
      },
      images: ["/card_image1.png", "/card_image2.png", "/card_image3.png"],
      rentalPolicy: {
        depositRequired: true,
        depositRefundable: true,
      },
      offerOptions: [100.0, 90.0],
    },
    {
      id: 2,
      user: {
        username: "Kuku1222",
        avatar: "/profile_icon.svg",
        rating: 4.5,
        productsSold: 150,
        isFollowed: true,
      },
      productInfo: {
        title: "Dress",
        category: "Dress",
        gender: "Women",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        condition: "USED",
        size: "M",
      },
      pricing: {
        currentPrice: 120.0,
        originalPrice: 180.0,
        discountPercentage: 33,
        rentPrice: 50.0,
        currency: "AED",
      },
      images: ["/card_image2.png", "/card_image3.png", "/card_image1.png"],
      rentalPolicy: {
        depositRequired: true,
        depositRefundable: false,
      },
      offerOptions: [110.0, 100.0],
    },
    {
      id: 3,
      user: {
        username: "Kuku1222",
        avatar: "/profile_icon.svg",
        rating: 4.9,
        productsSold: 200,
        isFollowed: false,
      },
      productInfo: {
        title: "Dress",
        category: "Dress",
        gender: "Women",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        condition: "GOOD",
        size: "S",
      },
      pricing: {
        currentPrice: 120.0,
        originalPrice: 150.0,
        discountPercentage: 20,
        rentPrice: 60.0,
        currency: "AED",
      },
      images: ["/card_image3.png", "/card_image1.png", "/card_image2.png"],
      rentalPolicy: {
        depositRequired: false,
        depositRefundable: false,
      },
      offerOptions: [105.0, 95.0],
    },
    {
      id: 4,
      user: {
        username: "Kuku1222",
        avatar: "/profile_icon.svg", // Path to the seller's avatar
        rating: 4.7,
        productsSold: 106,
        isFollowed: false,
      },
      productInfo: {
        title: "Dress",
        category: "T-shirt",
        gender: "Unisex",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        condition: "NEW",
        size: "O",
      },
      pricing: {
        currentPrice: 120.0,
        originalPrice: 200.0,
        discountPercentage: 40,
        rentPrice: 40.0,
        currency: "AED",
      },
      images: ["/card_image4.png", "/card_image3.png", "/card_image2.png", "/card_image1.png"],
      rentalPolicy: {
        depositRequired: true,
        depositRefundable: true,
      },
      offerOptions: [100.0, 90.0],
    },
    {
      id: 5,
      user: {
        username: "Kuku1222",
        avatar: "/profile_icon.svg", // Path to the seller's avatar
        rating: 4.7,
        productsSold: 106,
        isFollowed: false,
      },
      productInfo: {
        title: "Dress",
        category: "T-shirt",
        gender: "Unisex",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        condition: "NEW",
        size: "O",
      },
      pricing: {
        currentPrice: 120.0,
        originalPrice: 200.0,
        discountPercentage: 40,
        rentPrice: 40.0,
        currency: "AED",
      },
      images: ["/card_image5.png", "/card_image4.png", "/card_image3.png", "/card_image2.png"],
      rentalPolicy: {
        depositRequired: true,
        depositRefundable: true,
      },
      offerOptions: [100.0, 90.0],
    },
    {
      id: 6,
      user: {
        username: "Kuku1222",
        avatar: "/profile_icon.svg", // Path to the seller's avatar
        rating: 4.7,
        productsSold: 106,
        isFollowed: false,
      },
      productInfo: {
        title: "Dress",
        category: "T-shirt",
        gender: "Unisex",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        condition: "NEW",
        size: "O",
      },
      pricing: {
        currentPrice: 120.0,
        originalPrice: 200.0,
        discountPercentage: 40,
        rentPrice: 40.0,
        currency: "AED",
      },
      images: ["/card_image6.png", "/card_image5.png", "/card_image4.png", "/card_image3.png", "/card_image2.png"],
      rentalPolicy: {
        depositRequired: true,
        depositRefundable: true,
      },
      offerOptions: [100.0, 90.0],
    },
    {
      id: 7,
      user: {
        username: "Kuku1222",
        avatar: "/profile_icon.svg", // Path to the seller's avatar
        rating: 4.7,
        productsSold: 106,
        isFollowed: false,
      },
      productInfo: {
        title: "Dress",
        category: "T-shirt",
        gender: "Unisex",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        condition: "NEW",
        size: "O",
      },
      pricing: {
        currentPrice: 120.0,
        originalPrice: 200.0,
        discountPercentage: 40,
        rentPrice: 40.0,
        currency: "AED",
      },
      images: ["/card_image1.png", "/card_image6.png", "/card_image5.png", "/card_image4.png", "/card_image2.png"],
      rentalPolicy: {
        depositRequired: true,
        depositRefundable: true,
      },
      offerOptions: [100.0, 90.0],
    },
    {
      id: 8,
      user: {
        username: "Kuku1222",
        avatar: "/profile_icon.svg", // Path to the seller's avatar
        rating: 4.7,
        productsSold: 106,
        isFollowed: false,
      },
      productInfo: {
        title: "Dress",
        category: "T-shirt",
        gender: "Unisex",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        condition: "NEW",
        size: "O",
      },
      pricing: {
        currentPrice: 120.0,
        originalPrice: 200.0,
        discountPercentage: 40,
        rentPrice: 40.0,
        currency: "AED",
      },
      images: ["/card_image2.png", "/card_image3.png", "/card_image1.png"],
      rentalPolicy: {
        depositRequired: true,
        depositRefundable: true,
      },
      offerOptions: [100.0, 90.0],
    },
    {
      id: 9,
      user: {
        username: "Kuku1222",
        avatar: "/profile_icon.svg", // Path to the seller's avatar
        rating: 4.7,
        productsSold: 106,
        isFollowed: false,
      },
      productInfo: {
        title: "Dress",
        category: "T-shirt",
        gender: "Unisex",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        condition: "NEW",
        size: "O",
      },
      pricing: {
        currentPrice: 120.0,
        originalPrice: 200.0,
        discountPercentage: 40,
        rentPrice: 40.0,
        currency: "AED",
      },
      images: ["/card_image2.png", "/card_image3.png", "/card_image1.png"],
      rentalPolicy: {
        depositRequired: true,
        depositRefundable: true,
      },
      offerOptions: [100.0, 90.0],
    },
    {
      id: 10,
      user: {
        username: "Kuku1222",
        avatar: "/profile_icon.svg", // Path to the seller's avatar
        rating: 4.7,
        productsSold: 106,
        isFollowed: false,
      },
      productInfo: {
        title: "Dress",
        category: "T-shirt",
        gender: "Unisex",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        condition: "NEW",
        size: "O",
      },
      pricing: {
        currentPrice: 120.0,
        originalPrice: 200.0,
        discountPercentage: 40,
        rentPrice: 40.0,
        currency: "AED",
      },
      images: ["/card_image1.png", "/card_image2.png", "/card_image3.png"],
      rentalPolicy: {
        depositRequired: true,
        depositRefundable: true,
      },
      offerOptions: [100.0, 90.0],
    },
    {
      id: 11,
      user: {
        username: "Kuku1222",
        avatar: "/profile_icon.svg",
        rating: 4.5,
        productsSold: 150,
        isFollowed: true,
      },
      productInfo: {
        title: "Dress",
        category: "Dress",
        gender: "Women",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        condition: "USED",
        size: "M",
      },
      pricing: {
        currentPrice: 120.0,
        originalPrice: 180.0,
        discountPercentage: 33,
        rentPrice: 50.0,
        currency: "AED",
      },
      images: ["/card_image2.png", "/card_image3.png", "/card_image1.png"],
      rentalPolicy: {
        depositRequired: true,
        depositRefundable: false,
      },
      offerOptions: [110.0, 100.0],
    },
    {
      id: 12,
      user: {
        username: "Kuku1222",
        avatar: "/profile_icon.svg",
        rating: 4.9,
        productsSold: 200,
        isFollowed: false,
      },
      productInfo: {
        title: "Dress",
        category: "Dress",
        gender: "Women",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        condition: "GOOD",
        size: "S",
      },
      pricing: {
        currentPrice: 120.0,
        originalPrice: 150.0,
        discountPercentage: 20,
        rentPrice: 60.0,
        currency: "AED",
      },
      images: ["/card_image3.png", "/card_image1.png", "/card_image2.png"],
      rentalPolicy: {
        depositRequired: false,
        depositRefundable: false,
      },
      offerOptions: [105.0, 95.0],
    },
    {
      id: 13,
      user: {
        username: "Kuku1222",
        avatar: "/profile_icon.svg", // Path to the seller's avatar
        rating: 4.7,
        productsSold: 106,
        isFollowed: false,
      },
      productInfo: {
        title: "Dress",
        category: "T-shirt",
        gender: "Unisex",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        condition: "NEW",
        size: "O",
      },
      pricing: {
        currentPrice: 120.0,
        originalPrice: 200.0,
        discountPercentage: 40,
        rentPrice: 40.0,
        currency: "AED",
      },
      images: ["/card_image4.png", "/card_image3.png", "/card_image2.png", "/card_image1.png"],
      rentalPolicy: {
        depositRequired: true,
        depositRefundable: true,
      },
      offerOptions: [100.0, 90.0],
    },
    {
      id: 14,
      user: {
        username: "Kuku1222",
        avatar: "/profile_icon.svg", // Path to the seller's avatar
        rating: 4.7,
        productsSold: 106,
        isFollowed: false,
      },
      productInfo: {
        title: "Dress",
        category: "T-shirt",
        gender: "Unisex",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        condition: "NEW",
        size: "O",
      },
      pricing: {
        currentPrice: 120.0,
        originalPrice: 200.0,
        discountPercentage: 40,
        rentPrice: 40.0,
        currency: "AED",
      },
      images: ["/card_image5.png", "/card_image4.png", "/card_image3.png", "/card_image2.png"],
      rentalPolicy: {
        depositRequired: true,
        depositRefundable: true,
      },
      offerOptions: [100.0, 90.0],
    },
    {
      id: 15,
      user: {
        username: "Kuku1222",
        avatar: "/profile_icon.svg", // Path to the seller's avatar
        rating: 4.7,
        productsSold: 106,
        isFollowed: false,
      },
      productInfo: {
        title: "Dress",
        category: "T-shirt",
        gender: "Unisex",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        condition: "NEW",
        size: "O",
      },
      pricing: {
        currentPrice: 120.0,
        originalPrice: 200.0,
        discountPercentage: 40,
        rentPrice: 40.0,
        currency: "AED",
      },
      images: ["/card_image6.png", "/card_image5.png", "/card_image4.png", "/card_image3.png", "/card_image2.png"],
      rentalPolicy: {
        depositRequired: true,
        depositRefundable: true,
      },
      offerOptions: [100.0, 90.0],
    },
    {
      id: 16,
      user: {
        username: "Kuku1222",
        avatar: "/profile_icon.svg", // Path to the seller's avatar
        rating: 4.7,
        productsSold: 106,
        isFollowed: false,
      },
      productInfo: {
        title: "Dress",
        category: "T-shirt",
        gender: "Unisex",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        condition: "NEW",
        size: "O",
      },
      pricing: {
        currentPrice: 120.0,
        originalPrice: 200.0,
        discountPercentage: 40,
        rentPrice: 40.0,
        currency: "AED",
      },
      images: ["/card_image1.png", "/card_image6.png", "/card_image5.png", "/card_image4.png", "/card_image2.png"],
      rentalPolicy: {
        depositRequired: true,
        depositRefundable: true,
      },
      offerOptions: [100.0, 90.0],
    },
    {
      id: 17,
      user: {
        username: "Kuku1222",
        avatar: "/profile_icon.svg", // Path to the seller's avatar
        rating: 4.7,
        productsSold: 106,
        isFollowed: false,
      },
      productInfo: {
        title: "Dress",
        category: "T-shirt",
        gender: "Unisex",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        condition: "NEW",
        size: "O",
      },
      pricing: {
        currentPrice: 120.0,
        originalPrice: 200.0,
        discountPercentage: 40,
        rentPrice: 40.0,
        currency: "AED",
      },
      images: ["/card_image2.png", "/card_image3.png", "/card_image1.png"],
      rentalPolicy: {
        depositRequired: true,
        depositRefundable: true,
      },
      offerOptions: [100.0, 90.0],
    },
    {
      id: 18,
      user: {
        username: "Kuku1222",
        avatar: "/profile_icon.svg", // Path to the seller's avatar
        rating: 4.7,
        productsSold: 106,
        isFollowed: false,
      },
      productInfo: {
        title: "Dress",
        category: "T-shirt",
        gender: "Unisex",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        condition: "NEW",
        size: "O",
      },
      pricing: {
        currentPrice: 120.0,
        originalPrice: 200.0,
        discountPercentage: 40,
        rentPrice: 40.0,
        currency: "AED",
      },
      images: ["/card_image2.png", "/card_image3.png", "/card_image1.png"],
      rentalPolicy: {
        depositRequired: true,
        depositRefundable: true,
      },
      offerOptions: [100.0, 90.0],
    }
    // Add more entries following the same pattern
  ];

  const params = useParams();
  const id = params.id;
  const product = cardData.find((item) => item.id === Number(id));
  console.log(product);
  return (
    <div>
      <Header />
      <ProductCard product={product} />
      <Recommendations />
      <DownloadKuku />
      <Footer />
    </div>
  );
};

export default ProductDetail;
