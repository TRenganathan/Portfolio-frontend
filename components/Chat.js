import React, { useContext, useEffect, useState, useRef } from "react";
import io from "socket.io-client";

import { getDecryptedCookie } from "./../lib/cookiesData/cookiesdata";
import userContext from "../lib/context/userContext";
import { BASE_URL1 } from "../data";
import Peer from "peerjs";

const socket = io(`${BASE_URL1}`, {
  withCredentials: true,
});

export const Chat = ({ getRecentChats }) => {
  const getCookies = getDecryptedCookie("userData");
  const userData = getCookies ? JSON.parse(getCookies) : null;
  const { messages, setMessages, activeChatroomId } = useContext(userContext);
  const [message, setMessage] = useState("");
  const [call, setCall] = useState(null);
  const [isReceivingCall, setIsReceivingCall] = useState(false);

  const peerRef = useRef();
  const [stream, setStream] = useState();

  useEffect(() => {
    socket.emit("join", {
      userId: userData.userId,
      chatroomId: activeChatroomId,
    });

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("call-user", (data) => {
      console.log("Receiving call from: ", data);
      setCall(data);
      setIsReceivingCall(true);
    });

    return () => {
      socket.off("message");
      socket.off("call-user");
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
  // const startCall = async (isVideoCall) => {
  //   const stream = await navigator.mediaDevices.getUserMedia({
  //     video: isVideoCall,
  //     audio: true,
  //   });
  //   setStream(stream);
  //   myVideo.current.srcObject = stream;

  //   peerRef.current = new SimplePeer({
  //     initiator: true,
  //     trickle: false,
  //     stream,
  //   });

  //   peerRef.current.on("signal", (signal) => {
  //     socket.emit("call-user", {
  //       userToCall: activeChatroomId,
  //       signal,
  //       from: userData.userId,
  //       isVideoCall,
  //     });
  //   });

  //   peerRef.current.on("stream", (userStream) => {
  //     userVideo.current.srcObject = userStream;
  //     console.log("Received remote stream", userStream);
  //   });
  // };

  // const answerCall = async () => {
  //   try {
  //     console.log("Answering call from:", call.from);
  //     setIsReceivingCall(false);

  //     if (stream) {
  //       stream.getTracks().forEach((track) => track.stop());
  //     }

  //     const newStream = await navigator.mediaDevices.getUserMedia({
  //       video: call.isVideoCall,
  //       audio: true,
  //     });
  //     setStream(newStream);
  //     myVideo.current.srcObject = newStream;

  //     peerRef.current = new SimplePeer({
  //       initiator: false,
  //       trickle: false,
  //       stream: newStream,
  //     });

  //     peerRef.current.on("signal", (signal) => {
  //       socket.emit("answer-call", { signal, to: call.from });
  //     });

  //     peerRef.current.on("stream", (userStream) => {
  //       userVideo.current.srcObject = userStream;
  //       console.log("Received remote stream on answer", userStream);
  //     });

  //     peerRef.current.signal(call.signal);
  //   } catch (error) {
  //     console.error("Error answering call:", error);
  //     handleMediaError(error);
  //   }
  // };

  const handleMediaError = (error) => {
    if (error.name === "NotAllowedError") {
      alert(
        "Access to media devices is not allowed. Please ensure you have given permission."
      );
    } else if (error.name === "NotFoundError") {
      alert(
        "No media devices found. Please ensure your camera and microphone are connected."
      );
    } else if (
      error.name === "NotReadableError" ||
      error.name === "TrackStartError"
    ) {
      alert(
        "Media device is already in use. Please ensure no other applications are using your camera or microphone."
      );
    } else {
      alert(
        "Error answering call. Please ensure your camera and microphone are not being used by another application."
      );
    }
  };

  useEffect(() => {
    socket.on("call-accepted", (signal) => {
      peerRef.current.signal(signal);
    });
  }, []);

  return (
    <div>
      <input
        placeholder="Message Here...."
        className="text-white w-full border-blue-200 rounded-md p-3"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage() : null)}
      />
      <button
        className="bg-[#2f80ed] text-white w-full rounded-md mt-2 p-3"
        onClick={sendMessage}
      >
        Send Message
      </button>
    </div>
  );
};
