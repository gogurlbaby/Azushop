"use client";

import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const toggleWishlist = (product) => {
    setWishlist((prevWislist) => {
      const exists = prevWislist.find((item) => item.id === product.id);

      if (exists) {
        return prevWislist.filter((item) => item.id !== product.id);
      } else {
        return [...prevWislist, product];
      }
    });
  };

  return (
    <CartContext.Provider value={{ cart, wishlist, addToCart, toggleWishlist }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
