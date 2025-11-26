import React from "react";
import UserLayout from "../layout/UserLayout";
import HeroSection from "../components/HeroSection";
import HomeShowcase from "../components/HomeShowcase";
import TeaMoodTime from "../components/TeaMoodTime";
import TeaProcess from "../components/TeaProcess";
import CoconutProcess from "../components/CoconutProcess";
import CinnamonProcess from "../components/CinnamonProcess";
import RiceProcess from "../components/RiceProcess";
import WhyChooseUs from "../components/WhyChooseUs";
import AboutUs from "../components/AboutUs";
import TeaDegustation from "../components/TeaDegustation";
import SocialMedia from "../components/SocialMedia";
import PageBreak from "../components/PageBreak";
// import CustomImage from "../components/CustomImage";
import ContactSection from "../components/ContactSection";
import ContactFormRight from "../components/ContactFormRight";



const Home = () => {
  return (
    <UserLayout>
      <HeroSection />
      <HomeShowcase />
      <TeaMoodTime />

      <TeaProcess />
      <CoconutProcess />
      <CinnamonProcess />
      <RiceProcess />
      <TeaDegustation />
      <WhyChooseUs />
      <AboutUs />
      <PageBreak />
      <SocialMedia />
      <PageBreak />
      {/* <CustomImage /> */}
    
      <ContactFormRight />
      <PageBreak />
      <ContactSection />
      <PageBreak />
    </UserLayout>
  );
};

export default Home;
