"use client";
import React, { useEffect, useState } from "react";
import PinContainer from "./Pin";
import { FaLocationArrow } from "react-icons/fa6";
import { BASE_URL, projects } from "../../data";
import { getDecryptedCookie } from "../../lib/cookiesData/cookiesdata";
import { usePathname } from "next/navigation";
import axios from "axios";
import ProjectForm from "./../projectForm";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
function RecentProjects() {
  const getCookies = getDecryptedCookie("userData");
  const userData = getCookies ? JSON.parse(getCookies) : null;
  const pathname = usePathname();
  const userIdFromPath = pathname?.split("/user/")[1];

  const getProjects = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/projects/userId/${userIdFromPath}`
      );
      if (data) {
        // Parse the languagesUsed field properly
        setUserProjects(data?.data);
        // const formattedApiProjects = data.data.map((project) => {
        //   if (
        //     project.languagesUsed.length > 0 &&
        //     typeof project.languagesUsed[0] === "string" &&
        //     project.languagesUsed[0].startsWith('["')
        //   ) {
        //     project.languagesUsed = JSON.parse(project.languagesUsed[0]);
        //   }
        //   return project;
        // });

        // const combinedProjects = [...projects];
        // formattedApiProjects.forEach((apiProject) => {
        //   if (
        //     !combinedProjects.some((project) => project._id === apiProject._id)
        //   ) {
        //     combinedProjects.push(apiProject);
        //   }
        // });

        // setUserProjects(combinedProjects);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userIdFromPath) {
      getProjects();
    }
  }, []);

  const [open, setOpen] = useState(false);
  const [userProjects, setUserProjects] = useState(projects);
  const [particularProject, setParticularProject] = useState();
  const [swiftMode, setSwiftMode] = useState("add");
  const handleProjectAdded = (newProject) => {
    setUserProjects([...projects, newProject]);
  };
  const checkLanguagesForIconList = (key) => {
    switch (key.toLowerCase()) {
      case "javascript":
        return "/js.svg";
      case "js":
        return "/js.svg";
      case "next js":
        return "/next.svg";
      case "node js":
        return "/node-js.svg";
      case "jquery":
        return "/jquery.svg";
      case "twig":
        return "/twig.svg";
      case "drupal":
        return "/drupal.svg";
      case "react":
        return "/re.svg";
      case "php":
        return "/php.svg";
      default:
        return;
    }
  };
  const handleEditProject = (project, type) => {
    setSwiftMode(type);
    setParticularProject(project);
    setOpen(true);
  };
  const [isDeleteModel, setIsDeleteModel] = useState(false);
  const handleDeleteProject = (project) => {
    setIsDeleteModel(true);
    setParticularProject(project);
    setOpen(true);
  };
  return (
    <div className="py-20 relative" id="projects">
      {userProjects?.length && (
        <h2 className="heading">
          {" "}
          A small selection of{" "}
          <span className="text-purple">recent projects</span>
        </h2>
      )}

      {userData && userData?.userId == userIdFromPath && (
        <button
          className="absolute right-0 bg-purple text-white p-1 rounded"
          onClick={() => setOpen(true)}
        >
          <MdOutlineEdit />
        </button>
      )}
      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
        {pathname != "/"
          ? userProjects?.map((item, index) => (
              <div
                key={index}
                className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
              >
                <PinContainer title={item.link} href={item.link}>
                  <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                    {userData && userData?.userId == userIdFromPath && (
                      <>
                        <button
                          className="absolute right-0 bg-purple text-white p-1 rounded z-[11]"
                          onClick={() => handleEditProject(item, "edit")}
                        >
                          <MdOutlineEdit />
                        </button>
                        <button
                          className="absolute right-1 top-0 bg-purple text-red p-1 rounded z-[11]"
                          onClick={() => handleDeleteProject(item)}
                        >
                          <MdDeleteForever />
                        </button>
                      </>
                    )}
                    <div
                      className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                      style={{ backgroundColor: "#13162D" }}
                    >
                      <img src="/bg.png" alt="bgimg" />
                    </div>

                    {item.projectImage ? (
                      <img
                        src={
                          Object.keys(item.projectImage).length
                            ? item.projectImage
                            : "/default-prjct.jpg"
                        }
                        alt="cover"
                        className="z-10 absolute top-0"
                      />
                    ) : (
                      <img
                        src={"/default-prjct.jpg"}
                        alt="cover"
                        className="z-10 absolute top-0"
                      />
                    )}
                  </div>

                  <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-2">
                    {item.title}
                  </h1>

                  <p
                    className="lg:text-xl lg:font-normal font-light text-sm line-clamp-3"
                    style={{
                      color: "#BEC1DD",
                      margin: "1vh 0",
                    }}
                  >
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mt-7 mb-3 flex-wrap gap-2">
                    <div className="flex items-center flex-wrap">
                      {item?.languagesUsed?.slice(0, 5).map((icon, index) => {
                        return (
                          <div
                            key={index}
                            className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center mb-1"
                            style={{
                              transform: `translateX(-${5 * index + 2}px)`,
                            }}
                          >
                            <img
                              src={
                                checkLanguagesForIconList(icon)
                                  ? checkLanguagesForIconList(icon)
                                  : "/programming.svg"
                              }
                              alt="icon5"
                              className="p-2"
                            />
                          </div>
                        );
                      })}
                      {/* {item?.languagesUsed?.map((lang, index) => {
                    <div
                      key={index}
                      className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center mb-1"
                      style={{
                        transform: `translateX(-${5 * index + 2}px)`,
                      }}
                    >
                      <img src="/js.svg" alt="icon5" className="p-2" />
                    </div>;
                  })} */}
                    </div>

                    <a
                      href={
                        item?.projectURL
                          ? item?.projectURL
                          : item?.link
                          ? item.link
                          : "javascript:void(0)"
                      }
                      target={
                        item?.projectURL ? "_blank" : item.link ? "_blank" : ""
                      }
                      className="flex justify-center items-center"
                    >
                      <span className="flex lg:text-xl md:text-xs text-sm text-purple">
                        Check Live Site
                      </span>
                      <FaLocationArrow className="ms-3" color="#CBACF9" />
                    </a>
                  </div>
                </PinContainer>
              </div>
            ))
          : projects?.map((item, index) => (
              <div
                key={index}
                className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
              >
                <PinContainer title={item.link} href={item.link}>
                  <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                    {userData && userData?.userId == userIdFromPath && (
                      <>
                        <button
                          className="absolute right-0 bg-purple text-white p-1 rounded z-[11]"
                          onClick={() => handleEditProject(item, "edit")}
                        >
                          <MdOutlineEdit />
                        </button>
                        <button
                          className="absolute right-1 top-0 bg-purple text-red p-1 rounded z-[11]"
                          onClick={() => handleDeleteProject(item)}
                        >
                          <MdDeleteForever />
                        </button>
                      </>
                    )}
                    <div
                      className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                      style={{ backgroundColor: "#13162D" }}
                    >
                      <img src="/bg.png" alt="bgimg" />
                    </div>

                    {item.projectImage ? (
                      <img
                        src={
                          Object.keys(item.projectImage).length
                            ? item.projectImage
                            : "/default-prjct.jpg"
                        }
                        alt="cover"
                        className="z-10 absolute top-0"
                      />
                    ) : (
                      <img
                        src={"/default-prjct.jpg"}
                        alt="cover"
                        className="z-10 absolute top-0"
                      />
                    )}
                  </div>

                  <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-2">
                    {item.title}
                  </h1>

                  <p
                    className="lg:text-xl lg:font-normal font-light text-sm line-clamp-3"
                    style={{
                      color: "#BEC1DD",
                      margin: "1vh 0",
                    }}
                  >
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mt-7 mb-3 flex-wrap gap-2">
                    <div className="flex items-center flex-wrap">
                      {item?.languagesUsed?.slice(0, 5).map((icon, index) => {
                        return (
                          <div
                            key={index}
                            className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center mb-1"
                            style={{
                              transform: `translateX(-${5 * index + 2}px)`,
                            }}
                          >
                            <img
                              src={
                                checkLanguagesForIconList(icon)
                                  ? checkLanguagesForIconList(icon)
                                  : "/programming.svg"
                              }
                              alt="icon5"
                              className="p-2"
                            />
                          </div>
                        );
                      })}
                      {/* {item?.languagesUsed?.map((lang, index) => {
                  <div
                    key={index}
                    className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center mb-1"
                    style={{
                      transform: `translateX(-${5 * index + 2}px)`,
                    }}
                  >
                    <img src="/js.svg" alt="icon5" className="p-2" />
                  </div>;
                })} */}
                    </div>

                    <a
                      href={
                        item?.projectURL
                          ? item?.projectURL
                          : item?.link
                          ? item.link
                          : "javascript:void(0)"
                      }
                      target={
                        item?.projectURL ? "_blank" : item.link ? "_blank" : ""
                      }
                      className="flex justify-center items-center"
                    >
                      <span className="flex lg:text-xl md:text-xs text-sm text-purple">
                        Check Live Site
                      </span>
                      <FaLocationArrow className="ms-3" color="#CBACF9" />
                    </a>
                  </div>
                </PinContainer>
              </div>
            ))}
        <ProjectForm
          userId={userIdFromPath}
          onProjectAdded={handleProjectAdded}
          open={open}
          setOpen={setOpen}
          getProjects={getProjects}
          particularProject={particularProject}
          setParticularProject={setParticularProject}
          swiftMode={swiftMode}
          setSwiftMode={setSwiftMode}
          isDeleteModel={isDeleteModel}
          setIsDeleteModel={setIsDeleteModel}
        />
      </div>
    </div>
  );
}

export default RecentProjects;
