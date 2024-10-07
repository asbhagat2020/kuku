"use client"
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import AnimationSection from '@/components/home/AnimationSection'
import Brands from '@/components/home/Brands'
import Categories from '@/components/home/Categories'
import DownloadKuku from '@/components/home/DownloadKuku'
import Hero from '@/components/home/Hero'
import MarketPlace from '@/components/home/MarketPlace'
import Selling from '@/components/home/Selling'
import StriteSection from '@/components/home/StriteSection'
import React from 'react'

const page = () => {
  return (
    <>
    <Header/>
    <Hero/>
    <MarketPlace/>
    <Selling/>
    <Categories/>
    <StriteSection/>
    <AnimationSection/>
    <Brands/>
    <DownloadKuku/>
    <Footer/>
    </>
  )
}

export default page