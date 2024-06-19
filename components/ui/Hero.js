"use client";
import React, { useEffect, useState } from "react";
import { Spotlight } from "./SpotLight";
import MagicButton from "../MagicButton";
import { FaLocationArrow } from "react-icons/fa6";
import { TextGenerateEffect } from "./TextGenerateEffect";
import { motion, useAnimate } from "framer-motion";
import ModelDialog from "../ModelDialog";
import axios from "axios";
import { getDecryptedCookie } from "../../lib/cookiesData/cookiesdata";
import { usePathname } from "next/navigation";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export default function Hero() {
  const [open, setOpen] = useState(false);
  const [bannerTitle, setBannerTitle] = useState(
    "Transforming Concepts into Seamless User Experiences"
  );
  const [bannerDescription, setBannerDescription] = useState(
    "Hi! I'm Ranganath, a Next.js Developer in India."
  );
  const [bannertagLine, setBannertagLine] = useState(
    "Dynamic Web Magic with Next.js"
  );
  const [heroContent, setHeroContent] = useState();
  const getCookies = getDecryptedCookie("userData");
  const userData = getCookies ? JSON.parse(getCookies) : null;
  const pathname = usePathname();

  const userIdFromPath = pathname?.split("/user/")[1];
  // -------------------------** API CALLS **----------------------------- //

  const addHeroContent = async () => {
    const newdata = {
      title: bannerTitle,
      description: bannerDescription,
      tagLine: bannertagLine,
      token: userData.accessToken,
    };
    try {
      const headers = {
        Authorization: `Bearer ${userData.accessToken}`,
      };
      const { data } = await axios.post(
        `${BASE_URL}/hero/add/userId/${userIdFromPath}`,
        newdata,
        {
          headers,
        }
      );
      if (data) {
        getHeroContent();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getHeroContent = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/hero/userId/${userIdFromPath}`
      );

      if (data.data) {
        setHeroContent(data.data);
        setBannerDescription(data.data.description);
        setBannerTitle(data.data.title);
        setBannertagLine(data.data.tagLine);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (userIdFromPath) {
      getHeroContent();
    }
    if (userData) {
      // addHeroContent();
    }
  }, []);
  // -------------------------** END OF API CALLS **----------------------------- //
  const handleSumbit = (e) => {
    if (userData) {
      addHeroContent();
      e.preventDefault();
      setOpen(false);
    }
  };
  const handleEditHero = () => {
    getHeroContent();
    setOpen(true);
    if (userData) {
      getHeroContent();
    }
  };
  const handelModelClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="pb-20 pt-36">
        <div>
          <Spotlight
            className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
            fill="white"
          />
          <Spotlight
            className="h-[80vh] w-[50vw] top-10 left-full"
            fill="purple"
          />
          <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
        </div>
        <div
          className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
        >
          <div
            className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
          />
        </div>

        <div className="flex justify-center relative my-20 z-10">
          <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center relative">
            <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
              {pathname == "/"
                ? "Dynamic Web Magic with Next.js"
                : heroContent?.tagLine
                ? heroContent?.tagLine
                : "Dynamic Web Magic with Next.js"}
            </p>
            {userData && userData?.userId == userIdFromPath && (
              <button
                className="absolute right-0 top-0 bg-purple text-white p-1 rounded"
                onClick={handleEditHero}
              >
                <MdOutlineEdit />
              </button>
            )}

            {/**
             *  Link: https://ui.aceternity.com/components/text-generate-effect
             *
             *  change md:text-6xl, add more responsive code
             */}
            <TextGenerateEffect
              words={
                pathname == "/"
                  ? "Transforming Concepts into Seamless User Experiences"
                  : heroContent?.title
                  ? heroContent?.title
                  : "Transforming Concepts into Seamless User Experiences"
              }
              className="text-center text-[40px] md:text-5xl lg:text-6xl"
            />

            <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl dark:text-white light:text-black">
              {pathname == "/"
                ? "Hi! I'm Ranganath, a Next.js Developer in India."
                : heroContent?.description
                ? heroContent.description
                : "Hi! I'm Ranganath, a Next.js Developer in India."}
            </p>
            <a href="#about">
              <MagicButton
                title="Show my work"
                icon={<FaLocationArrow />}
                position="right"
              />
            </a>
          </div>
        </div>
      </div>
      <ModelDialog
        open={open}
        setOpen={setOpen}
        setBannerTitle={setBannerTitle}
        setBannerDescription={setBannerDescription}
        setBannertagLine={setBannertagLine}
        onSubmit={handleSumbit}
        bannertagLine={bannertagLine}
        bannerDescription={bannerDescription}
        bannerTitle={bannerTitle}
        handelModelClose={handelModelClose}
      />
    </>
  );
}
