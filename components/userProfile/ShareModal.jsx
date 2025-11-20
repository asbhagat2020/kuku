// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import Modal from "./Modal";

// // Add this to your ProfileSection component imports:
// // import ShareModal from "./ShareModal";

// const ShareModal = ({ isOpen, onClose, userDetails }) => {
//   const [copySuccess, setCopySuccess] = useState(false);

//   // Generate profile URL (you can modify this based on your routing)
//   const profileUrl = `${window.location.origin}/profile/${userDetails?.user?.username || userDetails?.user?._id}`;

//   const shareText = `Check out ${userDetails?.user?.name || userDetails?.user?.username}'s profile on Kuku!`;

//   const handleCopyLink = async () => {
//     try {
//       await navigator.clipboard.writeText(profileUrl);
//       setCopySuccess(true);
//       setTimeout(() => setCopySuccess(false), 2000);
//     } catch (err) {
//       console.error('Failed to copy: ', err);
//     }
//   };

//   const handleWhatsAppShare = () => {
//     const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + profileUrl)}`;
//     window.open(whatsappUrl, '_blank');
//   };

//   const handleTwitterShare = () => {
//     const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(profileUrl)}`;
//     window.open(twitterUrl, '_blank');
//   };

//   const handleFacebookShare = () => {
//     const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`;
//     window.open(facebookUrl, '_blank');
//   };

//   const handleLinkedInShare = () => {
//     const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`;
//     window.open(linkedinUrl, '_blank');
//   };

//   const handleEmailShare = () => {
//     const subject = encodeURIComponent(`Check out ${userDetails?.user?.name || userDetails?.user?.username}'s profile`);
//     const body = encodeURIComponent(`${shareText}\n\n${profileUrl}`);
//     const emailUrl = `mailto:?subject=${subject}&body=${body}`;
//     window.open(emailUrl);
//   };

//   const handleTelegramShare = () => {
//     const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(profileUrl)}&text=${encodeURIComponent(shareText)}`;
//     window.open(telegramUrl, '_blank');
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} showCloseButton={false}>
//       <div className="flex flex-col w-full max-w-sm mx-auto bg-white rounded-lg shadow-lg m-4">
//         {/* Header */}
//         <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-white rounded-t-lg">
//           <h2 className="text-xl font-bold text-black">Share Profile</h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//             type="button"
//             aria-label="Close modal"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-5 space-y-4">
//           {/* Profile Preview */}
//           <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
//             <div className="w-12 h-12 rounded-full bg-[#AF65E6] border-2 border-yellow-400 p-1 flex-shrink-0">
//               <Image
//                 unoptimized
//                 src={userDetails?.user?.avatar || "/kuku-suit 2.png"}
//                 width={40}
//                 height={40}
//                 className="w-full h-full rounded-full object-cover"
//                 alt="Profile"
//               />
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-semibold text-black truncate">
//                 {userDetails?.user?.name || userDetails?.user?.username}
//               </p>
//               <p className="text-xs text-gray-500 truncate">
//                 @{userDetails?.user?.username}
//               </p>
//             </div>
//           </div>

//           {/* Copy Link Section */}
//           {/* <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-700">Profile Link</label>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="text"
//                 value={profileUrl}
//                 readOnly
//                 className="flex-1 px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 onClick={handleCopyLink}
//                 className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//                   copySuccess
//                     ? 'bg-green-500 text-white'
//                     : 'bg-blue-500 hover:bg-blue-600 text-white'
//                 }`}
//               >
//                 {copySuccess ? 'Copied!' : 'Copy'}
//               </button>
//             </div>
//           </div> */}

//           {/* Share Options */}
//           <div className="space-y-3">
//             <label className="text-sm font-medium text-gray-700">Share via</label>

//             {/* Social Media Grid */}
//             <div className="grid grid-cols-2 gap-3">
//               {/* WhatsApp */}
//               <button
//                 onClick={handleWhatsAppShare}
//                 className="flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
//               >
//                 <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
//                   <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
//                   </svg>
//                 </div>
//                 <span className="text-sm font-medium text-gray-700 group-hover:text-green-700">WhatsApp</span>
//               </button>

//               {/* Twitter */}
//               <button
//                 onClick={handleTwitterShare}
//                 className="flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
//               >
//                 <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
//                   <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
//                   </svg>
//                 </div>
//                 <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">Twitter</span>
//               </button>

//               {/* Facebook */}
//               <button
//                 onClick={handleFacebookShare}
//                 className="flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
//               >
//                 <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
//                   <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
//                   </svg>
//                 </div>
//                 <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">Facebook</span>
//               </button>

