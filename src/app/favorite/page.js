import React from "react";
import Banner from "../components/Banner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash, ShoppingCart, Heart, Eye, Trash } from "lucide-react";
import "../styles/favorite.css";

function Favorite() {
  return (
    <div>
      <Banner title="Favourite" />
      <div className="favorite-container">
        <Breadcrumb className="flex justify-center items-center">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="text-black font-sans text-xl"
                style={{ textDecoration: "none" }}
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-black font-bold font-sans text-xl">
                Favourite
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div
          className="lg:grid-cols-3 grid grid-cols-1 gap-8"
          style={{ paddingTop: "5rem" }}
        >
          <div
            className="bg-[#F9FBFC] flex justify-center flex-col items-center rounded-lg border border-solid: border-[#F9FBFC]"
            style={{ padding: "0.5rem 1rem 1.5rem" }}
          >
            <span
              className="text-[#01589A] relative lg:left-[8.5rem] left-[7rem]"
              style={{ marginTop: "0.5rem" }}
            >
              Apple
            </span>
            <img
              src="/images/computer.svg"
              alt=""
              style={{ marginBottom: "1rem" }}
            />
            <p className="font-semibold">Apple MacBook Pro 2019 | 16</p>
            <p className="font-normal">
              "RAM 16.0 GB  | Memory 512 GB   Keyboard layout Eng (English) "
            </p>
            <span
              className="text-[#01589A] font-semibold"
              style={{ marginBottom: "1rem" }}
            >
              $749.99
            </span>
            <div
              className="flex gap-2 items-center"
              style={{ marginTop: "2rem" }}
            >
              <ShoppingCart className="cursor-pointer hover:text-blue-700" />
              <Heart className="cursor-pointer hover:text-red-500" />
              <Eye className="cursor-pointer  hover:text-green-600" />
              <Trash
                size={35}
                className="cursor-pointer text-white bg-[#EB001B] p-2 rounded-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Favorite;
