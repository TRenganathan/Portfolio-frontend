// import React, { useContext, useEffect, useState } from "react";
// import io from "socket.io-client";
// import { getDecryptedCookie } from "./../lib/cookiesData/cookiesdata";

// import { toast } from "react-toastify";
// import axios from "axios";
// import { BASE_URL, BASE_URL1 } from "../data";
// import userContext from "../lib/context/userContext";
// const socket = io(`${BASE_URL1}`, {
//   withCredentials: true,
// });

// export const Chat = ({ getRecentChats }) => {
//   const getCookies = getDecryptedCookie("userData");
//   const userData = getCookies ? JSON.parse(getCookies) : null;

//   const [message, setMessage] = useState("");
//   const { messages, setMessages, activeChatroomId, setActiveChatroomId } =
//     useContext(userContext);

//   useEffect(() => {
//     socket.emit("join", {
//       userId: userData.userId,
//       chatroomId: activeChatroomId,
//     });

//     socket.on("message", (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => {
//       socket.off("message");
//     };
//   }, [activeChatroomId, userData?.userId]);

//   const sendMessage = () => {
//     if (message.trim()) {
//       socket.emit("message", {
//         chatroomId: activeChatroomId,
//         message: { userId: userData.userId, message },
//       });
//       setMessage("");

//       if (userData && activeChatroomId) {
//         sendMsgForRecentChat();
//       }
//     }
//   };
//   const sendMsgForRecentChat = async () => {
//     const [userId1, userId2] = activeChatroomId.split("_").slice(1);

//     const recipientId = userId2;
//     try {
//       const newData = {
//         senderId: userData?.userId,
//         receiverId: userId2,
//         message: message,
//       };
//       const { data } = await axios.post(`${BASE_URL}/chat/send`, newData);
//       getRecentChats(userData?.userId);
//     } catch (error) {}
//   };
//   return (
//     <div className="border-[gray] border-2 rounded p-[20px] mx-1">
//       <input
//         placeholder="Message Here...."
//         className="text-white w-full border-blue-200 rounded-md p-3"
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         onKeyPress={(e) => (e.key === "Enter" ? sendMessage() : null)}
//       />
//       <button
//         style={{ background: "tail" }}
//         className=" bg-[#2f80ed] text-white w-full rounded-md mt-2 p-3"
//         onClick={sendMessage}
//       >
//         Send Message
//       </button>
//     </div>
//   );
// };

import React, { useContext, useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import SimplePeer from "simple-peer";
import { getDecryptedCookie } from "./../lib/cookiesData/cookiesdata";
import userContext from "../lib/context/userContext";
import { BASE_URL1 } from "../data";

const socket = io(`${BASE_URL1}`, {
  withCredentials: true,
});

export const Chat = ({ getRecentChats }) => {
  const getCookies = getDecryptedCookie("userData");
  const userData = getCookies ? JSON.parse(getCookies) : null;
  const { messages, setMessages, activeChatroomId } = useContext(userContext);
  const [message, setMessage] = useState("");
  const [call, setCall] = useState(null); // New state to manage call details
  const [isReceivingCall, setIsReceivingCall] = useState(false); // State to manage incoming call status

  const myVideo = useRef();
  const userVideo = useRef();
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

  const startCall = async (isVideoCall) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: isVideoCall,
      audio: true,
    });
    setStream(stream);
    myVideo.current.srcObject = stream;

    peerRef.current = new SimplePeer({
      initiator: true,
      trickle: false,
      stream,
    });

    peerRef.current.on("signal", (signal) => {
      socket.emit("call-user", {
        userToCall: activeChatroomId,
        signal,
        from: userData.userId,
        isVideoCall,
      });
    });

    peerRef.current.on("stream", (userStream) => {
      userVideo.current.srcObject = userStream;
    });
  };

  const answerCall = async () => {
    try {
      console.log("Answering call from:", call.from);
      setIsReceivingCall(false);

      // Check if there is an existing stream and stop it
      if (stream) {
        console.log("Stopping existing media tracks");
        stream.getTracks().forEach((track) => track.stop());
      }

      // Log currently active tracks (should be none after stopping)
      if (stream) {
        const activeTracks = stream
          .getTracks()
          .filter((track) => track.readyState === "live");
        console.log("Active tracks after stopping:", activeTracks);
      }

      console.log("Requesting new media stream");
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: call.isVideoCall,
        audio: true,
      });
      console.log(" New media stream obtained", newStream);
      setStream(newStream);
      myVideo.current.srcObject = newStream;

      peerRef.current = new SimplePeer({
        initiator: false,
        trickle: false,
        stream: newStream,
      });

      peerRef.current.on("signal", (signal) => {
        console.log("Sending answer signal", signal);
        socket.emit("answer-call", { signal, to: call.to });
      });

      peerRef.current.on("stream", (userStream) => {
        console.log(" Sending Received remote stream", userStream);
        userVideo.current.srcObject = userStream;
      });

      console.log("Setting up peer signal", signal);
      peerRef.current.signal(call.signal);
    } catch (error) {
      console.error("Error answering call:", error);

      // Check if the error is related to device in use
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
    }
  };

  const hangUpCall = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    if (peerRef.current) {
      peerRef.current.destroy();
      peerRef.current = null;
    }
    setStream(null);
    myVideo.current.srcObject = null;
    userVideo.current.srcObject = null;
    setIsReceivingCall(false);
  };

  useEffect(() => {
    socket.on("call-accepted", (signal) => {
      peerRef.current.signal(signal);
    });
  }, []);
  console.log(userVideo, "userVideo");
  console.log(call, " myVideo userVideo");
  return (
    <div>
      <div>
        <video ref={myVideo} autoPlay muted />
        <video ref={userVideo} autoPlay />
      </div>
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
      <button
        className="bg-[#66ec39] w-full p-2 mb-1 text-white-100"
        onClick={() => startCall(true)}
      >
        Start Video Call
      </button>
      <button
        className="bg-[#8339de] w-full p-2 mb-1 text-white-100"
        onClick={() => startCall(false)}
      >
        Start Audio Call
      </button>
      <button
        className="bg-[red] w-full p-2 mb-1 text-white-100"
        onClick={hangUpCall}
      >
        Hang Up
      </button>
      {isReceivingCall && (
        <div>
          <h1>{call.from} is calling...</h1>
          <button
            className="bg-[#66ec39] w-full p-2 text-white-100"
            onClick={answerCall}
          >
            Answer
          </button>
        </div>
      )}
    </div>
  );
};
