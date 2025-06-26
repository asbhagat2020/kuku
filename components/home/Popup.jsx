// import { useState } from "react";

// import Link from "next/link";
// import Image from "next/image";

// const Popup = ({ isOpen, onClose }) => {
//   const handleOutsideClick = (e) => {
//     if (e.target.id === "popup-container") {
//       onClose();
//     }
//   };

//   return (
//     isOpen && (
//       <div
//         id="popup-container"
//         className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
//         onClick={handleOutsideClick}
//       >
//         <div className="h-[677px] px-4 py-[22px] bg-white rounded-[10px] flex-col justify-start items-center gap-4 inline-flex">
//           {/* Section 1 */}
//           <div className="w-[328px] h-[154px] relative rounded-xl border border-[#e0e0e0] flex flex-col p-4">
//             <div className="flex items-center">
//               <Image src="/green-tick.png" alt="tick" width={18} height={18} />
//               <span className="ml-2 text-[#070707] text-base font-normal leading-tight">
//                 You click photos and pack order
//               </span>
//             </div>
//             <div className="flex items-center mt-2">
//               <Image src="/green-tick.png" alt="tick" width={18} height={18} />
//               <span className="ml-2 text-[#070707] text-base font-normal leading-tight">
//                 We pick up order at your doorstep
//               </span>
//             </div>
//             <Link href="/listingproduct">
//               <button className="w-[292px] h-[52px] mt-4 bg-gradient-to-r from-[#e4086f] to-[#ff489e] rounded-[10px] flex items-center justify-between">
//                 <div className="flex items-center">
//                   <div
//                     className="w-[30.86px] h-[30.86px] bg-white rounded-full flex items-center justify-center mr-2"
//                     style={{ marginLeft: "8px" }}
//                   >
//                     <Image
//                       src="/mb-icon.png"
//                       alt="Post Item Icon"
//                       width={28}
//                       height={28}
//                     />
//                   </div>

//                   <span
//                     className="text-white text-base font-bold text-center"
//                     style={{ marginLeft: "6px" }}
//                   >
//                     Post Item Myself
//                   </span>
//                 </div>
//                 <div className="w-6 h-6">
//                   <Image
//                     src="/arrow-right.png"
//                     alt="Arrow"
//                     width={24}
//                     height={24}
//                   />
//                 </div>
//               </button>
//             </Link>
//           </div>

//           {/* Or separator */}
//           <div className="text-[#a7a7a7] text-base font-normal">Or</div>

//           {/* Section 2 */}
//           <div className="w-[328px] h-[181px] relative rounded-xl border border-[#e0e0e0] flex flex-col p-4">
//             <div className="flex items-center">
//               <Image src="/green-tick.png" alt="tick" width={18} height={18} />
//               <span className="ml-2 text-[#070707] text-base font-normal leading-tight">
//                 You click photos and pack order
//               </span>
//             </div>
//             <div className="flex items-center mt-2">
//               <Image src="/green-tick.png" alt="tick" width={18} height={18} />
//               <span className="ml-2 text-[#070707] text-base font-normal leading-tight">
//                 We pick up order at your doorstep
//               </span>
//             </div>
//             <div className="text-[#070707]/30 text-xs font-normal mt-2 mb-2">
//               *Ku-Kit is only applicable for minimum 5 items
//             </div>
//             <Link href="/kukuit">
//               <button className="w-[292px] h-[52px] bg-gradient-to-r from-[#f7d400] to-[#fef200] rounded-[10px] flex items-center justify-between">
//                 <div className="flex items-center">
//                   <div
//                     className="w-[30.86px] h-[30.86px] bg-white rounded-full flex items-center justify-center mr-2"
//                     style={{ marginLeft: "6px" }}
//                   >
//                     {" "}
//                     {/* Reduced by 4px */}
//                     <Image
//                       src="/giftbox-icon.png"
//                       alt="Kukit Services"
//                       width={22}
//                       height={22}
//                     />
//                   </div>
//                   <span
//                     className="text-white text-base font-bold text-center"
//                     style={{ marginLeft: "6px" }}
//                   >
//                     {" "}
//                     {/* Shifted 4px more right */}
//                     Kukit Services
//                   </span>
//                 </div>
//                 <div className="w-6 h-6">
//                   <Image
//                     src="/arrow-right.png"
//                     alt="Arrow"
//                     width={24}
//                     height={24}
//                   />
//                 </div>
//               </button>
//             </Link>
//           </div>

//           {/* Or separator */}
//           <div className="text-[#a7a7a7] text-base font-normal">Or</div>

//           {/* Section 3 */}
//           <div className="w-[328px] h-[165px] relative rounded-xl border border-[#e0e0e0] flex flex-col p-4">

            
//             <div className="flex items-start gap-2">
//               <Image src="/green-tick.png" alt="tick" width={18} height={18} />
//               <span className="text-[#070707] text-base font-normal leading-tight">
//                 Don't want to sell? Schedule pick up and we repurpose/recycle or give it for charity.
//               </span>
//             </div>

//             <Link href="/giveaway">
//               <button className="w-[292px] h-[52px] bg-[#30bd75] rounded-[10px] flex items-center justify-between mt-2">
//                 <div className="flex items-center">
//                   <div
//                     className="w-[30.86px] h-[30.86px] bg-white rounded-full flex items-center justify-center mr-2"
//                     style={{ marginLeft: "6px" }}
//                   >
//                     <Image
//                       src="/giftbox-icon.png"
//                       alt="Give Away"
//                       width={22}
//                       height={22}
//                     />
//                   </div>
//                   <span
//                     className="text-white text-base font-bold text-center"
//                     style={{ marginLeft: "6px" }}
//                   >
//                     Give Away
//                   </span>
//                 </div>
//                 <div className="w-6 h-6">
//                   <Image
//                     src="/arrow-right.png"
//                     alt="Arrow"
//                     width={24}
//                     height={24}
//                   />
//                 </div>
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default Popup;



