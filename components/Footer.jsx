"use client";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-hot-toast"; // Import toast directly like in authSlice
import { usePathname } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Popup from "./home/Popup";
import { openPopup, closePopup } from "../store/popup/popupSlice";
// Remove the import for showErrorNotification and showSuccessNotification

const Footer = () => {
  const dispatch = useDispatch();
  const isPopupOpen = useSelector((state) => state.popup.isOpen);
  const router = useRouter();
  const [message, setMessage] = useState("");
  const getAuthToken = () => {
    let token = Cookies.get("auth");
    if (token) {
      token = decodeURIComponent(token).replace(/^"|"$/g, ""); // Remove encoded quotes
    }
    return token;
  };

  const token = getAuthToken();

  const handleSendMessage = () => {
    const token = getAuthToken();

    if (!token) {
      // Replace custom notification with direct toast call
      toast.error("Please login to send a message");
      return;
    }

    if (message.trim()) {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/comp/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Now correctly formatted
        },
        body: JSON.stringify({ message }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // Replace custom notification with direct toast call
            toast.success("Message sent successfully");
            setMessage(""); // Clear the input
          } else {
            // Replace custom notification with direct toast call
            toast.error("Error sending message");
          }
        })
        .catch((error) => {
          console.error(error);
          // Replace custom notification with direct toast call
          toast.error("Error sending message");
        });
    } else {
      // Replace custom notification with direct toast call
      toast.error("Please enter a message");
    }
  };

  const handleSellNowClick = () => {
    if (!token) {
      toast.success("please login");

      setTimeout(() => {
        router.push("/login");
      }, [500]);
    } else {
      dispatch(openPopup());
    }
  };

  const handleClosePopup = () => {
    dispatch(closePopup());
  };

  return (
    <footer className="w-full mx-auto bg-[#FDE504] pt-12 pb-0">
      <div className="px-4 sm:px-8 lg:px-[71px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-16">
        <FooterColumn title="About">
          <FooterLink href="/who-we-are">Who we are ?</FooterLink>
          <FooterLink href="/how-it-works">How it works ?</FooterLink>
          <FooterLink href="/our-services-and-features">Our Services and features</FooterLink>
          <FooterLink href="/sustainability">Sustainability</FooterLink>
          <FooterLink href="/how-we-calculate-aur-carbon-footprint">How we calculate our Carbon footprint</FooterLink>
        </FooterColumn>
        <FooterColumn title="Categories">
          <FooterLink href="/mega-filter?parentCategory=Men">Men</FooterLink>
          <FooterLink href="/mega-filter?parentCategory=Women">
            Women
          </FooterLink>
          <FooterLink href="/mega-filter?parentCategory=Kid">Kids</FooterLink>
        </FooterColumn>
        <FooterColumn title="Help">
          <FooterLink href="/tips-and-tricks">How to Sell - Tips and Tricks</FooterLink>
           <FooterLink href="/payments-and-commissions">Payments &amp; Commission Structure</FooterLink>
          <FooterLink href="/return-cancellation-refund">Return / Cancellations / Refund</FooterLink>
          <FooterLink href="/faq">FAQ</FooterLink>
        </FooterColumn>
        <FooterColumn title="Guide">
          <FooterLink href="/terms-and-conditions">Terms & Conditions</FooterLink>
          <FooterLink href="/privacy-policy">KuKu Privacy Policy</FooterLink>
          <FooterLink href="/all-policy">Policies</FooterLink>
          <FooterLink href="/seller-education-guidelines">Seller Education</FooterLink>
        </FooterColumn>
        <FooterColumn title="Connect">
          <FooterLink href="#">Contact Us</FooterLink>
          <FooterLink href="#">Social Media</FooterLink>
        </FooterColumn>

        <FooterColumn title="Sell with Us">
          <p
            onClick={handleSellNowClick}
            className="text-base font-normal font-karla text-[#6a6a6a] hover:text-[#e4086f]"
          >
            Sell Now
          </p>
        </FooterColumn>
      </div>

      <div className="px-4 sm:px-8 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Image
              src="/kuku_logo.svg"
              width={56}
              height={61}
              alt="KUKU logo"
            />
            <h1 className="text-black text-3xl font-bold font-palanquin_dark">
              KUKU
            </h1>
          </div>
          <div className="flex gap-4">
            <Link href={"https://www.facebook.com"} target="_blank">
              <SocialIcon src="/fb_logo.svg" alt="Facebook" />
            </Link>
            <Link href={"https://www.x.com"} target="_blank">
              <SocialIcon src="/x_logo.svg" alt="X" />
            </Link>
            <Link href={"https://www.linkedin.com"} target="_blank">
              <SocialIcon src="/linkedin.png" alt="LinkedIn" />
            </Link>
            <Link href={"https://www.instagram.com"} target="_blank">
              <SocialIcon src="/insta_logo.svg" alt="Instagram" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <p className="text-[#6a6a6a] text-sm font-extrabold font-karla uppercase">
            Write your message to us
          </p>
          <div className="w-fit max-w-md flex flex-col sm:flex-row items-center gap-2 p-2 rounded-[20px] border border-[#393939]">
            <input
              type="text"
              placeholder="Enter your message"
              className="flex-grow p-2 bg-transparent text-[#383838] text-sm font-normal font-karla outline-none lg:w-[500px]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={handleSendMessage}
              className="w-full sm:w-auto px-6 py-3 bg-[#e4086f] rounded-[15px] text-[#fde504] text-base font-bold font-karla"
            >
              Send
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center md:items-end">
          <Link href={"#"} target="_blank">
            <Image
              src="/googlePlay.png"
              width={143}
              height={41}
              alt="Google Play"
            />
          </Link>
          <Link href={"#"} target="_blank">
            <Image
              src="/appStoreFooter.png"
              width={143}
              height={41}
              alt="App Store"
            />
          </Link>
        </div>
      </div>

      <div className="bg-[#E4086F] px-4 sm:px-8 lg:px-16 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <div className="flex gap-2 justify-center sm:justify-start">
            <PaymentIcon src="/paypal.svg" />
            <PaymentIcon src="/fontisto_american-express.svg" />
            <PaymentIcon src="/mastercard.svg" />
            <PaymentIcon src="/fontisto_visa.svg" />
          </div>
          <p className="text-white text-xs font-normal font-karla text-center">
            Copyright © 2024 Kuku. All Rights Reserved.
          </p>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
            <button className="px-3 py-1 bg-white rounded-full flex items-center gap-2">
              <Image src="/download-cloud.svg" width={18} height={18} alt="" />
              <span className="text-[#2f2f2f] text-xs font-bold font-karla">
                Download Kuku
              </span>
            </button>
            <button className="flex items-center gap-1">
              <Image src="/globe.svg" width={18} height={18} alt="" />
              <span className="text-white text-xs font-bold font-karla">
                Change Region
              </span>
              <Image src="/chevron-down.svg" width={16} height={16} alt="" />
            </button>
          </div>
        </div>
      </div>
      <Popup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </footer>
  );
};

const FooterColumn = ({ title, children }) => (
  <div className="flex flex-col gap-2.5">
    <h2 className="text-[#202020] text-sm font-extrabold font-karla uppercase">
      {title}
    </h2>
    {children}
  </div>
);

const FooterLink = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <a
      href={href}
      className={`text-base font-normal font-karla ${
        isActive ? "text-[#e4086f]" : "text-[#6a6a6a]"
      } hover:text-[#e4086f]`}
    >
      {children}
    </a>
  );
};

const SocialIcon = ({ src, alt }) => (
  <Image unoptimized src={src} width={24} height={24} alt={alt} />
);

const PaymentIcon = ({ src }) => (
  <Image src={src} width={35} height={23} alt="Payment method" />
);

export default Footer;
