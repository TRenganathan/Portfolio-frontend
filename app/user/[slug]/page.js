import React from "react";
import FloatingNavbar from "../../../components/ui/FloatingNavbar";
import Hero from "../../../components/ui/Hero";
import Approach from "../../../components/ui/Approach";
import About from "../../../components/ui/About";
import RecentProjects from "../../../components/ui/RecentProjects";
import Experience from "../../../components/ui/Experience";
import Footer from "../../../components/ui/Footer";
const UserPortfolio = () => {
  return (
    <div className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNavbar />
        <Hero />
        <About />
        <RecentProjects />
        <Experience />
        <Approach />
        <Footer />
      </div>
    </div>
  );
};

export default UserPortfolio;