import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Popup = ({ isOpen, onClose }) => {
  const handleOutsideClick = (e) => {
    if (e.target.id === "popup-container") {
      onClose();
    }
  };

  return (
    isOpen && (
      <div
        id="popup-container"
        className="fixed inset-0 w-full flex justify-center items-center bg-black bg-opacity-50 z-50"
        onClick={handleOutsideClick}
      >
        <div className="h-[677px] px-4 py-[22px] bg-white rounded-[10px] flex-col justify-start items-center gap-4 inline-flex">
          {/* Section 1 */}
          <div className="w-[328px] h-[154px] relative rounded-xl border border-[#e0e0e0] flex flex-col p-4">
            <div className="flex items-center">
              <Image src="/green-tick.png" alt="tick" width={18} height={18} />
              <span className="ml-2 text-[#070707] text-base font-normal leading-tight">
                You click photos and pack order
              </span>
            </div>
            <div className="flex items-center mt-2">
              <Image src="/green-tick.png" alt="tick" width={18} height={18} />
              <span className="ml-2 text-[#070707] text-base font-normal leading-tight">
                We pick up order at your doorstep
              </span>
            </div>
            <Link href="/listingproduct">
              <button className="w-[292px] h-[52px] mt-4 bg-gradient-to-r from-[#e4086f] to-[#ff489e] rounded-[10px] flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-[30.86px] h-[30.86px] bg-white rounded-full flex items-center justify-center mr-2"
                    style={{ marginLeft: "8px" }}
                  >
                    <Image
                      src="/mb-icon.png"
                      alt="Post Item Icon"
                      width={28}
                      height={28}
                    />
                  </div>

                  <span
                    className="text-white text-base font-bold text-center"
                    style={{ marginLeft: "6px" }}
                  >
                    Post Item Myself
                  </span>
                </div>
                <div className="w-6 h-6">
                  <Image
                    src="/arrow-right.png"
                    alt="Arrow"
                    width={24}
                    height={24}
                  />
                </div>
              </button>
            </Link>
          </div>

          {/* Or separator */}
          <div className="text-[#a7a7a7] text-base font-normal">Or</div>

          {/* Section 2 */}
          <div className="w-[328px] h-[181px] relative rounded-xl border border-[#e0e0e0] flex flex-col p-4">
            <div className="flex items-center">
              <Image src="/green-tick.png" alt="tick" width={18} height={18} />
              <span className="ml-2 text-[#070707] text-base font-normal leading-tight">
                You click photos and pack order
              </span>
            </div>
            <div className="flex items-center mt-2">
              <Image src="/green-tick.png" alt="tick" width={18} height={18} />
              <span className="ml-2 text-[#070707] text-base font-normal leading-tight">
                We pick up order at your doorstep
              </span>
            </div>
            <div className="text-[#070707]/30 text-xs font-normal mt-2 mb-2">
              *Ku-Kit is only applicable for minimum 5 items
            </div>
            <Link href="/kukuit">
              <button className="w-[292px] h-[52px] bg-gradient-to-r from-[#f7d400] to-[#fef200] rounded-[10px] flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-[30.86px] h-[30.86px] bg-white rounded-full flex items-center justify-center mr-2"
                    style={{ marginLeft: "6px" }}
                  >
                    <Image
                      src="/giftbox-icon.png"
                      alt="Kukit Services"
                      width={22}
                      height={22}
                    />
                  </div>
                  <span
                    className="text-white text-base font-bold text-center"
                    style={{ marginLeft: "6px" }}
                  >
                    Kukit Services
                  </span>
                </div>
                <div className="w-6 h-6">
                  <Image
                    src="/arrow-right.png"
                    alt="Arrow"
                    width={24}
                    height={24}
                  />
                </div>
              </button>
            </Link>
          </div>

          {/* Or separator */}
          <div className="text-[#a7a7a7] text-base font-normal">Or</div>

          {/* Section 3 */}
          <div className="w-[328px] h-[165px] relative rounded-xl border border-[#e0e0e0] flex flex-col p-4">
            <div className="flex items-start gap-2">
              <Image src="/green-tick.png" alt="tick" width={18} height={18} />
              <span className="text-[#070707] text-base font-normal leading-tight">
                {"Don't want to sell? Schedule pick up and we repurpose/recycle or give it for charity."}
              </span>
            </div>

            <Link href="/giveaway">
              <button className="w-[292px] h-[52px] bg-[#30bd75] rounded-[10px] flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <div
                    className="w-[30.86px] h-[30.86px] bg-white rounded-full flex items-center justify-center mr-2"
                    style={{ marginLeft: "6px" }}
                  >
                    <Image
                      src="/giftbox-icon.png"
                      alt="Give Away"
                      width={22}
                      height={22}
                    />
                  </div>
                  <span
                    className="text-white text-base font-bold text-center"
                    style={{ marginLeft: "6px" }}
                  >
                    Give Away
                  </span>
                </div>
                <div className="w-6 h-6">
                  <Image
                    src="/arrow-right.png"
                    alt="Arrow"
                    width={24}
                    height={24}
                  />
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  );
};

export default Popup;
