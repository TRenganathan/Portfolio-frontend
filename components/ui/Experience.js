"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./MovingBorders";
import { FaLocationDot } from "react-icons/fa6";
import { MdDeleteForever, MdOutlineEdit, MdWorkHistory } from "react-icons/md";
import MagicButton from "../MagicButton";
import Link from "next/link";
import { BASE_URL, workExperience } from "../../data";
import axios from "axios";
import { usePathname } from "next/navigation";
import { getDecryptedCookie } from "../../lib/cookiesData/cookiesdata";
import ExperienceForm from "./../ExperienceForm";
const Experience = () => {
  const getCookies = getDecryptedCookie("userData");
  const userData = getCookies ? JSON.parse(getCookies) : null;
  const pathname = usePathname();
  const userIdFromPath = pathname?.split("/user/")[1];
  const [open, setOpen] = useState(false);
  const [userworkExperience, setUserWorkExperience] = useState([]);
  const [particularExperience, setParticularExperience] = useState([]);
  const [swiftMode, setSwiftMode] = useState("add");
  const [isDeleteModel, setIsDeleteModel] = useState(false);
  // ***************************************** API **************************************************** //
  const getExperience = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/experience/userId/${userIdFromPath}`
      );
      if (data) {
        setUserWorkExperience(data.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (userIdFromPath) {
      getExperience();
    }
  }, []);
  // ***************************************** END OF API **************************************************** //
  const handleClickOpenModel = () => {
    setOpen(true);
    setSwiftMode("add");
    setIsDeleteModel(false);
  };
  const handleClickEditExp = (exp, type) => {
    setParticularExperience(exp);
    setSwiftMode(type);
    setOpen(true);
  };
  const handleExperience = (item) => {
    setIsDeleteModel(true);
    setParticularExperience(item);
    setOpen(true);
  };
  return (
    <div className="py-20 w-full relative" id="experience">
      {userData && userData?.userId == userIdFromPath && (
        <button
          className="absolute right-0 top-[92px] bg-purple text-white p-1 rounded"
          onClick={handleClickOpenModel}
        >
          <MdOutlineEdit />
        </button>
      )}
      <h1 className="heading">
        My <span className="text-purple">work experience</span>
      </h1>

      <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
        {pathname != "/" &&
          userworkExperience?.map((card, index) => (
            <Button
              key={index}
              duration={Math.floor(Math.random() * 10000) + 10000}
              borderRadius="1.75rem"
              style={{
                //   add these two
                //   you can generate the color from here https://cssgradient.io/
                background: "rgb(4,7,29)",
                backgroundColor:
                  "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
                // add this border radius to make it more rounded so that the moving border is more realistic
                borderRadius: `calc(1.75rem* 0.96)`,
              }}
              className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
              {userData && userData?.userId == userIdFromPath && (
                <>
                  <button
                    className="absolute right-3 top-12 bg-purple text-white p-1 rounded"
                    onClick={() => handleClickEditExp(card, "edit")}
                  >
                    <MdOutlineEdit />
                  </button>
                  <button
                    className="absolute right-3 top-5 bg-purple text-red p-1 rounded z-[11]"
                    onClick={() => handleExperience(card)}
                  >
                    <MdDeleteForever />
                  </button>
                </>
              )}
              <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
                <img
                  src={index == 1 ? "/exp1.svg" : "/exp4.svg"}
                  // alt={card.thumbnail}
                  className="lg:w-32 md:w-20 w-16"
                />
                <div className="lg:ms-5">
                  <h1 className="text-start text-xl md:text-2xl font-bold">
                    {card.title + "-" + card.companyName}
                  </h1>
                  <div className="flex justify-between gap-2 flex-wrap mt-[1rem] ">
                    <div className="flex gap-3 items-center text-purple">
                      <FaLocationDot />
                      <span>
                        {" "}
                        {card.location ? card.location : "Coimbatore"}
                      </span>
                    </div>
                    <div className="flex gap-3 items-center text-purple">
                      <MdWorkHistory />
                      <span>{card.duration ? card.duration : "-"}</span>
                    </div>
                  </div>
                  <p className="text-start text-white-100 mt-3 font-semibold line-clamp-2">
                    {card.description}
                  </p>
                </div>
              </div>
            </Button>
          ))}
        {pathname == "/" &&
          workExperience?.map((card, index) => (
            <Button
              key={index}
              duration={Math.floor(Math.random() * 10000) + 10000}
              borderRadius="1.75rem"
              style={{
                //   add these two
                //   you can generate the color from here https://cssgradient.io/
                background: "rgb(4,7,29)",
                backgroundColor:
                  "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
                // add this border radius to make it more rounded so that the moving border is more realistic
                borderRadius: `calc(1.75rem* 0.96)`,
              }}
              className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
              {userData && userData?.userId == userIdFromPath && (
                <button
                  className="absolute right-3 top-3 bg-purple text-white p-1 rounded"
                  onClick={() => handleClickEditExp(card, "edit")}
                >
                  <MdOutlineEdit />
                </button>
              )}
              <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
                <img
                  src={index == 1 ? "/exp1.svg" : "/exp4.svg"}
                  // alt={card.thumbnail}
                  className="lg:w-32 md:w-20 w-16"
                />
                <div className="lg:ms-5">
                  <h1 className="text-start text-xl md:text-2xl font-bold">
                    {card.title}
                  </h1>
                  <div className="flex justify-between gap-2 flex-wrap mt-[1rem] ">
                    <div className="flex gap-3 items-center text-purple">
                      <FaLocationDot />
                      <span>
                        {" "}
                        {card.location ? card.location : "Coimbatore"}
                      </span>
                    </div>
                    <div className="flex gap-3 items-center text-purple">
                      <MdWorkHistory />
                      <span>{card.duration ? card.duration : "-"}</span>
                    </div>
                  </div>
                  <p className="text-start text-white-100 mt-3 font-semibold line-clamp-3">
                    {card.description}
                  </p>
                </div>
              </div>
            </Button>
          ))}
      </div>
      <div className="flex items-center justify-center">
        <Link href={`/user/profile/${userIdFromPath}/#myexperience`}>
          <MagicButton
            title="Read More"
            icon={<MdWorkHistory />}
            position="right"
          />
        </Link>
      </div>

      <ExperienceForm
        userId={userIdFromPath}
        open={open}
        setOpen={setOpen}
        getExperience={getExperience}
        particularExperience={particularExperience}
        setParticularExperience={setParticularExperience}
        swiftMode={swiftMode}
        setSwiftMode={setSwiftMode}
        setIsDeleteModel={setIsDeleteModel}
        isDeleteModel={isDeleteModel}
      />
    </div>
  );
};

export default Experience;
