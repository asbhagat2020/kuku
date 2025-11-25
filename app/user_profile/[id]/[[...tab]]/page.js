



"use client";

import { DetailsSection } from "@/components/userProfile/DetailsSection";
import ProfileSection from "@/components/userProfile/ProfileSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function UserProfileTabPage() {
  const { id, tab } = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Agar tab nahi hai → default "selling" kar do
  useEffect(() => {
    if (id && !tab) {
      router.replace(`/user_profile/${id}/selling`);
      return;
    }
  }, [id, tab, router]);

  // Agar tab hai toh proceed
  const mainTab = Array.isArray(tab) ? tab[0] : null;
  const subTab = Array.isArray(tab) && tab.length > 1 ? tab[1] : null;

  useEffect(() => {
    const token = Cookies.get("auth");
    if (!token) {
      router.push("/");
      return;
    }
    if (id) fetchUser(token);
  }, [id, router]);

  const fetchUser = async (tokenString) => {
    try {
      const token = JSON.parse(tokenString);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/details/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData(res.data.profile);
    } catch (err) {
      if (err.response?.status === 401) {
        Cookies.remove("auth");
        router.push("/");
      } else {
        setError("User not found");
      }
    } finally {
      setLoading(false);
    }
  };

  // Agar tab nahi hai aur redirect ho raha hai → loading dikhao
  if (!tab) {
    return (
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-white">
        <div className="w-16 h-16 border-4 border-[#EDA702] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-white">
        <div className="w-16 h-16 border-4 border-[#EDA702] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !data) {
    return <div className="text-center mt-20 text-red-500 text-2xl">{error || "User not found"}</div>;
  }

  return (
    <>
      <Header />
      <ProfileSection user={data} />
      <DetailsSection data={data} initialMainTab={mainTab} initialSubTab={subTab} />
      <Footer />
    </>
  );
}