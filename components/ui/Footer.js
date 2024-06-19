"use client";
import { FaLocationArrow } from "react-icons/fa6";

import MagicButton from "../MagicButton";
import Link from "next/link";
import { BASE_URL, socialMedia } from "../../data";
import FooterForm from "./../FooterForm";
import { useEffect, useState } from "react";
import { getDecryptedCookie } from "../../lib/cookiesData/cookiesdata";
import { usePathname } from "next/navigation";
import { MdOutlineEdit } from "react-icons/md";
import axios from "axios";
import { TextGenerateEffect } from "./TextGenerateEffect";
const Footer = () => {
  const getCookies = getDecryptedCookie("userData");
  const userData = getCookies ? JSON.parse(getCookies) : null;
  const pathname = usePathname();
  const userIdFromPath = pathname?.split("/user/")[1];
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState(
    "Ready to take your digital presence to the next level?"
  );
  const [description, setDescription] = useState(
    "Reach out to me today and let's discuss how I can help you achieve your goals."
  );
  const [email, setEmail] = useState("");
  const [copyRight, setCopyRight] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [naukuri, setNaukuri] = useState("");
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [footerContent, setFooterContent] = useState();
  const handleClickOpenModel = () => {
    setOpen(true);
  };

  const getFooterContent = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/footer/userId/${userIdFromPath}`
      );

      if (data) {
        setFooterContent(data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (footerContent) {
      setTitle(footerContent.title);
      setDescription(footerContent.description);
      setEmail(footerContent.email);
      setCopyRight(footerContent.copyRight);
      setLinkedIn(footerContent.linkedIn);
      setNaukuri(footerContent.naukuri);
      setGithub(footerContent.github);
      setTwitter(footerContent.twitter);
    }
  }, [footerContent]);
  useEffect(() => {
    if (userIdFromPath) {
      getFooterContent();
    }
  }, [pathname]);
  return (
    <footer className="w-full pt-20 pb-10 relative " id="contact">
      {userData && userData?.userId == userIdFromPath && (
        <button
          className="absolute right-0 top-[66px] bg-purple text-white p-1 rounded pointer z-[11]"
          onClick={handleClickOpenModel}
        >
          <MdOutlineEdit />
        </button>
      )}
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50 "
        />
      </div>
      {pathname != "/" && (
        <div className="flex flex-col items-center">
          <TextGenerateEffect
            words={
              footerContent?.title
                ? footerContent?.title
                : " Ready to take your digital presence to the next level? "
            }
            className=" text-center text-[35px] md:text-5xl  lg:max-w-[50vw]"
          />
          <p className="text-white-200 md:mt-10 my-5 text-center">
            {footerContent?.description
              ? footerContent?.description
              : "Reach out to me today and let's discuss how I can help you achieve your goals."}
          </p>
          <a
            href={
              footerContent?.email
                ? `mailto:${footerContent?.email}`
                : `mailto:${userData?.email}`
            }
          >
            <MagicButton
              title="Let's get in touch"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>
      )}

      {pathname == "/" && (
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <h1 className="heading lg:max-w-[45vw]">
              Ready to take <span className="text-purple">your</span> digital
              presence to the next level?
            </h1>
            <p className="text-white-200 md:mt-10 my-5 text-center">
              Reach out to me today and let&apos;s discuss how I can help you
              achieve your goals.
            </p>
            <a href="mailto:trnathan98@gmail.com">
              <MagicButton
                title="Let's get in touch"
                icon={<FaLocationArrow />}
                position="right"
              />
            </a>
          </div>
        </div>
      )}
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          {footerContent?.copyRight
            ? footerContent?.copyRight
            : "Copyright © 2024 "}
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {pathname != "/" && (
            <>
              {footerContent?.linkedIn && (
                <Link
                  title={footerContent?.linkedIn}
                  href={footerContent?.linkedIn}
                  target="_blank"
                  className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
                >
                  <img src={"/link.svg"} alt="icons" width={20} height={20} />
                </Link>
              )}
              {footerContent?.github && (
                <Link
                  title={footerContent?.github}
                  href={footerContent?.github}
                  target="_blank"
                  className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
                >
                  <img src={"/git.svg"} alt="icons" width={20} height={20} />
                </Link>
              )}
              {footerContent?.twitter && (
                <Link
                  title={footerContent?.twitter}
                  href={footerContent?.twitter}
                  target="_blank"
                  className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
                >
                  <img src={"/twit.svg"} alt="icons" width={20} height={20} />
                </Link>
              )}
            </>
          )}

          {pathname == "/" &&
            socialMedia?.map((info) => (
              <Link
                title={info.link}
                href={info.link}
                target="_blank"
                key={info.id}
                className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
              >
                <img src={info.img} alt="icons" width={20} height={20} />
              </Link>
            ))}
        </div>
      </div>
      <FooterForm
        userId={userIdFromPath}
        open={open}
        setOpen={setOpen}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        email={email}
        copyRight={copyRight}
        setCopyRight={setCopyRight}
        setEmail={setEmail}
        linkedIn={linkedIn}
        setLinkedIn={setLinkedIn}
        naukuri={naukuri}
        setNaukuri={setNaukuri}
        github={github}
        setGithub={setGithub}
        twitter={twitter}
        setTwitter={setTwitter}
        getFooterContent={getFooterContent}
      />
    </footer>
  );
};

export default Footer;