//               {/* LinkedIn */}
//               <button
//                 onClick={handleLinkedInShare}
//                 className="flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
//               >
//                 <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
//                   <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
//                   </svg>
//                 </div>
//                 <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">LinkedIn</span>
//               </button>

//               {/* Telegram */}
//               <button
//                 onClick={handleTelegramShare}
//                 className="flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
//               >
//                 <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
//                   <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
//                   </svg>
//                 </div>
//                 <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">Telegram</span>
//               </button>

//               {/* Email */}
//               <button
//                 onClick={handleEmailShare}
//                 className="flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
//               >
//                 <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
//                   <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                   </svg>
//                 </div>
//                 <span className="text-sm font-medium text-gray-700 group-hover:text-gray-700">Email</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default ShareModal;

// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import Modal from "./Modal";

// // Add this to your ProfileSection component imports:
// // import ShareModal from "./ShareModal";

// const ShareModal = ({ isOpen, onClose, userDetails }) => {
//   const [copySuccess, setCopySuccess] = useState(false);

//   // Generate profile URL (you can modify this based on your routing)
//   const profileUrl = `${window.location.origin}/profile/${userDetails?.user?.username || userDetails?.user?._id}`;

//   const shareText = `Check out ${userDetails?.user?.name || userDetails?.user?.username}'s profile on Kuku!`;

//   const handleCopyLink = async () => {
//     // Method 1: Try modern clipboard API if document is focused
//     if (document.hasFocus() && navigator.clipboard) {
//       try {
//         await navigator.clipboard.writeText(profileUrl);
//         setCopySuccess(true);
//         setTimeout(() => setCopySuccess(false), 2000);
//         return;
//       } catch (err) {
//         console.log('Clipboard API not available or failed, trying fallback...');
//       }
//     }

//     // Method 2: Try execCommand fallback
//     try {
//       const textArea = document.createElement('textarea');
//       textArea.value = profileUrl;

//       // Make sure the textarea is visible but off-screen
//       textArea.style.position = 'absolute';
//       textArea.style.left = '-9999px';
//       textArea.style.top = '0';
//       textArea.setAttribute('readonly', '');
//       textArea.style.fontSize = '12pt';

//       document.body.appendChild(textArea);

//       // Select the text
//       if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
//         // iOS specific selection
//         textArea.contentEditable = true;
//         textArea.readOnly = false;
//         const range = document.createRange();
//         range.selectNodeContents(textArea);
//         const sel = window.getSelection();
//         sel.removeAllRanges();
//         sel.addRange(range);
//         textArea.setSelectionRange(0, 999999);
//       } else {
//         textArea.select();
//         textArea.setSelectionRange(0, 999999);
//       }

//       const successful = document.execCommand('copy');
//       document.body.removeChild(textArea);

//       if (successful) {
//         setCopySuccess(true);
//         setTimeout(() => setCopySuccess(false), 2000);
//         return;
//       }
//     } catch (err) {
//       console.log('execCommand fallback failed, using manual method...');
//     }

//     // Method 3: Manual copy instruction (no error throwing)
//     setCopySuccess(false);
//     if (window.prompt) {
//       const userCopy = window.prompt('Copy this link:', profileUrl);
//     } else {
//       // alert(`Please copy this link: ${profileUrl}`);
//     }
//   };

//   const handleWhatsAppShare = () => {
//     const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + profileUrl)}`;
//     window.open(whatsappUrl, '_blank');
//   };

//   const handleInstagramShare = () => {
//     // Try to open Instagram app first, fallback to web
//     const instagramUrl = `https://www.instagram.com/`;
//     window.open(instagramUrl, '_blank');

//     // Copy link immediately without waiting
//     handleCopyLink();
//   };

//   const handleInstagramMessageShare = () => {
//     // Try to open Instagram Direct messages
//     const instagramDirectUrl = `https://www.instagram.com/direct/inbox/`;
//     window.open(instagramDirectUrl, '_blank');

//     // Copy link immediately without waiting
//     handleCopyLink();
//   };

//   const handleFacebookShare = () => {
//     const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`;
//     window.open(facebookUrl, '_blank');
//   };

//   const handleLinkedInShare = () => {
//     const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`;
//     window.open(linkedinUrl, '_blank');
//   };

//   const handleEmailShare = () => {
//     const subject = encodeURIComponent(`Check out ${userDetails?.user?.name || userDetails?.user?.username}'s profile`);
//     const body = encodeURIComponent(`${shareText}\n\n${profileUrl}`);

