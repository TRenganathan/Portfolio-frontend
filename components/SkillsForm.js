// components/SkillsForm.js
import React, { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

const SkillsForm = ({
  skills,
  setSkills,
  openSkillForm,
  setOpenSkillForm,
  addUserSkills,
}) => {
  const [newSkill, setNewSkill] = useState("");

  const handleChange = (e) => {
    setNewSkill(e.target.value);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const handleSubmit = (e) => {
    addUserSkills();
    setOpenSkillForm(false);
    e.preventDefault();
    // Perform further actions like API calls here
    console.log("Skills submitted:", skills);
  };

  return (
    <Transition show={openSkillForm}>
      <Dialog
        className="relative z-[10000000001]"
        onClose={() => setOpenSkillForm(false)}
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
              <DialogPanel className="relative transform overflow-hidden rounded-lg dark:bg-black text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <form onSubmit={handleSubmit} className="p-4">
                  <div className="mb-4">
                    <label
                      htmlFor="newSkill"
                      className="block text-md font-medium text-purple text-center mb-5 uppercase"
                    >
                      Add new skill
                    </label>
                    <input
                      type="text"
                      id="newSkill"
                      value={newSkill}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2"
                    />
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Add Skill
                    </button>
                  </div>
                  <div>
                    {skills?.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center mb-3 justify-between flex-wrap"
                      >
                        <span className="mr-2">{skill}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(index)}
                          className="inline-flex items-center px-4 py-2  border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
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
                      onClick={() => setOpenSkillForm(false)}
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

export default SkillsForm;
