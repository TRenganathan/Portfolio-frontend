"use client";
import React, { useContext, useEffect, useState } from "react";
import { navItems } from "../../data";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { getDecryptedCookie } from "../../lib/cookiesData/cookiesdata";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { HoveredLink, Menu, MenuItem } from "./navbar-menu";
import { signOut, useSession } from "next-auth/react";
import AddPassword from "./../AddPassword";

const FloatingNavbar = () => {
  const { data: session, status } = useSession();

  const [visible, setVisible] = useState(true);
  const router = useRouter();
  const getCookies = getDecryptedCookie("userData");
  const userData = getCookies ? JSON.parse(getCookies) : null;
  const { scrollYProgress } = useScroll();
  const pathname = usePathname();
  const userIdFromPath = pathname?.split("/user/")[1];
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current == "number") {
      let direction = current - scrollYProgress.getPrevious();
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });
  if (session) {
    console.log(session, "session");
  }
  const handlePortfolioClick = () => {
    if (session?.user) {
      router.push(`/user/${session?.user.userId}`);
    } else if (userData) {
      router.push(`/user/${userData.userId}`);
    } else {
      router.push("/login");
    }
  };
  const [active, setActive] = useState(null);
  const logOut = () => {
    router.push("/login");
    Cookies.remove("userData");
    signOut();
  };
  const menuStyle = {
    padding: "3px 10px 2px",
    backgroundColor: " #662d66",
    borderRadius: "6px",
  };

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (userData && userData.provider == "google") {
      setName(userData.name);
      setEmail(userData.email);
    }
  }, [userData, session]);
  const addPassword = () => {
    setOpen(true);
  };
  const handleNavigateProfilePage = () => {
    if (session?.user) {
      router.push(`/user/profile/${session?.user.userId}`);
    } else if (userData) {
      router.push(`/user/profile/${userData.userId}`);
    }
  };
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(17, 25, 40, 0.75)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.125)",
        }}
        className="flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[99999] top-10 inset-x-0 mx-auto px-10  rounded-lg border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center space-x-4"
      >
        {navItems.map((navItem, i) => (
          <Link
            href={navItem.link}
            key={i}
            className="py-5 relative dark:text-neutral-50 items-center  flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className=" text-sm !cursor-pointer">{navItem.name}</span>
          </Link>
        ))}

        <button
          // href={""}
          onClick={handlePortfolioClick}
          className="relative dark:text-neutral-50 items-center  flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
        >
          <span className="block sm:hidden"></span>
          <span className=" text-sm !cursor-pointer">create your&apos;s</span>
        </button>
        <Link
          href={"/user/list"}
          className="py-5 relative dark:text-neutral-50 items-center  flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
        >
          <span className=" text-sm !cursor-pointer">users</span>
        </Link>
        {userData && userData?.userId != userIdFromPath && (
          <Link
            href={`/user/profile/${userIdFromPath}`}
            className="py-5 relative dark:text-neutral-50 items-center  flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
          >
            <span className=" text-sm !cursor-pointer">view Profile</span>
          </Link>
        )}
        {pathname != "/" && userData && userData?.userId == userIdFromPath && (
          <Menu setActive={setActive}>
            <MenuItem
              setActive={setActive}
              active={active}
              item={userData?.name.charAt(0).toLocaleUpperCase()}
              image={userData?.image ? userData?.image : null}
              menuStyle={menuStyle}
            >
              <div className="flex flex-col space-y-4 text-sm">
                <button
                  className="flex justify-start"
                  onClick={handleNavigateProfilePage}
                >
                  Profile
                </button>
                <HoveredLink href="/" onClick={logOut}>
                  Logout
                </HoveredLink>
                <HoveredLink href="javascript:void(0)">Resume</HoveredLink>
                {userData &&
                  userData.provider == "google" &&
                  userData?.userId == userIdFromPath && (
                    <button onClick={addPassword}>Add password</button>
                  )}
              </div>
            </MenuItem>
          </Menu>
        )}
        <AddPassword
          open={open}
          setOpen={setOpen}
          name={name}
          email={email}
          setEmail={setEmail}
          setName={setName}
          password={password}
          setPassword={setPassword}
        />
      </motion.div>
    </AnimatePresence>
  );
};
export default FloatingNavbar;
