import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { BASE_URL } from "../data";
import { toast } from "react-toastify";
const ProfileForm = ({
  open,
  setOpen,
  userId,
  profileImage,
  setProfileImage,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  role,
  setRole,
  totalProjects,
  setTotalProjects,
  totalExperience,
  setTotalExperience,
  currentCTC,
  setCurrentCTC,
  expectedCTC,
  setExpectedCTC,
  resume,
  setResume,
  getResume,
  getProfile,
  setMyInfo,
  myInfo,
}) => {
  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };
  const resumeUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", resume);
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      const data = await axios.put(
        `${BASE_URL}/resume/userId/${userId}`,
        formData,
        { headers }
      );
      if (data) {
        handelClose();
        getResume();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateProfile = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("role", role);
    formData.append("myInfo", myInfo);
    formData.append("totalProjects", totalProjects);
    formData.append("totalExperience", totalExperience);
    formData.append("currentCTC", currentCTC);
    formData.append("expectedCTC", expectedCTC);

    formData.append("profileImage", profileImage);

    try {
      const { data } = await axios.put(
        `${BASE_URL}/profile/userId/${userId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.message == "success") {
        toast.success("success");
        handelClose();
      }
      getProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    updateProfile();
    if (resume) {
      resumeUpload();
    }
  };
  const handelClose = () => {
    setOpen(false);
  };
  return (
    <Transition show={open}>
      <Dialog className="relative z-[10000000001]" onClose={handelClose}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0  w-screen overflow-y-auto z-[1000000000]">
          <div className="flex min-h-full items-end justify-center p-4  sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg dark:bg-black text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <form onSubmit={handleSubmit} className="p-4">
                  <div>
                    <label className="block text-md font-medium text-purple  mb-5 uppercase">
                      Profile Picture:
                    </label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className=" block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2"
                    />
                  </div>
                  <div>
                    <label className="block text-md font-medium text-purple  mb-5 uppercase">
                      Name:
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2"
                    />
                  </div>
                  <div>
                    <label className="block text-md font-medium text-purple  mb-5 uppercase">
                      Email:
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2"
                    />
                  </div>
                  <div>
                    <label className="block text-md font-medium text-purple  mb-5 uppercase">
                      Phone:
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2"
                    />
                  </div>
                  <div>
                    <label className="block text-md font-medium text-purple  mb-5 uppercase">
                      Role:
                    </label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                      className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2"
                    />
                  </div>
                  <div>
                    <label className="block text-md font-medium text-purple  mb-5 uppercase">
                      Total Projects:
                    </label>
                    <input
                      type="text"
                      value={totalProjects}
                      onChange={(e) => setTotalProjects(e.target.value)}
                      className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2"
                    />
                  </div>
                  <div>
                    <label className="block text-md font-medium text-purple  mb-5 uppercase">
                      Total Experience:
                    </label>
                    <input
                      type="text"
                      value={totalExperience}
                      onChange={(e) => setTotalExperience(e.target.value)}
                      className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2"
                    />
                  </div>
                  <div>
                    <label className="block text-md font-medium text-purple  mb-5 uppercase">
                      Current CTC:
                    </label>
                    <input
                      type="text"
                      value={currentCTC}
                      onChange={(e) => setCurrentCTC(e.target.value)}
                      className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2"
                    />
                  </div>
                  <div>
                    <label className="block text-md font-medium text-purple  mb-5 uppercase">
                      Expected CTC:
                    </label>
                    <input
                      type="text"
                      value={expectedCTC}
                      onChange={(e) => setExpectedCTC(e.target.value)}
                      className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2"
                    />
                  </div>
                  <div>
                    <label className="block text-md font-medium text-purple  mb-5 uppercase">
                      My Info:
                    </label>
                    <textarea
                      rows="8"
                      type="text"
                      value={myInfo}
                      onChange={(e) => setMyInfo(e.target.value)}
                      className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-md font-medium text-purple  mb-5 uppercase">
                      Resume:
                    </label>
                    <input
                      type="file"
                      onChange={handleResumeChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2"
                    />
                  </div>
                  <button
                    className="bg-purple px-4 py-3 rounded mt-10 mb-7 m-auto w-max	block"
                    type="submit"
                  >
                    Update Profile
                  </button>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProfileForm;
