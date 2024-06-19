"use client";
import { FaRegEdit } from "react-icons/fa";
import { BASE_URL, gridItems } from "../../data";
import { BentoGrid, BentoGridItem } from "../AboutGrids";
import { getDecryptedCookie } from "../../lib/cookiesData/cookiesdata";
import { useEffect, useState } from "react";
import AboutModel from "./../AboutModel";
import AboutGridModel from "./../AboutGridModel";
import AboutModalForm from "../AboutGridForm";
import axios from "axios";
import { usePathname } from "next/navigation";

const About = () => {
  const [open, setOpen] = useState(false);

  const getCookies = getDecryptedCookie("userData");
  const userData = getCookies ? JSON.parse(getCookies) : null;
  const pathname = usePathname();
  const userIdFromPath = pathname?.split("/user/")[1];
  const handleEditAbout = () => {
    setOpen(true);
  };

  const [formValues, setFormValues] = useState([
    {
      title: "",
      description: "",
      className: "",
      imgClassName: "",
      titleClassName: "",
      img: "",
      spareImg: "",
      email: "",
    },
  ]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newFormValues = [...formValues];
    newFormValues[index][name] = value;
    setFormValues(newFormValues);
  };

  const handleAddFormFields = () => {
    setFormValues([
      ...formValues,
      {
        title: "",
        description: "",
        className: "",
        imgClassName: "",
        titleClassName: "",
        img: "",
        spareImg: "",
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
  };
  const handelModelClose = () => {
    setOpen(false);
  };

  //***********************************************//
  const [items, setItems] = useState(gridItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleSave = (updatedItem) => {
    setItems(
      items.map((item) => {
        if (item.id == updatedItem.id) {
          item.title = updatedItem.title;
          item.description = updatedItem.description;
          item.className = updatedItem.className;
          item.imgClassName = updatedItem.imgClassName;
          item.titleClassName = updatedItem.titleClassName;
          item.img = updatedItem.img;
          item.spareImg = updatedItem.spareImg;
          item.email = updatedItem.email;
        }
        return item.id == updatedItem.id ? updatedItem : item;
      })
    );
    setIsModalOpen(false);

    if (userData) {
      addOrUpdateGridItems();
    }
  };
  const addOrUpdateGridItems = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${userData.accessToken}`,
      };
      const { data } = await axios.post(
        `${BASE_URL}/aboutgriditems/userId/${userIdFromPath}`,
        items,
        {
          headers,
        }
      );
      if (data) {
        getUserGridItems();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getUserGridItems = async () => {
    try {
      // const headers = {
      //   Authorization: `Bearer ${userData.accessToken}`,
      // };
      const { data } = await axios.get(
        `${BASE_URL}/aboutgriditems/userId/${userIdFromPath}`
      );
      if (data) {
        if (data.length > 0) {
          setItems(data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [primarySkills, setPrimarySkills] = useState([
    "React JS",
    "Express",
    "Javascript",
    "Node JS",
    "Next JS",
    "Drupal",
    "Twig Templates",
    "Mongo DB",
    "Meterial UI",
  ]);
  const getUserSkills = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/primaryskills/userId/${userIdFromPath}`
      );
      if (data?.skills?.length > 0) {
        setPrimarySkills(data.skills);
      } else {
        setPrimarySkills([
          "React JS",
          "Express",
          "Javascript",
          "Node JS",
          "Next JS",
          "Drupal",
          "Twig Templates",
          "Mongo DB",
          "Meterial UI",
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const addUserSkills = async () => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/primaryskills/userId/${userIdFromPath}`,
        { skills: primarySkills }
      );
      if (data) {
        getUserSkills();
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (userIdFromPath) {
      getUserGridItems();
      getUserSkills();
    }
  }, []);

  return (
    <section id="about">
      <BentoGrid className="w-full py-20 relative">
        {userData && userData?.userId == userIdFromPath && (
          <button className="absolute right-0 top-0" onClick={handleEditAbout}>
            Add content
          </button>
        )}
        {items?.map((item, i) => (
          <BentoGridItem
            id={item.id}
            key={i}
            title={item.title}
            description={item.description}
            className={item.className}
            img={item.img}
            imgClassName={item.imgClassName}
            titleClassName={item.titleClassName}
            email={item.email}
            item={item}
            onEdit={handleEdit}
            userIdFromPath={userIdFromPath}
            setPrimarySkills={setPrimarySkills}
            primarySkills={primarySkills}
            addUserSkills={addUserSkills}
          />
        ))}
        {isModalOpen && (
          <AboutModalForm
            item={currentItem}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
          />
        )}
        {/* {formValues.length > 0 &&
          formValues?.map((item, i) => {
            return (
              <BentoGridItem
                id={i}
                key={i}
                title={item.title}
                description={item.description}
                className={
                  item.className
                    ? item.className
                    : "lg:col-span-3 md:col-span-6"
                }
                img={item.img}
                imgClassName={item.imgClassName}
                titleClassName={item.titleClassName}
                spareImg={item.spareImg}
              />
            );
          })} */}
      </BentoGrid>
      <AboutModel
        open={open}
        setOpen={setOpen}
        setFormValues={setFormValues}
        formValues={formValues}
        handleChange={handleChange}
        handleAddFormFields={handleAddFormFields}
        onSubmit={handleSubmit}
        handelModelClose={handelModelClose}
      />
    </section>
  );
};

export default About;
