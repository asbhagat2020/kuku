"use client"
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import DetailsSection from '@/components/userProfile/DetailsSection'
import ProfileSection from '@/components/userProfile/ProfileSection'
import React from 'react'

const page = () => {
  return (
    <>
    <Header/>
    <ProfileSection/>
    <DetailsSection/>
    <Footer/>
    </>
  )
}

export default page