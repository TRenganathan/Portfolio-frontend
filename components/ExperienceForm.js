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
const ExperienceForm = ({
  userId,
  open,
  setOpen,
  getExperience,
  particularExperience,
  setParticularExperience,
  swiftMode,
  setSwiftMode,
  setIsDeleteModel,
  isDeleteModel,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  useEffect(() => {
    if (particularExperience) {
      setTitle(particularExperience.title);
      setDescription(particularExperience.description);
      setCompanyName(particularExperience.companyName);
      setDuration(particularExperience.duration);
      setLocation(particularExperience.location);
    }
  }, [particularExperience]);
  const addExperience = async () => {
    const newData = {
      title: title,
      description: description,
      companyName: companyName,
      duration: duration,
      location: location,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/experience/add/userId/${userId}`,
        newData
      );
      if (response) {
        getExperience();
        setTitle("");
        setDescription("");
        setCompanyName("");
        setDuration("");
        setLocation("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateExperience = async () => {
    const newData = {
      title: title,
      description: description,
      companyName: companyName,
      duration: duration,
      location: location,
    };
    try {
      const response = await axios.put(
        `${BASE_URL}/experience/userId/${userId}/experienceId/${particularExperience._id}`,
        newData
      );
      if (response) {
        getExperience();
        setTitle("");
        setDescription("");
        setCompanyName("");
        setDuration("");
        setLocation("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const DeleteExperience = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/experience/userId/${userId}/experienceId/${particularExperience._id}`
      );
      if (response) {
        getExperience();
        setTitle("");
        setDescription("");
        setCompanyName("");
        setDuration("");
        setLocation("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userId && swiftMode != "edit") {
      addExperience();
    }
    if (userId && swiftMode == "edit") {
      updateExperience();
    }
    handelClose();
  };
  const handleDelecteExperience = (e) => {
    e.preventDefault();
    if (userId) {
      DeleteExperience();
    }
    handelClose();
  };
  const handelClose = () => {
    setOpen(false);
    setTitle("");
    setDescription("");
    setCompanyName("");
    setDuration("");
    setLocation("");
    setSwiftMode("add");
    setParticularExperience([]);
    setIsDeleteModel(false);
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

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto z-[1000000000]">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg dark:bg-black text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="experience-form p-4">
                  {!isDeleteModel ? (
                    <>
                      <h2 className="text-purple text-center text-xl mb-3 mt-3 font-semibold">
                        Add Experience
                      </h2>

                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label htmlFor="title">Title:</label>
                          <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="description">Description:</label>
                          <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2"
                          ></textarea>
                        </div>
                        <div className="form-group">
                          <label htmlFor="companyName">Company Name:</label>
                          <input
                            type="text"
                            id="companyName"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="duration">Duration:</label>
                          <input
                            type="text"
                            id="duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="location">Location:</label>
                          <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2"
                          />
                        </div>
                        <button
                          className="bg-purple px-4 py-3 rounded mt-10 mb-7 m-auto w-max	block"
                          type="submit"
                        >
                          {swiftMode == "add"
                            ? "Add Experience"
                            : "Edit Experience"}
                        </button>
                      </form>
                    </>
                  ) : (
                    <form onSubmit={handleDelecteExperience} className="p-8 ">
                      <h2 className="text-purple text-xl text-center mb-8 border-bottom">
                        Do you want to delete this work experience
                      </h2>
                      <h3 className="dark:text-white text-md mb-10">
                        Title : {particularExperience?.title}
                      </h3>
                      <button
                        className="bg-purple px-4 py-3 rounded ml-auto w-max	block"
                        type="submit"
                      >
                        Delete
                      </button>
                    </form>
                  )}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ExperienceForm;
