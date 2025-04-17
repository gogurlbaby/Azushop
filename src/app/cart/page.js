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

        {cart.length === 0 ? (
          <div>
            <p className="text-center mt-8">Your cart is empty.</p>
            <p
              className=" cursor-pointer text-center text-blue-700 text-lg"
              onClick={() => router.push("/shop")}
            >
              Shop Your Items Here.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col" style={{ marginBottom: "3.25rem" }}>
              <div>
                <div
                  className="flex justify-between items-center"
                  style={{ marginBottom: "2.5rem" }}
                >
                  <p className="font-sans font-semibold text-black text-2xl">
                    Product
                  </p>
                  <div className="flex" style={{ gap: "4rem" }}>
                    <p className="font-sans font-semibold text-black text-2xl">
                      Price
                    </p>
                    <p className="font-sans font-semibold text-black text-2xl">
                      Quantity
                    </p>
                    <p className="font-sans font-semibold text-black text-2xl">
                      Total
                    </p>
                  </div>
                </div>

                {cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex justify-center items-center border-t-1 border-t-solid border-t-[#D9D9D9] border-b-1 border-b-solid border-b-[#D9D9D9]"
                    style={{
                      padding: "2.5rem 0",
                      marginBottom: "3rem",
                      gap: "4rem",
                    }}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="lg:w-[35%] w-[50%]"
                    />
                    <div className="flex flex-col justify-center">
                      <p className="font-sans font-semibold text-black text-lg mb-2">
                        {item.title}
                      </p>
                      <p className="font-sans font-semibold text-[#999] text-md mb-2">
                        Brand: <span className="text-black">{item.brand}</span>
                      </p>
                      <button
                        className="text-[#EB001B] flex justify-start font-sans font-semibold text-md underline"
                        onClick={() => removeFromCart(item.cartItemId)}
                      >
                        Remove
                      </button>
                    </div>

                    <div>
                      {cart.map((item) => (
                        <span
                          key={item.cartItemId}
                          className="font-sans font-semibold text-black text-base"
                        >
                          ${item.price.toFixed(2)}
                        </span>
                      ))}
                    </div>
                    <div>
                      {cart.map((item) => (
                        <select
                          key={item.cartItemId}
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.cartItemId,
                              e.target.value
                            )
                          }
                          className="bg-[#E6EFF5] rounded-sm text-[#999] border border-solid border-[#E6EFF5]"
                          style={{
                            padding: "0.5rem 1rem",
                          }}
                        >
                          {[...Array(10).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      ))}
                    </div>
                    <div>
                      {cart.map((item) => (
                        <span
                          key={item.cartItemId}
                          className="font-sans font-semibold text-black text-base"
                        >
                          $
                          {(
                            getNumericPrice(item.price) * item.quantity
                          ).toFixed(2)}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="font-sans font-semibold text-black text-2xl mb-4">
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
                className="lg:w-[50%] w-full bg-[#01589A] flex justify-center items-center border border-solid border-[#01589A] text-white text-lg font-sans font-semibold"
                style={{ padding: "0.5rem 0", borderRadius: "5px" }}
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
