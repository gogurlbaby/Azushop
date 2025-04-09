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
            <div
              className="lg:flex-row lg:justify-start lg:items-start flex flex-col justify-center items-center gap-32"
              style={{ marginBottom: "3.25rem" }}
            >
              <div>
                <p>Product</p>
                {cart.map((item) => (
                  <div key={item.cartItemId}>
                    <div className="flex">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-[30%]"
                      />
                      <div>
                        <p>{item.title}</p>
                        <p>
                          Brand: <span>{item.brand}</span>
                        </p>
                        <button
                          className="text-red-500 underline"
                          onClick={() => removeFromCart(item.cartItemId)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <p>Price</p>
                {cart.map((item) => (
                  <span key={item.cartItemId}>${item.price.toFixed(2)}</span>
                ))}
              </div>
              <div>
                <p>Quantity</p>
                {cart.map((item) => (
                  <select
                    key={item.cartItemId}
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.cartItemId, e.target.value)
                    }
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
                <p>Total</p>
                {cart.map((item) => (
                  <span key={item.cartItemId}>
                    ${(getNumericPrice(item.price) * item.quantity).toFixed(2)}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p>
                Items: <span>{cart.length}</span>
              </p>
              <p>
                Total: <span>${total.toFixed(2)}</span>{" "}
              </p>
              <button type="submit" onClick={() => router.push("/checkout")}>
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
