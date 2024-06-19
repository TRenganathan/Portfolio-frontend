"use client";
import React, { useContext, useEffect, useState } from "react";
import { Chat } from "./../../components/Chat";
import { useRouter } from "next/navigation";

import { IoNotificationsOffSharp } from "react-icons/io5";
import { TbCategoryPlus } from "react-icons/tb";
import { getDecryptedCookie } from "../../lib/cookiesData/cookiesdata";
import axios from "axios";
import { BASE_URL, BASE_URL1 } from "../../data/";
import { io } from "socket.io-client";
import Image from "next/image";
import { Spotlight } from "../../components/ui/SpotLight";
import FloatingNavbar from "../../components/ui/FloatingNavbar";
import { FaArrowLeft } from "react-icons/fa6";
import userContext from "../../lib/context/userContext";
const socket = io(`${BASE_URL1}`, {
  withCredentials: true,
});
const ChatPage = () => {
  const router = useRouter();

  const {
    notifications,
    setNotifications,
    messages,
    setMessages,
    activeChatroomId,
    setActiveChatroomId,
    currentChatUser,
    setCurrentChatUser,
  } = useContext(userContext);
  const [users, setUsers] = useState([]);
  const [recentChats, setRecentChats] = useState([]);
  const getCookies = getDecryptedCookie("userData");
  const userData = getCookies ? JSON.parse(getCookies) : null;
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/user`);
      setUsers(data?.data);
    } catch (error) {}
  };

  const getRecentChats = async (userId) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/chat/recent-chats/userId/${userId}`
      );
      if (data) {
        setRecentChats(data?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllUsers();
    if (userData) {
      getRecentChats(userData?.userId);
    }
  }, []);
  const startChat = (user) => {
    setCurrentChatUser(user);
    const sortedIds = [userData?.userId, user?._id].sort();
    const chatroomId = `chat_${sortedIds[0]}_${sortedIds[1]}`;
    setActiveChatroomId(chatroomId);
    setNotifications((prev) => ({
      ...prev,
      [chatroomId]: 0,
    }));
  };

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/chat/${activeChatroomId}`);
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  };
  useEffect(() => {
    if (activeChatroomId) {
      fetchMessages();
    }
  }, [activeChatroomId]);
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
  return (
    <div className="relative   overflow-hidden mx-auto sm:px-10 px-5 p-10">
      <Spotlight
        className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
        fill="white"
      />
      <Spotlight className="h-[80vh] w-[50vw] top-10 left-full" fill="purple" />
      <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      <div
        className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
      >
        <div
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>
      <FloatingNavbar />
      <div className="wrapper mt-10 p-10">
        <div className="m-auto max-w-[1000px]">
          <button
            className="text-whiter bg-[purple] p-1 rounded-md relative z-10"
            onClick={() => router.push("/user/list")}
          >
            <FaArrowLeft />
          </button>

          <div className="flex flex-wrap gap-2 justify-between">
            <div className=" bg-[#23262f]  p-[15px] rounded max-w-[400px] mt-5 flex-auto max-h-[650px] overflow-y-auto z-10">
              <div className="flex justify-between flex-wrap items-center">
                <div>
                  <span className="text-white pr-3 font-semibold">Inbox</span>
                  <span></span>
                </div>
                <button
                  onClick={() => router.push("/user/list")}
                  className="rounded py-[6px] px-[15px] text-white text-[13px] text-center bg-[#2f80ed]"
                >
                  + new chat
                </button>
              </div>
              {recentChats &&
                recentChats
                  .filter((u) => u._id != userData?.userId)
                  .map((user, index) => (
                    <div
                      key={index}
                      onClick={() => startChat(user)}
                      className="cursor-pointer flex flex-wrap gap-2 items-center my-2 border-b-2 border-r-white border-white-100 p-4 bg-[#3b3e46] rounded "
                    >
                      {user?.profile?.profilePicture ? (
                        <Image
                          src={`${BASE_URL1}/${user?.profile?.profilePicture}`}
                          alt="profile-img"
                          height={50}
                          width={50}
                          className="rounded-full w-[50px] h-[50px] object-cover"
                        />
                      ) : (
                        <div className="w-[50px] h-[50px] rounded-full bg-white-200 flex items-center justify-center">
                          <span>{user?.name.charAt(0)}</span>
                        </div>
                      )}

                      <div className="">
                        <h6 className="font-bold text-[14px] text-white">
                          {user?.name}
                        </h6>
                        {notifications[
                          `chat_${[userData?.userId, user?._id]
                            .sort()
                            .join("_")}`
                        ] > 0 && (
                          <span className="bg-[red] p-1 rounded text-white text-[12px]">
                            (
                            {
                              notifications[
                                `chat_${[userData?.userId, user?._id]
                                  .sort()
                                  .join("_")}`
                              ]
                            }
                            )
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
            </div>
            <div className="chatBox bg-[#23262f]  p-[15px] rounded  mt-5 flex-auto relative h-[650px] overflow-y-auto">
              {currentChatUser ? (
                <>
                  <div className="curor-pointer flex flex-wrap gap-2 items-center my-2 border-b-2 border-r-white border-white-100 p-4 bg-[#3b3e46] rounded">
                    {currentChatUser?.profile?.profilePicture ? (
                      <Image
                        src={`${BASE_URL1}/${currentChatUser?.profile?.profilePicture}`}
                        alt="profile-img"
                        height={50}
                        width={50}
                        className="rounded-full w-[50px] h-[50px] object-cover"
                      />
                    ) : (
                      <div className="w-[50px] h-[50px] rounded-full bg-white-200 flex items-center justify-center">
                        <span>{currentChatUser.name.charAt(0)}</span>
                      </div>
                    )}
                    <div className="">
                      <h6 className="font-bold text-[14px] text-white">
                        {currentChatUser.name}
                      </h6>
                    </div>
                  </div>
                  <div className="chat-window h-[63%] bg-[#3b3b3b7a] rounded overflow-y-auto p-3">
                    {messages?.map((msg, index) => (
                      <div
                        key={index}
                        className={
                          msg.userId === userData?.userId
                            ? "my-message"
                            : msg.user === userData?.userId
                            ? "my-message"
                            : "other-message"
                        }
                        style={{
                          marginLeft:
                            msg.userId === userData?.userId
                              ? "auto"
                              : msg.user === userData?.userId
                              ? "auto"
                              : "",
                          marginRight:
                            msg.userId === userData?.userId
                              ? ""
                              : msg.user === userData?.userId
                              ? ""
                              : "auto",
                          maxWidth: "50%",
                          background: "#23262f",
                          marginBottom: "10px",
                          borderRadius: "14px",
                          padding: "9px 12px",
                          wordBreak: "break-word",
                        }}
                      >
                        {msg.message}
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-2 w-full left-0">
                    <Chat getRecentChats={getRecentChats} />
                  </div>
                </>
              ) : (
                <p className="flex items-center justify-center h-full ">
                  + New Chat
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
