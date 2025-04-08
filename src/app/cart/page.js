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
import "../styles/cart.css";
import products from "../json/products.json";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => setQuantity(e.target.value);
  return (
    <>
      <Banner title="Cart" />

      <div className="cart-container">
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
                Cart
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div
          className="lg:flex-row lg:justify-start lg:items-start flex flex-col justify-center items-center gap-32"
          style={{ marginBottom: "3.25rem" }}
        >
          <div>
            <p>Product</p>
            <div>
              {/* {products.map((product) => ( */}
              <div className="flex">
                <img src="/images/computer.svg" alt="" className="w-[30%]" />
                <div>
                  <p>Apple MacBook Pro 2019 | 16</p>
                  <p>
                    Brand: <span>Apple</span>
                  </p>
                  <button className="text-red-500 underline">Remove</button>
                </div>
              </div>
              {/* ))} */}
            </div>
          </div>
          <div>
            <p>Price</p>
            <span>$749.99 </span>
          </div>
          <div>
            <p>Quantity</p>
            <select value={quantity} onChange={handleQuantityChange}>
              {[...Array(10).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p>Total</p>
            <span>$749.99 </span>
          </div>
        </div>

        <div>
          <p>
            Items: <span>1</span>
          </p>
          <p>
            Total: <span>$749.99</span>{" "}
          </p>
          <button>Proceed to Checkout</button>
        </div>
      </div>
    </>
  );
};

export default Cart;
