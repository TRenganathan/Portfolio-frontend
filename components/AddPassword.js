import React, { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import axios from "axios";
import { BASE_URL } from "../data";
import { toast } from "react-toastify";

const AddPassword = ({
  open,
  setOpen,
  email,
  setEmail,
  name,
  setName,
  password,
  setPassword,
}) => {
  const AddPassword = async () => {
    const newData = {
      email: email,
      password: password,
    };
    try {
      const { data } = await axios.post(
        `${BASE_URL}/user/addpassword`,
        newData
      );
      if (data.message == "Password set successfully") {
        toast.success(data.message);
      }
      if (
        data.message == "User not found" ||
        data.message == "Password already set"
      ) {
        toast.error(data.message);
      }
    } catch (error) {}
  };
  const handleSubmit = (e) => {
    setOpen(false);
    e.preventDefault();
    AddPassword();
  };

  return (
    <Transition show={open}>
      <Dialog
        className="relative z-[10000000001]"
        onClose={() => setOpen(false)}
      >
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
              <DialogPanel className="relative transform overflow-hidden rounded-lg dark:bg-black text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg p-4">
                <h2 className="text-[slategray] font-bold text-center mt-4 mb-1 text-[22px] uppercase">
                  add password
                </h2>
                <h6 className="text-[slategray] font-bold mt-4 mb-3 text-[16px]">
                  Create a password for local authentication
                </h6>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-md font-medium text-purple mb-5 uppercase"
                    >
                      Name
                    </label>
                    <input
                      disabled
                      type="text"
                      id="name"
                      value={name}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2 cursor-not-allowed"
                    />
                    <label
                      htmlFor="newSkill"
                      className="block text-md font-medium text-purple mb-5 uppercase"
                    >
                      Email
                    </label>
                    <input
                      disabled
                      type="text"
                      id="email"
                      value={email}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2 cursor-not-allowed"
                    />
                    <label
                      htmlFor="newSkill"
                      className="block text-md font-medium text-purple mb-5 uppercase"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2"
                    />
                  </div>

                  <div className="dark:bg-black-50 justify-center px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      className="inline-flex w-full justify-center rounded-md dark:bg-white px-3 py-2 text-sm font-semibold text-purple shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      //   onClick={() => setOpen(false)}
                      type="submit"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md dark:bg-red-600 px-3 py-2 text-sm font-semibold text-white-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      //   data-autofocus
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddPassword;
