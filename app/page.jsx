"use client";
import React, { useEffect } from "react";
import Hero from "../components/ui/Hero";
import FloatingNavbar from "../components/ui/FloatingNavbar";
import About from "../components/ui/About";
import RecentProjects from "../components/ui/RecentProjects";
import Experience from "../components/ui/Experience";
import Approach from "../components/ui/Approach";
import Footer from "../components/ui/Footer";
import { useSession } from "next-auth/react";
import { setEncryptedCookie } from "../lib/cookiesData/cookiesdata";
const Page = () => {
  const { data: session, status } = useSession();

  if (session) {
    setEncryptedCookie("userData", JSON.stringify(session?.user));
  }
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNavbar />
        <Hero />
        <About />
        <RecentProjects />
        <Experience />
        <Approach />
        <Footer />
      </div>
    </main>
  );
};

export default Page;
