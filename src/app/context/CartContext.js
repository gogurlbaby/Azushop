"use client";

import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingitem = prevCart.find((item) => item.id === product.id);
      const parsedPrice =
        typeof product.price === "string"
          ? parseFloat(product.price)
          : product.price;
      const productWithNumberPrice = { ...product, price: parsedPrice };

      if (existingitem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prevCart,
        {
          ...productWithNumberPrice,
          quantity,
          cartItemId: Date.now() + Math.random(),
        },
      ];
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.cartItemId !== cartItemId)
    );
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const toggleWishlist = (product) => {
    setWishlist((prevWislist) => {
      const exists = prevWislist.find((item) => item.id === product.id);

      if (exists) {
        return prevWislist.filter((item) => item.id !== product.id);
      }
      return [...prevWislist, product];
    });
  };

  const login = () => setisLoggedIn(true);
  const logout = () => setisLoggedIn(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
