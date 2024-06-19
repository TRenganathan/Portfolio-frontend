import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { BASE_URL } from "../data";
const FooterForm = ({
  userId,
  open,
  setOpen,

  title,
  setTitle,
  description,
  setDescription,
  email,
  copyRight,
  setCopyRight,
  setEmail,
  linkedIn,
  setLinkedIn,
  naukuri,
  setNaukuri,
  github,
  setGithub,
  twitter,
  setTwitter,
  getFooterContent,
}) => {
  const addFooterContent = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/footer/add/userId/${userId}`,
        {
          title,
          description,
          email,
          copyRight,
          linkedIn,
          naukuri,
          github,
          twitter,
        }
      );
      if (response) {
        getFooterContent();
      }
    } catch (err) {}
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userId) {
      addFooterContent();
    }
    handelClose();
  };
  const handelClose = () => {
    setOpen(false);
    // Reset form fields
    //  setTitle("");
    //  setDescription("");
    //  setEmail("");
    //  setCopyRight("");
    //  setLinkedIn("");
    //  setNaukuri("");
    //  setGithub("");
    //  setTwitter("");
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
                <div className="p-4">
                  <h2 className="text-purple text-center text-xl mb-3 mt-3 font-semibold">
                    Add footer content
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
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="copyRight">CopyRight:</label>
                      <input
                        type="text"
                        id="copyRight"
                        value={copyRight}
                        onChange={(e) => setCopyRight(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="linkedIn">LinkedIn:</label>
                      <input
                        type="text"
                        id="linkedIn"
                        value={linkedIn}
                        onChange={(e) => setLinkedIn(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="naukuri">Naukuri:</label>
                      <input
                        type="text"
                        id="naukuri"
                        value={naukuri}
                        onChange={(e) => setNaukuri(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="github">GitHub:</label>
                      <input
                        type="text"
                        id="github"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="twitter">Twitter:</label>
                      <input
                        type="text"
                        id="twitter"
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2"
                      />
                    </div>
                    <button
                      className="bg-purple px-4 py-3 rounded ml-auto w-max block"
                      type="submit"
                    >
                      Add Footer
                    </button>
                  </form>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FooterForm;
