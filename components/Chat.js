import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { getDecryptedCookie } from "./../lib/cookiesData/cookiesdata";

import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL, BASE_URL1 } from "../data";
import userContext from "../lib/context/userContext";
const socket = io(`${BASE_URL1}`, {
  withCredentials: true,
});

export const Chat = ({ getRecentChats }) => {
  const getCookies = getDecryptedCookie("userData");
  const userData = getCookies ? JSON.parse(getCookies) : null;

  const [message, setMessage] = useState("");
  const { messages, setMessages, activeChatroomId, setActiveChatroomId } =
    useContext(userContext);

  useEffect(() => {
    socket.emit("join", {
      userId: userData.userId,
      chatroomId: activeChatroomId,
    });

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [activeChatroomId, userData?.userId]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("message", {
        chatroomId: activeChatroomId,
        message: { userId: userData.userId, message },
      });
      setMessage("");

      if (userData && activeChatroomId) {
        sendMsgForRecentChat();
      }
    }
  };
  const sendMsgForRecentChat = async () => {
    const [userId1, userId2] = activeChatroomId.split("_").slice(1);

    const recipientId = userId2;
    try {
      const newData = {
        senderId: userData?.userId,
        receiverId: userId2,
        message: message,
      };
      const { data } = await axios.post(`${BASE_URL}/chat/send`, newData);
      getRecentChats(userData?.userId);
    } catch (error) {}
  };
  return (
    <div className="border-[gray] border-2 rounded p-[20px] mx-1">
      <input
        placeholder="Message Here...."
        className="text-white w-full border-blue-200 rounded-md p-3"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage() : null)}
      />
      <button
        style={{ background: "tail" }}
        className=" bg-[#2f80ed] text-white w-full rounded-md mt-2 p-3"
        onClick={sendMessage}
      >
        Send Message
      </button>
    </div>
  );
};
