"use client";
import { FaProjectDiagram } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineEdit, MdOutlineFileDownload, MdWork } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { IoMdTime } from "react-icons/io";
import { Meteors } from "./../../../../components/ui/meteors";
import { useEffect, useState } from "react";
import ProfileForm from "./../../../../components/ProfileModel";
import { getDecryptedCookie } from "../../../../lib/cookiesData/cookiesdata";
import { usePathname } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "../../../../data";
import { IoPlayBackCircleOutline } from "react-icons/io5";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { DownloadFile } from "../../../../components/ui/downloadFile";
import UsersList from "./../../../../components/UsersList";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
  World,
} from "../../../../components/ui/text-reveal-card";
import { Spotlight } from "../../../../components/ui/SpotLight";
const UserProfilePage = () => {
  const [open, setOpen] = useState(false);
  const getCookies = getDecryptedCookie("userData");
  const userData = getCookies ? JSON.parse(getCookies) : null;
  const pathname = usePathname();
  const userIdFromPath = pathname?.split("/user/profile/")[1];

  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState(userData?.name || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [phone, setPhone] = useState(userData?.phone || "");
  const [role, setRole] = useState(userData?.role || "");
  const [myInfo, setMyInfo] = useState("");
  const [totalProjects, setTotalProjects] = useState(
    userData?.totalProjects || 0
  );
  const [totalExperience, setTotalExperience] = useState(
    userData?.totalExperience || 0
  );
  const [currentCTC, setCurrentCTC] = useState(userData?.currentCTC || 0);
  const [expectedCTC, setExpectedCTC] = useState(userData?.expectedCTC || 0);
  const [resume, setResume] = useState(null);
  const [profileData, setProfileDta] = useState([]);
  const router = useRouter();
  const { data: session, status } = useSession();
  const getProfile = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/profile/userId/${userIdFromPath}/`,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data?.data) {
        setProfileDta(data?.data);
        setName(data?.data.name);
        setEmail(data?.data.email);
        setPhone(data?.data.phone);
        setRole(data?.data.role);
        setCurrentCTC(data?.data.currentCTC);
        setExpectedCTC(data?.data.expectedCTC);
        setTotalExperience(data?.data.totalExperience);
        setTotalProjects(data?.data.totalProjects);
        setProfileImage(data?.data?.profilePicture);
        setMyInfo(data?.data?.myInfo);
      }
    } catch (error) {}
  };
  const getResume = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/resume/userId/${userIdFromPath}`
      );
      if (data?.data) {
        setResumeURLforDownload(data?.data?.resume);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (userIdFromPath) {
      getProfile();
      getResume();
      getExperience();
    }
  }, [userIdFromPath]);

  useEffect(() => {
    if (profileData) {
      setName(profileData.name);
      setEmail(profileData.email);
      setPhone(profileData.phone);
      setRole(profileData.role);
      setCurrentCTC(profileData.currentCTC);
      setExpectedCTC(profileData.expectedCTC);
      setTotalExperience(profileData.totalExperience);
      setTotalProjects(profileData.totalProjects);
      setProfileImage(profileData?.profilePicture);
      setMyInfo(profileData?.myInfo);
    }
  }, [profileData, open]);
  const handleClickOpen = () => {
    if (userIdFromPath) {
      getProfile();
      getResume();
    }
    setOpen(true);
  };
  const handleClickBack = () => {
    if (session?.user) {
      return router.push(`/user/${session?.user.userId}`);
    }
    if (userData) {
      return router.push(`/user/${userData.userId}`);
    }
    router.push("/");
  };
  const [resumeURLforDownload, setResumeURLforDownload] = useState(null);
  const [userworkExperience, setUserWorkExperience] = useState([]);
  const handleDownload = () => {
    if (resumeURLforDownload) {
      const fileName = profileData?.name ? profileData?.name : "resume";
      DownloadFile(resumeURLforDownload, fileName);
    }
  };
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
  console.log(userworkExperience, "userworkExperience");

  function TextRevealCardPreview() {
    return (
      <div className="flex items-center justify-center bg-[#0E0E10] h-max rounded-2xl w-full">
        <TextRevealCard text="MERN Stack Developer" revealText="Web Developer">
          <TextRevealCardTitle>My Experience and Knowledge</TextRevealCardTitle>
        </TextRevealCard>
      </div>
    );
  }

  return (
    <div className="relative p-30 rounded-md  bg-black-100 overflow-x-hidden">
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
      <div className=" m-8 flex justify-between items-center">
        <IoPlayBackCircleOutline
          fontSize={"30px"}
          onClick={handleClickBack}
          className="cursor-pointer"
        />
        {userData && userData?.userId == userIdFromPath && (
          <button
            className=" flex items-center justify-end ml-auto  text-white py-[8px] px-[15px] rounded-lg    bg-gradient-to-r from-teal-500 to-blue-500"
            onClick={handleClickOpen}
          >
            <span className="pr-2">Update Profile</span>
            <MdOutlineEdit />
          </button>
        )}
      </div>
      {/* bg-[#212327]  p-[30px] */}
      <div className=" rounded-3xl m-8">
        <div className="">
          <div className=" w-full relative">
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.9] bg-red-500 rounded-full blur-3xl" />
            <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
              <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-2 w-2 text-gray-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                  />
                </svg>
              </div>
              <Meteors number={40} />
              <div className="flex flex-wrap gap-2 justify-between items-center mb-4 w-full">
                <div className="flex items-center">
                  <span className="bg-[#4beabe] block py-2 h-[35px] w-[8px] mr-[20px] rounded-sm"></span>
                  <h1 className="text-white-600 capitalize text-[30px] font-bold  text-md ">
                    My Details
                  </h1>
                </div>

                <button
                  onClick={handleDownload}
                  className="bg-[#4beabe] text-white-600 rounded py-[10px] px-[20px] flex gap-1 italic"
                >
                  <MdOutlineFileDownload style={{ fontSize: "20px" }} />
                  Download Resume
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-9 relative z-[300]">
                {/* <div className=" w-[185px] h-[180px] bg-white-100 rounded-full"> */}
                <Image
                  src={
                    profileData?.profilePicture
                      ? profileData?.profilePicture
                      : "/profile-img.jpg"
                  }
                  alt="profile-img"
                  width={185}
                  height={185}
                  className="rounded-full w-[185px] h-[180px] object-cover"
                />
                {/* </div> */}
                <div className="">
                  <h3 className="text-white font-semibold text-[25px] mb-2 italic">
                    {profileData?.name
                      ? profileData?.name
                      : userData?.name
                      ? userData?.name
                      : "Name"}
                  </h3>
                  <div className="flex flex-wrap gap-[35px]">
                    <div>
                      <span className="text-[#afb0b1] font-sm font-semibold text-[18px] italic mb-1 inline-block">
                        Role
                      </span>
                      <h4 className="text-[20px] font-bold italic">
                        {profileData?.role ? profileData?.role : "-"}
                      </h4>
                    </div>
                    <div>
                      <span className="text-[#afb0b1] font-sm font-semibold text-[18px] italic mb-1 inline-block">
                        Phone Number
                      </span>
                      <h4 className="text-[20px] font-bold italic">
                        {profileData?.phone ? profileData.phone : "-"}
                      </h4>
                    </div>
                    <div>
                      <span className="text-[#afb0b1] font-sm font-semibold text-[18px] italic mb-1 inline-block">
                        Email Address
                      </span>
                      <h4 className="text-[20px] font-bold italic">
                        {profileData?.email
                          ? profileData?.email
                          : userData?.email
                          ? userData?.email
                          : "-"}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 items-center mt-10">
                <div className="bg-[#37393d] p-4 w-max rounded-[20px] min-w-[290px]">
                  <span className="text-[#afb0b1] font-sm font-semibold text-[20px] italic mb-1 inline-block">
                    Total Experience
                  </span>
                  <div className="flex gap-2 flex-wrap items-center text-md capitalize">
                    <MdWork style={{ color: "#afb0b1" }} />{" "}
                    {profileData?.totalExperience
                      ? profileData?.totalExperience
                      : "-"}
                  </div>
                </div>
                <div className="bg-[#37393d] p-4 w-max rounded-[20px] min-w-[290px]">
                  <span className="text-[#afb0b1] font-sm font-semibold text-[20px] italic mb-1 inline-block">
                    Total Projects
                  </span>
                  <div className="flex gap-2 flex-wrap items-center text-md capitalize">
                    <FaProjectDiagram style={{ color: "#afb0b1" }} />{" "}
                    {profileData.totalProjects
                      ? profileData.totalProjects
                      : "- "}
                    {" Projects"}
                  </div>
                </div>
                <div className="bg-[#37393d] p-4 w-max rounded-[20px] min-w-[290px]">
                  <span className="text-[#afb0b1] font-sm font-semibold text-[20px] italic mb-1 inline-block">
                    Current CTC
                  </span>
                  <div className="flex gap-2 flex-wrap items-center text-md">
                    <RiMoneyRupeeCircleFill style={{ color: "#afb0b1" }} />{" "}
                    {profileData?.currentCTC ? profileData?.currentCTC : "-"}
                  </div>
                </div>
                <div className="bg-[#37393d] p-4 w-max rounded-[20px] min-w-[290px]">
                  <span className="text-[#afb0b1] font-sm font-semibold text-[20px] italic mb-1 inline-block">
                    Expected CTC
                  </span>
                  <div className="flex gap-2 flex-wrap items-center text-md">
                    <RiMoneyRupeeCircleFill style={{ color: "#afb0b1" }} /> 5
                    {profileData?.expectedCTC ? profileData?.expectedCTC : "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" rounded-3xl m-8">
        <div className=" w-full relative">
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-teal-500 to-pink-500 transform scale-[0.9] bg-red-500 rounded-full blur-3xl" />
          <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
            <div className="flex items-center mb-8">
              <span className="bg-[#4beabe] block py-2 h-[35px] w-[8px] mr-[20px] rounded-sm"></span>
              <h1 className="text-white-600 capitalize text-[30px] font-bold  text-md ">
                My Info
              </h1>
            </div>
            <p className="text-white text-[16px] pl-[27px]">
              {profileData?.myInfo}
            </p>
          </div>
        </div>
      </div>
      {TextRevealCardPreview()}
      <div
        id="myexperience"
        className="bg-[rgb(17 17 18)] [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))]  p-[30px] rounded-3xl m-8 "
      >
        <div className="flex items-center mb-8">
          <span className="bg-[#4beabe] block py-2 h-[35px] w-[8px] mr-[20px] rounded-sm"></span>
          <h1 className="text-white-600 capitalize text-[30px] font-bold  text-md ">
            My Experience
          </h1>
        </div>

        {userworkExperience &&
          userworkExperience.map((ex, index) => (
            <div className="" key={index}>
              <div className="flex flex-wrap gap-2 justify-between items-start mt-[25px]">
                <div>
                  <h3 className="text-[#afb0b1] font-sm font-semibold text-[22px] italic mb-[10px] inline-block ">
                    {" "}
                    {ex.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 items-center">
                    <FaLocationDot />
                    <h4 className="text-purple font-medium text-[16px]">
                      {ex.companyName} - {ex.location}
                    </h4>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap text-purple">
                  <IoMdTime />
                  {ex.duration}
                </div>
              </div>
              <div className="pt-6">
                <p className="text-white text-[16px] pl-[27px] pb-3">
                  {ex.description}
                </p>{" "}
              </div>
            </div>
          ))}
      </div>

      <ProfileForm
        open={open}
        setOpen={setOpen}
        userId={userIdFromPath}
        userData={userData}
        profileImage={profileImage}
        setProfileImage={setProfileImage}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        role={role}
        setRole={setRole}
        totalProjects={totalProjects}
        setTotalProjects={setTotalProjects}
        totalExperience={totalExperience}
        setTotalExperience={setTotalExperience}
        currentCTC={currentCTC}
        setCurrentCTC={setCurrentCTC}
        expectedCTC={expectedCTC}
        setExpectedCTC={setExpectedCTC}
        resume={resume}
        setResume={setResume}
        getProfile={getProfile}
        getResume={getResume}
        setMyInfo={setMyInfo}
        myInfo={myInfo}
      />
    </div>
  );
};

export default UserProfilePage;
