"use client";
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import DetailsSection from '@/components/userProfile/DetailsSection';
import ProfileSection from '@/components/userProfile/ProfileSection';
import { useRouter } from 'next/navigation';
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Cookies from 'js-cookie';

const Page = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('auth');
    if (!token) {
      // If no token, redirect to homepage
      router.push('/');
      return;
    }

    if (id) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      const token = JSON.parse(Cookies.get('auth'));

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/details/${id}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data.profile);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // If unauthorized, clear token and redirect to homepage
        Cookies.remove('auth');
        router.push('/');
      } else {
        setError("Failed to fetch user details");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Header />
      <ProfileSection user={data} />
      <DetailsSection data={data} />
      <Footer />
    </>
  );
};

export default Page;
