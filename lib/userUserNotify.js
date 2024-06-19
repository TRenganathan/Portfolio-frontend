import React, { useEffect, useState } from "react";
import { getDecryptedCookie } from "./cookiesData/cookiesdata";
import { BASE_URL, BASE_URL1 } from "./../data/";

import io from "socket.io-client";
const socket = io(`${BASE_URL1}`, {
  withCredentials: true,
});
export default function UserUserNotify() {
  const getCookies = getDecryptedCookie("userData");
  const userData = getCookies ? JSON.parse(getCookies) : null;
  const [notifications, setNotifications] = useState({});
  const [messages, setMessages] = useState([]);
  const [activeChatroomId, setActiveChatroomId] = useState(null);

  useEffect(() => {
    if (userData) {
      socket.emit("join", {
        userId: userData.userId,
        chatroomId: `user_${userData.userId}`,
      });
      socket.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
      socket.on("notification", ({ chatroomId, message }) => {
        setNotifications((prev) => ({
          ...prev,
          [chatroomId]: (prev[chatroomId] || 0) + 1,
          message: message,
        }));
      });
      return () => {
        socket.off("notification");
      };
    }
  }, [userData]);
  return {
    notifications,
    setNotifications,
    messages,
    setMessages,
    activeChatroomId,
    setActiveChatroomId,
  };
}
