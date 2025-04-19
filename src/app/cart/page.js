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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slash } from "lucide-react";
import "../styles/cart.css";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  const handleQuantityChange = (cartItemId, value) => {
    const newQuantity = parseInt(value);
    if (newQuantity > 0) updateQuantity(cartItemId, newQuantity);
  };

  const getNumericPrice = (price) => {
    return typeof price === "string" ? parseFloat(price) : price || 0;
  };

  const total = cart.reduce((sum, item) => {
    const numericPrice = getNumericPrice(item.price);
    return sum + numericPrice * item.quantity;
  }, 0);

  return (
    <>
      <Banner title="Cart" />

      <div className="cart-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb className="flex justify-center items-center mb-8">
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

        {cart.length === 0 ? (
          <div className="text-center mt-8">
            <p className="text-lg text-black mb-4">Your cart is empty.</p>
            <p
              className="cursor-pointer text-blue-700 text-lg"
              onClick={() => router.push("/shop")}
            >
              Shop Your Items Here
            </p>
          </div>
        ) : (
          <>
            <div style={{ marginTop: "3.25rem" }}>
              <div className="hidden md:grid md:grid-cols-12 md:gap-8 border-b border-[#D9D9D9] py-4">
                <p className="col-span-6 font-sans font-semibold text-black text-2xl">
                  Product
                </p>
                <p className="col-span-2 font-sans font-semibold text-black text-2xl text-center">
                  Price
                </p>
                <p className="col-span-2 font-sans font-semibold text-black text-2xl text-center">
                  Quantity
                </p>
                <p className="col-span-2 font-sans font-semibold text-black text-2xl text-center">
                  Total
                </p>
              </div>

              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="cart-flex md:grid md:grid-cols-12 md:gap-8 flex flex-col border-[#D9D9D9] border-b mb-4 py-6"
                >
                  <div className="col-span-6 flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="md:w-32 w-full object-cover rounded-md"
                    />
                    <div className="flex flex-col">
                      <p className="font-sans font-semibold text-black text-lg mb-2">
                        {item.title}
                      </p>
                      <p className="font-sans font-semibold text-[#999] text-md mb-2">
                        Brand: <span className="text-black">{item.brand}</span>
                      </p>
                      <button
                        className="text-[#EB001B] font-sans font-semibold text-md underline text-left"
                        onClick={() => removeFromCart(item.cartItemId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2 flex flex-col md:items-center md:justify-center mb-4 md:mb-0">
                    <span className="font-sans font-semibold text-[#999] mb-2 text-sm md:hidden">
                      Price
                    </span>
                    <span className="font-sans font-semibold text-black text-base">
                      ${getNumericPrice(item.price).toFixed(2)}
                    </span>
                  </div>

                  <div className="col-span-2 flex flex-col md:items-center md:justify-center mb-4 md:mb-0">
                    <span className="font-sans font-semibold text-[#999] mb-2 text-sm md:hidden">
                      Quantity
                    </span>
                    <Select
                      value={String(item.quantity)}
                      onValueChange={(value) =>
                        handleQuantityChange(item.cartItemId, value)
                      }
                    >
                      <SelectTrigger className="bg-[#E6EFF5] rounded-md text-[#999] border border-[#E6EFF5]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(10).keys()].map((x) => (
                          <SelectItem key={x + 1} value={String(x + 1)}>
                            {x + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-2 flex flex-col md:items-center md:justify-center mb-4 md:mb-0">
                    <span className="font-sans font-semibold  mb-2 text-[#999] text-sm md:hidden">
                      Total
                    </span>
                    <span className="font-sans font-semibold text-black text-base">
                      $
                      {(getNumericPrice(item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="font-sans font-semibold text-black text-2xl my-4">
                Items: <span>{cart.length}</span>
              </p>
              <p
                className="font-sans font-semibold text-black text-2xl"
                style={{ marginBottom: "1.5rem" }}
              >
                Total: <span>${total.toFixed(2)}</span>{" "}
              </p>
              <button
                type="submit"
                onClick={() => router.push("/checkout")}
                className="md:w-[30%] w-full bg-[#01589A] flex justify-center items-center border border-solid border-[#01589A] text-white text-lg font-sans font-semibold"
                style={{ padding: "0.5rem 1.5rem", borderRadius: "5px" }}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
