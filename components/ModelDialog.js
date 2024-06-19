import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
// import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function Example({
  open,
  setOpen,
  onSubmit,
  setBannertagLine,
  setBannerTitle,
  setBannerDescription,
  bannertagLine,
  bannerDescription,
  bannerTitle,
  handelModelClose,
}) {
  return (
    <Transition show={open}>
      <Dialog className="relative z-10" onClose={handelModelClose}>
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

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
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
                <form onSubmit={onSubmit}>
                  <div className="dark:bg-black px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start md:justify-center">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                        <DialogTitle
                          as="h3"
                          className="text-base font-semibold leading-6 text-purple-900 text-center"
                        >
                          Add banner content
                        </DialogTitle>

                        <div class="mb-6">
                          <label
                            htmlFor="large-input"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Banner Title
                          </label>
                          <input
                            value={bannerTitle}
                            required
                            onChange={(e) => setBannerTitle(e.target.value)}
                            type="text"
                            id="large-input"
                            class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                        </div>
                        <div class="mb-6">
                          <label
                            htmlFor="default-input"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Banner tagline
                          </label>
                          <input
                            value={bannertagLine}
                            onChange={(e) => setBannertagLine(e.target.value)}
                            type="text"
                            id="default-input"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="small-input"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Banner description
                          </label>
                          <input
                            value={bannerDescription}
                            onChange={(e) =>
                              setBannerDescription(e.target.value)
                            }
                            type="text"
                            id="small-input"
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dark:bg-black-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
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
                      data-autofocus
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
}
