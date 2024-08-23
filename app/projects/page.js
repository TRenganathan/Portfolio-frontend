"use client";
import Image from "next/image";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import FloatingNavbar from "../../components/ui/FloatingNavbar";
import { projects } from "../../data";
import Link from "next/link";
import { Button } from "@mui/material";
const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1,
};
export default function Projects() {
  return (
    <>
      <div>
        <FloatingNavbar />
        <Masonry
          style={{
            paddingTop: "50px",
            maxWidth: "1024px",
            margin: "auto",
            gap: "10px",
          }}
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {projects.map((item, i) => (
            <div
              key={i}
              className="bg-[#24262b] w-full flex flex-col flex-nowrap"
              style={{
                height: "auto",
                marginBottom: "13px",
                filter: "drop-shadow(-1px 4px 8px yellow)",
              }}
            >
              <div className="">
                {item.projectImage ? (
                  <img
                    src={
                      Object.keys(item.projectImage).length
                        ? item.projectImage
                        : "/default-prjct.jpg"
                    }
                    alt="cover"
                    className=" w-full h-full object-cover"
                    style={{ height: i % 2 == 0 ? "160px" : "230px" }}
                  />
                ) : (
                  <img
                    src={"/default-prjct.jpg"}
                    alt="cover"
                    className=" w-full h-full object-cover"
                    style={{ height: i % 2 == 0 ? "160px" : "230px" }}
                  />
                )}
              </div>
              <div className="p-3 pb-5">
                <h1 className="font-semibold text-[16px] text-base line-clamp-1">
                  {item.title}
                </h1>
                <h3 className="text-[14px]">
                  Category : <span className="font-semibold">web App</span>
                </h3>
                <Button
                  sx={{
                    marginRight: "auto",
                    textTransform: "capitalize",
                    textAlign: "left",
                    padding: "0 10px",
                    backgroundColor: "#4cde6a",
                    color: "#fff",
                  }}
                >
                  Read More
                </Button>
              </div>
            </div>
          ))}
        </Masonry>
      </div>
    </>
  );
}