//     // Try different email approaches
//     if (navigator.userAgent.includes('Mobile')) {
//       // For mobile devices, try the mailto protocol
//       const emailUrl = `mailto:?subject=${subject}&body=${body}`;
//       window.location.href = emailUrl;
//     } else {
//       // For desktop, try to detect and use the default email client
//       try {
//         const emailUrl = `mailto:?subject=${subject}&body=${body}`;
//         const link = document.createElement('a');
//         link.href = emailUrl;
//         link.click();
//       } catch (error) {
//         // Fallback: copy to clipboard and show instructions
//         const emailContent = `Subject: ${decodeURIComponent(subject)}\n\n${decodeURIComponent(body)}`;
//         navigator.clipboard.writeText(emailContent).then(() => {
//           alert('Email content copied to clipboard! You can paste it in your preferred email application.');
//         }).catch(() => {
//           alert(`Please copy this and send via email:\n\nSubject: ${decodeURIComponent(subject)}\n\n${decodeURIComponent(body)}`);
//         });
//       }
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} showCloseButton={false}>
//       <div className="flex flex-col w-full max-w-sm mx-auto bg-white rounded-lg shadow-lg m-4">
//         {/* Header */}
//         <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-white rounded-t-lg">
//           <h2 className="text-xl font-bold text-black">Share Profile</h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//             type="button"
//             aria-label="Close modal"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-5 space-y-4">
//           {/* Profile Preview */}
//           <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
//             <div className="w-12 h-12 rounded-full bg-[#AF65E6] border-2 border-yellow-400 p-1 flex-shrink-0">
//               <Image
//                 unoptimized
//                 src={userDetails?.user?.avatar || "/kuku-suit 2.png"}
//                 width={40}
//                 height={40}
//                 className="w-full h-full rounded-full object-cover"
//                 alt="Profile"
//               />
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-semibold text-black truncate">
//                 {userDetails?.user?.name || userDetails?.user?.username}
//               </p>
//               <p className="text-xs text-gray-500 truncate">
//                 @{userDetails?.user?.username}
//               </p>
//             </div>
//           </div>

//           {/* Share Options */}
//           <div className="space-y-3">
//             <label className="text-sm font-medium text-gray-700">Share via</label>

//             {/* Social Media Grid */}
//             <div className="grid grid-cols-2 gap-3">
//               {/* WhatsApp */}
//               <button
//                 onClick={handleWhatsAppShare}
//                 className="flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
//               >
//                 <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
//                   <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
//                   </svg>
//                 </div>
//                 <span className="text-sm font-medium text-gray-700 group-hover:text-green-700">WhatsApp</span>
//               </button>

//               {/* Instagram */}
//               <button
//                 onClick={handleInstagramShare}
//                 className="flex items-center space-x-3 p-3 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors group"
//               >
//                 <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
//                   <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
//                   </svg>
//                 </div>
//                 <span className="text-sm font-medium text-gray-700 group-hover:text-pink-700">Instagram</span>
//               </button>

//               {/* Instagram Messages */}
//               <button
//                 onClick={handleInstagramMessageShare}
//                 className="flex items-center space-x-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group"
//               >
//                 <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center">
//                   <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.975 18.627 0 12 0zm1.193 14.963l-3.056-3.259-5.963 3.259L10.733 8.1l3.13 3.259L19.794 8.1l-6.601 6.863z"/>
//                   </svg>
//                 </div>
//                 <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">IG Messages</span>
//               </button>

//               {/* Facebook */}
//               <button
//                 onClick={handleFacebookShare}
//                 className="flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
//               >
//                 <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
//                   <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
//                   </svg>
//                 </div>
//                 <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">Facebook</span>
//               </button>

//               {/* LinkedIn */}
//               <button
//                 onClick={handleLinkedInShare}
//                 className="flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
//               >
//                 <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
//                   <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
//                   </svg>
//                 </div>
//                 <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">LinkedIn</span>
//               </button>

//               {/* Email */}
//               <button
//                 onClick={handleEmailShare}
//                 className="flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
//               >
//                 <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
//                   <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                   </svg>
//                 </div>
//                 <span className="text-sm font-medium text-gray-700 group-hover:text-gray-700">Email</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default ShareModal;

"use client";
import React, { useState } from "react";
import Image from "next/image";
import Modal from "./Modal";

// Add this to your ProfileSection component imports:
// import ShareModal from "./ShareModal";

