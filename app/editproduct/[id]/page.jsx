"use client";



import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EditItem from "@/components/userProfile/EditItem";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";

const Page = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      const token = JSON.parse(Cookies.get("auth"));

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${id}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data.product);
    } catch (err) {
      setError("Failed to fetch user details");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen m-0">
      <Header backgroundColor="#FFF" />
      <div
        className="bg-cover bg-center min-h-[calc(100vh-100px)] flex flex-col justify-center items-center p-4 sm:p-8 overflow-auto"
        style={{ backgroundImage: "url('kukuit_bg.png')" }}
      >
        <EditItem data={data} />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
