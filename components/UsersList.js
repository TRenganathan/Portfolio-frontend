import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, BASE_URL1 } from "../data";
import { useRouter } from "next/navigation";
import { getDecryptedCookie } from "../lib/cookiesData/cookiesdata";
import io from "socket.io-client";
import { Meteors } from "./../components/ui/meteors";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Image from "next/image";
import userContext from "../lib/context/userContext";
const socket = io(`${BASE_URL1}`, {
  withCredentials: true,
});
const UsersList = () => {
  const [users, setUsers] = useState([]);
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/user`);
      setUsers(data?.data);
    } catch (error) {}
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const router = useRouter();
  const getCookies = getDecryptedCookie("userData");
  const userData = getCookies ? JSON.parse(getCookies) : null;
  const {
    setNotifications,
    setActiveChatroomId,
    currentChatUser,
    setCurrentChatUser,
  } = useContext(userContext);
  const [isLoginModelOpen, setIsLoginModelOpen] = useState(false);
  const startChat = (user) => {
    if (userData) {
      setCurrentChatUser(user);
      const sortedIds = [userData?.userId, user._id].sort();
      const chatroomId = `chat_${sortedIds[0]}_${sortedIds[1]}`;
      setActiveChatroomId(chatroomId);
      router.push(`/chat`);
      setNotifications((prev) => ({
        ...prev,
        [chatroomId]: 0,
      }));
    } else {
      setIsLoginModelOpen(true);
    }
  };
  useEffect(() => {
    if (userData) {
      socket.emit("join", {
        userId: userData.userId,
        chatroomId: `user_${userData.userId}`,
      });

      socket.on("notification", ({ chatroomId, message }) => {
        setNotifications((prev) => ({
          ...prev,
          [chatroomId]: (prev[chatroomId] || 0) + 1,
        }));
      });

      return () => {
        socket.off("notification");
      };
    }
  }, [userData]);

  const handelModelClose = () => {
    setIsLoginModelOpen(false);
  };
  const loginModel = () => {
    return (
      <Dialog
        open={isLoginModelOpen}
        onClose={handelModelClose}
        sx={{
          "& .MuiPaper-root ": {
            backgroundColor: "#5a5959",
            padding: "20px",
            minWidth: "32%",
            minHeight: "300px",
            borderRadius: "20px",
          },
        }}
      >
        <h2 className="text-center text-[25px] font-semibold text-white">
          Login
        </h2>
        <DialogContent className="flex items-center justify-center">
          <h4 className="text-center text-purple">Please Make login to chat</h4>
        </DialogContent>
        <DialogActions>
          <button
            onClick={() => {
              router.push("/login");
              setIsLoginModelOpen(false);
            }}
            className="text-center flex items-center ml-auto bg-purple text-white px-4 py-3 rounded-md"
          >
            Login
          </button>
        </DialogActions>
      </Dialog>
    );
  };
  return (
    <div className="flex justify-center gap-[20px] flex-wrap mt-14">
      {users &&
        users
          .filter((u) => u._id != userData?.userId)
          .map((user, index) => (
            <div className=" w-full relative max-w-xs" key={index}>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
              <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl ">
                <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-2 w-2 text-gray-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                    />
                  </svg>
                </div>

                <div className=" mb-4">
                  <div className="mb-4">
                    {user?.profile?.profilePicture ? (
                      <Image
                        src={`${BASE_URL1}/${user?.profile?.profilePicture}`}
                        alt="profile-img"
                        height={100}
                        width={100}
                        className="rounded-full w-[100px] h-[100px] object-cover"
                      />
                    ) : (
                      <div className="w-[100px] h-[100px] rounded-full bg-white-200 flex items-center justify-center">
                        <span className="text-[30px]">
                          {user?.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3> {user?.name}</h3>
                    <h5> {user?.email}</h5>
                  </div>
                </div>
                <div className="flex gap-3 flex-wrap items-start mb-4 justify-center">
                  <button
                    onClick={() => startChat(user)}
                    className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300"
                  >
                    message
                  </button>
                  <button
                    onClick={() => router.push(`/user/${user?._id}`)}
                    className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300"
                  >
                    view profile
                  </button>
                </div>

                <Meteors number={5} />
              </div>
            </div>
          ))}
      {loginModel()}
    </div>
  );
};

export default UsersList;
