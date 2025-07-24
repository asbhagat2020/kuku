





// "use client";
// import Image from "next/image";
// import { useState } from "react";

// const ReviewItem = ({ data, canEdit }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [imageError, setImageError] = useState(false);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   const getTimeDifference = (createdAt) => {
//     const now = new Date();
//     const created = new Date(createdAt);
//     const diffMs = now - created;
//     const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
//     const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
//     const diffMonths = Math.floor(diffDays / 30);

//     if (diffMonths > 0) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
//     if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
//     return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
//   };

//   // Enhanced function to get user image
//   const getUserImage = () => {
//     // Try different possible field names from your data
//     const possibleImages = [
//       data.buyerImage,
//       data.buyerAvatar, 
//       data.userImage,
//       data.avatar,
//       data.profileImage,
//       data.image,
//       data.photo
//     ];
    
//     // Find first valid image URL
//     const userImage = possibleImages.find(img => 
//       img && 
//       typeof img === 'string' && 
//       img.trim() !== '' && 
//       img !== 'null' && 
//       img !== 'undefined'
//     );
    
//     // If no image found or image error occurred, generate fallback
//     if (!userImage || imageError) {
//       const userName = getUserName();
//       return `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random&size=60&bold=true&color=ffffff`;
//     }
    
//     return userImage;
//   };

//   const getUserName = () => {
//     const possibleNames = [
//       data.buyerUsername,
//       data.buyerName,
//       data.username,
//       data.name,
//       data.buyer,
//       data.user
//     ];
    
//     const userName = possibleNames.find(name => 
//       name && 
//       typeof name === 'string' && 
//       name.trim() !== '' && 
//       name !== 'null' && 
//       name !== 'undefined'
//     );
    
//     return userName || "Anonymous";
//   };

//   // Debug ke liye - console mein data print karo
//   console.log("ReviewItem data:", data);

//   return (
//     <div className="min-h-[337px] flex-col justify-start items-start gap-[30px] flex shadow rounded-lg px-[20px] lg:px-[56px] py-[30px]">
//       <div className="self-stretch justify-between items-center xl:gap-[661px] gap-10 inline-flex">
//         <div className="justify-start items-center gap-[18px] flex">
//           <div className="relative">
//             <Image
//               width={60}
//               height={60}
//               src={getUserImage()}
//               alt={`${getUserName()}'s Profile`}
//               className="rounded-full object-cover border-2 border-gray-200"
//               onError={() => setImageError(true)}
//               onLoad={() => setImageError(false)}
//             />
//           </div>
//           <div className="text-black lg:text-xl font-medium font-karla leading-normal">
//             {getUserName()}
//           </div>
//         </div>
//         <div className="flex gap-5">
//           <div className="flex gap-2">
//             {[...Array(5)].map((_, i) => (
//               <Image
//                 key={i}
//                 width={26}
//                 height={26}
//                 src={i < (data.rating || 0) ? "/rating.svg" : "/star_gray.svg"}
//                 alt="Rating"
//               />
//             ))}
//           </div>
//           <div className="text-[#9c9c9c] text-sm">{getTimeDifference(data.createdAt)}</div>
//         </div>
//       </div>
//       <div className="flex flex-col">
//         <div className="self-stretch text-[#9c9c9c] lg:text-2xl font-normal font-karla leading-9">
//           {data.description || data.comment || data.reviewText || "No description available."}
//         </div>
//         <div className="flex gap-3 pt-[30px]">
//           {data.productImage && Array.isArray(data.productImage) && data.productImage.map((img, imgIndex) => (
//             <Image
//               key={imgIndex}
//               src={img}
//               alt={`Product Image ${imgIndex + 1}`}
//               width={100}
//               height={100}
//               className="rounded-lg object-cover"
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewItem;





"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { IoPencil } from "react-icons/io5";
import axios from "axios";
import Cookies from "js-cookie";



const ReviewItem = ({ data, canEdit, onEdit }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const getTimeDifference = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now - created;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMonths = Math.floor(diffDays / 30);

    if (diffMonths > 0) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  };

  const getUserImage = () => {
    const possibleImages = [
      data.buyerImage,
      data.buyerAvatar,
      data.userImage,
      data.avatar,
      data.profileImage,
      data.image,
      data.photo
    ];
    const userImage = possibleImages.find(img => 
      img && typeof img === 'string' && img.trim() !== '' && img !== 'null' && img !== 'undefined'
    );
    if (!userImage || imageError) {
      const userName = getUserName();
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random&size=60&bold=true&color=ffffff`;
    }
    return userImage;
  };

  const getUserName = () => {
    const possibleNames = [
      data.buyerUsername,
      data.buyerName,
      data.username,
      data.name,
      data.buyer,
      data.user
    ];
    const userName = possibleNames.find(name => 
      name && typeof name === 'string' && name.trim() !== '' && name !== 'null' && name !== 'undefined'
    );
    return userName || "Anonymous";
  };

  console.log("ReviewItem data:", data);

  return (
    <div className="min-h-[337px] flex-col justify-start items-start gap-[30px] flex shadow rounded-lg px-[20px] lg:px-[56px] py-[30px]">
      <div className="self-stretch justify-between items-center xl:gap-[661px] gap-10 inline-flex">
        <div className="justify-start items-center gap-[18px] flex">
          <div className="relative">
            <Image
              width={60}
              height={60}
              src={getUserImage()}
              alt={`${getUserName()}'s Profile`}
              className="rounded-full object-cover border-2 border-gray-200"
              onError={() => setImageError(true)}
              onLoad={() => setImageError(false)}
            />
          </div>
          <div className="text-black lg:text-xl font-medium font-karla leading-normal">
            {getUserName()}
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <Image
                key={i}
                width={26}
                height={26}
                src={i < (data.rating || 0) ? "/rating.svg" : "/star_gray.svg"}
                alt="Rating"
              />
            ))}
          </div>
          <div className="text-[#9c9c9c] text-sm">{getTimeDifference(data.createdAt)}</div>
          {canEdit && (
            <button
              onClick={onEdit}
              className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <IoPencil className="text-lg" />
              <span className="text-sm font-semibold">Edit</span>
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="self-stretch text-[#9c9c9c] lg:text-2xl font-normal font-karla leading-9">
          {data.description || data.comment || data.reviewText || "No description available."}
        </div>
        <div className="flex gap-3 pt-[30px]">
          {data.productImage && Array.isArray(data.productImage) && data.productImage.map((img, imgIndex) => (
            <Image
              key={imgIndex}
              src={img}
              alt={`Product Image ${imgIndex + 1}`}
              width={100}
              height={100}
              className="rounded-lg object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
};


export default ReviewItem;