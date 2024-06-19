import React, { useState } from "react";
import { useRouter } from "next/navigation";

export const ChatRoomSelection = () => {
  const [roomName, setRoomName] = useState("");
  const router = useRouter();

  const handleJoinRoom = () => {
    if (roomName.trim()) {
      // Generate a unique chatroomId (you can use any method you prefer)
      const chatroomId = roomName.trim();
      router.push(`/chat/${chatroomId}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="Enter room name"
        className="borer-gray text-white bg-[green]"
      />
      <button className=" text-gray bg-[red]" onClick={handleJoinRoom}>
        Join Room
      </button>
    </div>
  );
};

export default ChatRoomSelection;
