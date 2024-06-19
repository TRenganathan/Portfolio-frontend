"use client";
import React from "react";
import UsersList from "../../../components/UsersList";
import FloatingNavbar from "../../../components/ui/FloatingNavbar";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

const UsersListPage = () => {
  const router = useRouter();

  return (
    <div className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 p-20">
      <div className="max-w-[1010px] w-full h-full">
        <FloatingNavbar />
        <button
          className="text-whiter bg-[purple] p-1 rounded-md relative z-10"
          onClick={() => router.push("/")}
        >
          <FaArrowLeft />
        </button>
        <button onClick={() => router.push("/")}></button>
        <UsersList />
      </div>
    </div>
  );
};

export default UsersListPage;
