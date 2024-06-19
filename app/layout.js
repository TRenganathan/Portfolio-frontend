"use client";
import { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SessionProvider from "./SessionProvider";
import { createContext, useState } from "react";
import UserUserNotify from "./../lib/userUserNotify";
const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "RT",
//   description: "Modern & Minimal JS Mastery Portfolio",
// };

export const userContext = createContext();
export default function RootLayout({ children }) {
  const {
    notifications,
    setNotifications,
    messages,
    setMessages,
    activeChatroomId,
    setActiveChatroomId,
  } = UserUserNotify();
  const [currentChatUser, setCurrentChatUser] = useState(null);
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/next.svg" sizes="any" />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <userContext.Provider
            value={{
              notifications,
              setNotifications,
              messages,
              setMessages,
              activeChatroomId,
              setActiveChatroomId,
              currentChatUser,
              setCurrentChatUser,
            }}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <ToastContainer />
            </ThemeProvider>
          </userContext.Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
