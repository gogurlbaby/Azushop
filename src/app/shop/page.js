"use client";

import React, { useState } from "react";
import Banner from "../components/Banner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import productsData from "../json/products.json";
import { useCart } from "../context/CartContext";

function Shop() {
  const { addToCart, toggleWishlist } = useCart();

  const viewProduct = (product) => {
    alert(`Viewing details for ${product.title}`);
  };

  return (
    <div>
      <Banner
        title="New Arrival"
        subtitle="Shop through our latest selection of Products"
      />

      <div className="bg-white" style={{ padding: "1.375rem 2.5rem 9.625rem" }}>
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
                Shop
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="lg:flex-row flex flex-col gap-16">
          {/* Categories  Sidebar */}
          <div style={{ paddingTop: "6.875rem" }}>
            <div className="">
              <p>Shop By</p>
              <div>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Product Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="apple">Laptops</SelectItem>
                      <SelectItem value="banana">Phones</SelectItem>
                      <SelectItem value="blueberry">Cameras</SelectItem>
                      <SelectItem value="grapes">Watches</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <hr className="w-full border-[0.5px] border-solid bg-[#D9D9D9]" />

            <div className="">
              <p>Brand</p>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <div className="flex gap-1.5 items-center">
                      <Checkbox id="brand1" />
                      <label>Apple</label>
                    </div>
                    <div className="flex gap-1.5 items-center">
                      <Checkbox id="brand2" />
                      <label>Samsung</label>
                    </div>
                    <div className="flex gap-1.5 items-center">
                      <Checkbox id="brand3" />
                      <label>Lenovo</label>
                    </div>
                    <div className="flex gap-1.5 items-center">
                      <Checkbox id="brand4" />
                      <label>Sony</label>
                    </div>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <hr className="w-full border-[0.5px] border-solid bg-[#D9D9D9]" />

            <div>
              <p>Price</p>{" "}
              <input
                type="text"
                id="price"
                placeholder="Enter price"
                className="bg-[#E6EFF5] w-full rounded-md py-2 px-8 border border-solid border-[#E6EFF5]"
                style={{ marginBottom: "2rem" }}
              />
              <button
                style={{ borderRadius: "5px" }}
                className="bg-[#01589A] w-full py-2 px-8 border border-solid border-[#01589A] font-semibold font-sans text-lg text-white flex justify-center items-center"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Products Display */}
          <div
            className="lg:grid-cols-3 grid grid-cols-1 gap-8"
            style={{ paddingTop: "6.875rem" }}
          >
            {productsData.map((product) => (
              <div
                className="bg-[#F9FBFC] flex justify-center flex-col items-center rounded-lg border border-solid: border-[#F9FBFC]"
                style={{ padding: "0.5rem 1rem 1.5rem" }}
                key={product.id}
              >
                <span
                  className="text-[#01589A] relative lg:left-[8.5rem] left-[7rem]"
                  style={{ marginTop: "0.5rem" }}
                >
                  {product.brand}
                </span>
                <img
                  src={product.imageUrl}
                  alt=""
                  style={{ marginBottom: "1rem" }}
                />
                <p className="font-semibold">{product.title}</p>
                <p className="font-normal">{product.description}</p>
                <span
                  className="text-[#01589A] font-semibold"
                  style={{ marginBottom: "1rem" }}
                >
                  ${product.price}
                </span>
                <div className="flex gap-2" style={{ marginTop: "2rem" }}>
                  <ShoppingCart
                    className="cursor-pointer hover:text-blue-700"
                    onClick={() => addToCart(product)}
                  />
                  <Heart
                    // className={`cursor-pointer ${
                    //   wishlist.some((item) => item.id === product.id)
                    //     ? "text-red-500"
                    //     : "text-black"
                    // }`}
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => toggleWishlist(product.id)}
                  />
                  <Eye
                    className="cursor-pointer  hover:text-green-600"
                    onClick={() => viewProduct(product)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
