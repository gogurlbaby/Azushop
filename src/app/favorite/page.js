"use client";

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
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

function Favorite() {
  const { wishlist, addToCart, toggleWishlist } = useCart();
  const router = useRouter();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  const handleViewProduct = (productId) => {
    router.push(`/shop/details/${productId}`);
  };

  const handleRemoveFromWishlist = (productId) => {
    toggleWishlist({ id: productId });
  };

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

        {wishlist.length === 0 ? (
          <div>
            <p className="text-center mt-8">Your wishlist is empty.</p>
            <p
              onClick={() => router.push("/shop")}
              className="cursor-pointer text-center text-blue-700 text-lg mt-8"
            >
              Add your Favorite Items Here.
            </p>
          </div>
        ) : (
          <div
            className="xl:grid-cols-4 md:grid-cols-3 grid grid-cols-1 gap-8"
            style={{ paddingTop: "5rem" }}
          >
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-[#F9FBFC] flex justify-center flex-col items-center rounded-lg border border-solid: border-[#F9FBFC]"
                style={{ padding: "0.5rem 1rem 1.5rem" }}
              >
                <span
                  className="text-[#01589A] self-end"
                  style={{ marginTop: "0.5rem" }}
                >
                  {product.brand}
                </span>
                <img
                  src={product.imageUrl}
                  alt={product.title}
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
                <div
                  className="flex gap-2 items-center"
                  style={{ marginTop: "2rem" }}
                >
                  <ShoppingCart
                    className="cursor-pointer hover:text-blue-700"
                    onClick={() => handleAddToCart(product)}
                  />
                  <Eye
                    className="cursor-pointer  hover:text-green-600"
                    onClick={() => handleViewProduct(product.id)}
                  />
                  <Trash
                    size={35}
                    className="cursor-pointer text-white bg-[#EB001B] p-2 rounded-xs"
                    onClick={() => handleRemoveFromWishlist(product.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorite;