const ShareModal = ({ isOpen, onClose, userDetails }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  // Generate profile URL (you can modify this based on your routing)
  const profileUrl = `${window.location.origin}/profile/${
    userDetails?.user?.username || userDetails?.user?._id
  }`;

  const shareText = `Check out ${
    userDetails?.user?.name || userDetails?.user?.username
  }'s profile on Kuku!`;

  const handleCopyLink = async () => {
    // Method 1: Try modern clipboard API if document is focused
    if (document.hasFocus() && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(profileUrl);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
        return;
      } catch (err) {
        console.log(
          "Clipboard API not available or failed, trying fallback..."
        );
      }
    }

    // Method 2: Try execCommand fallback
    try {
      const textArea = document.createElement("textarea");
      textArea.value = profileUrl;

      // Make sure the textarea is visible but off-screen
      textArea.style.position = "absolute";
      textArea.style.left = "-9999px";
      textArea.style.top = "0";
      textArea.setAttribute("readonly", "");
      textArea.style.fontSize = "12pt";

      document.body.appendChild(textArea);

      // Select the text
      if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
        // iOS specific selection
        textArea.contentEditable = true;
        textArea.readOnly = false;
        const range = document.createRange();
        range.selectNodeContents(textArea);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        textArea.setSelectionRange(0, 999999);
      } else {
        textArea.select();
        textArea.setSelectionRange(0, 999999);
      }

      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);

      if (successful) {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
        return;
      }
    } catch (err) {
      console.log("execCommand fallback failed");
    }

    // Method 3: Silent failure - no alerts or prompts
    setCopySuccess(false);
    console.log("All copy methods failed silently");
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      shareText + " " + profileUrl
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleInstagramShare = () => {
    // Try to open Instagram app first, fallback to web
    const instagramUrl = `https://www.instagram.com/`;
    window.open(instagramUrl, "_blank");

    // Copy link immediately without waiting
    handleCopyLink();
  };

  const handleInstagramMessageShare = () => {
    // Try to open Instagram Direct messages
    const instagramDirectUrl = `https://www.instagram.com/direct/inbox/`;
    window.open(instagramDirectUrl, "_blank");

    // Copy link immediately without waiting
    handleCopyLink();
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      profileUrl
    )}`;
    window.open(facebookUrl, "_blank");
  };

  const handleLinkedInShare = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      profileUrl
    )}`;
    window.open(linkedinUrl, "_blank");
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(
      `Check out ${
        userDetails?.user?.name || userDetails?.user?.username
      }'s profile`
    );
    const body = encodeURIComponent(`${shareText}\n\n${profileUrl}`);

    // Try different email approaches
    if (navigator.userAgent.includes("Mobile")) {
      // For mobile devices, try the mailto protocol
      const emailUrl = `mailto:?subject=${subject}&body=${body}`;
      window.location.href = emailUrl;
    } else {
      // For desktop, try to detect and use the default email client
      try {
        const emailUrl = `mailto:?subject=${subject}&body=${body}`;
        const link = document.createElement("a");
        link.href = emailUrl;
        link.click();
      } catch (error) {
        // Silent fallback: just copy to clipboard without showing alerts
        const emailContent = `Subject: ${decodeURIComponent(
          subject
        )}\n\n${decodeURIComponent(body)}`;
        navigator.clipboard.writeText(emailContent).catch(() => {
          console.log("Email content could not be copied");
        });
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton={false}>
      <div className="flex flex-col w-full max-w-sm mx-auto bg-white rounded-lg shadow-lg m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-white rounded-t-lg">
          <h2 className="text-xl font-bold text-black">Share Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            type="button"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Profile Preview */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 rounded-full bg-[#AF65E6] border-2 border-yellow-400 p-1 flex-shrink-0">
              <Image
                unoptimized
                src={userDetails?.user?.avatar || "/kuku_logo.svg"}
                width={40}
                height={40}
                className="w-full h-full rounded-full object-cover"
                alt="Profile"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-black truncate">
                {userDetails?.user?.name || userDetails?.user?.username}
              </p>
              <p className="text-xs text-gray-500 truncate">
                @{userDetails?.user?.username}
              </p>
            </div>
          </div>

          {/* Share Options */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              Share via
            </label>

            {/* Social Media Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* WhatsApp */}
              <button
                onClick={handleWhatsAppShare}
                className="flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
              >
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-green-700">
                  WhatsApp
                </span>
              </button>

              {/* Instagram */}
              <button
                onClick={handleInstagramShare}
                className="flex items-center space-x-3 p-3 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors group"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-pink-700">
                  Instagram
                </span>
              </button>

              {/* Instagram Messages */}
              <button
                onClick={handleInstagramMessageShare}
                className="flex items-center space-x-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.975 18.627 0 12 0zm1.193 14.963l-3.056-3.259-5.963 3.259L10.733 8.1l3.13 3.259L19.794 8.1l-6.601 6.863z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">
                  IG Messages
                </span>
              </button>

              {/* Facebook */}
              <button
                onClick={handleFacebookShare}
                className="flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                  Facebook
                </span>
              </button>

              {/* LinkedIn */}
              <button
                onClick={handleLinkedInShare}
                className="flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
              >
                <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                  LinkedIn
                </span>
              </button>

              {/* Email */}
              <button
                onClick={handleEmailShare}
                className="flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
              >
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-700">
                  Email
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;
