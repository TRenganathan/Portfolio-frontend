// components/SkillsForm.js
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import axios from "axios";
import Select from "react-select";
import { color } from "framer-motion";
import { BASE_URL } from "../data";

const SkillsForm = ({
  userId,
  onProjectAdded,
  open,
  setOpen,
  getProjects,
  particularProject,
  setParticularProject,
  swiftMode,
  setSwiftMode,
  setIsDeleteModel,
  isDeleteModel,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [role, setRole] = useState("");
  const [projectURL, setProjectURL] = useState("");
  const [languagesUsed, setLanguagesUsed] = useState([]);
  const [projectImages, setProjectImages] = useState([]);

  useEffect(() => {
    if (particularProject) {
      setTitle(particularProject.title);
      setDescription(particularProject.description);
      setRole(particularProject.role);
      setProjectURL(particularProject.projectURL);
      const selectedLanguages = particularProject.languagesUsed.map(
        (language) => {
          return { value: language, label: language };
        }
      );
      setLanguagesUsed(selectedLanguages);
    }
  }, [particularProject]);

  const handleImageChange = (e) => {
    setProjectImages([...e.target.files]);
  };
  const handleLanguagesChange = (selectedOptions) => {
    setLanguagesUsed(selectedOptions);
  };
  const languageOptions = [
    { value: "Java", label: "Java" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "Python", label: "Python" },
    { value: "node js", label: "Node js" },
    { value: "drupal", label: "Drupal" },
    { value: "next js", label: "Next js" },
    { value: "Twig", label: "Twig" },
  ];

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "black",
      marginTop: "7px",
      marginBottom: "10px",
      padding: "5px",
    }),
    option: (styles, { isDisabled }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? "red" : "#7676c1",
        color: "#FFF",
        borderBottom: "1px solid purple",
        cursor: isDisabled ? "not-allowed" : "pointer",
      };
    },
    input: (styles) => ({ ...styles, color: "#fff", fontWeight: "700" }),
    placeholder: (styles) => ({ ...styles, color: "#fff", fontWeight: "700" }),
  };

  const addProject = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("role", role);
    formData.append("projectURL", projectURL);
    formData.append(
      "languagesUsed",
      JSON.stringify(languagesUsed.map((lan) => lan.value))
    );

    for (let i = 0; i < projectImages.length; i++) {
      formData.append("projectImage", projectImages[i]);
    }

    try {
      const headers = {
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      };

      const response = await axios.post(
        `${BASE_URL}/projects/add/userId/${userId}`,
        formData,
        { headers }
      );

      if (response) {
        getProjects();
      }
      onProjectAdded(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handelClose = () => {
    setOpen(false);
    setProjectImages([]);
    setLanguagesUsed([]);
    setRole("");
    setProjectURL("");
    setDescription("");
    setTitle("");
    setParticularProject();
    setSwiftMode("add");
    setIsDeleteModel(false);
  };

  const updateProject = async () => {
    console.log(particularProject);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("role", role);
    formData.append("projectURL", projectURL);

    formData.append(
      "languagesUsed",
      JSON.stringify(languagesUsed.map((lan) => lan.value))
    );

    for (let i = 0; i < projectImages.length; i++) {
      formData.append("projectImage", projectImages[i]);
    }

    try {
      const headers = {
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      };
      const data = await axios.put(
        `${BASE_URL}/projects/userId/${userId}/projectId/${particularProject?._id}`,
        formData,
        { headers }
      );
      if (data) {
        getProjects();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userId && swiftMode == "add") {
      addProject();
    }
    if (userId && swiftMode == "edit") {
      updateProject();
    }
    setOpen(false);
    setTitle("");
    setDescription("");
    setRole("");
    setProjectURL("");
    setLanguagesUsed("");
    setProjectImages("");
    setIsDeleteModel(false);
  };

  const deleteProject = async () => {
    try {
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      const data = await axios.delete(
        `${BASE_URL}/projects/userId/${userId}/projectId/${particularProject?._id}`,

        { headers }
      );
      if (data) {
        getProjects();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleProjectDelete = (e) => {
    e.preventDefault();
    // if (particularProject) {
    deleteProject();
    setOpen(false);
    // }
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
                {!isDeleteModel ? (
                  <form onSubmit={handleSubmit} className="p-4">
                    <div>
                      <label>Title:</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2"
                      />
                    </div>
                    <div>
                      <label>Description:</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2"
                      ></textarea>
                    </div>
                    <div>
                      <div>
                        <label>Languages Used:</label>
                        <Select
                          required
                          isMulti
                          value={languagesUsed}
                          options={languageOptions}
                          onChange={handleLanguagesChange}
                          styles={colourStyles}
                          maxMenuHeight={200}
                        />
                      </div>
                      <label>Role:</label>
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2"
                      />
                    </div>
                    <div>
                      <label>Project URL:</label>
                      <input
                        type="url"
                        value={projectURL}
                        onChange={(e) => setProjectURL(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2"
                      />
                    </div>

                    <div>
                      <label>Project Images:</label>
                      <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 mb-2 mt-2"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-purple px-4 py-3 rounded m-auto w-max	block"
                    >
                      Add Project
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleProjectDelete} className="p-8 ">
                    <h2 className="text-purple text-xl text-center mb-8 border-bottom">
                      Do you want to delete this project
                    </h2>
                    <h3 className="dark:text-white text-md mb-10">
                      Title : {particularProject?.title}
                    </h3>
                    <button
                      className="bg-purple px-4 py-3 rounded ml-auto w-max	block"
                      type="submit"
                    >
                      Delete
                    </button>
                  </form>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SkillsForm;
