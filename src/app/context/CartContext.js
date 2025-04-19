"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  // Save cart and wishlist to localStorage when they change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product, quantity = 1) => {
    const parsedQuantity = parseInt(quantity, 10);
    const productId = parseInt(product.id, 10); // Normalize id to number

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => parseInt(item.id, 10) === productId
      );
      const parsedPrice =
        typeof product.price === "string"
          ? parseFloat(product.price)
          : product.price;
      const productWithNumberPrice = {
        ...product,
        price: parsedPrice,
        id: productId,
      };

      console.log("addToCart", {
        productId,
        parsedQuantity,
        existingItem,
        prevCart,
      });

      if (existingItem) {
        return prevCart.map((item) =>
          parseInt(item.id, 10) === productId
            ? { ...item, quantity: item.quantity + parsedQuantity }
            : item
        );
      }
      return [
        ...prevCart,
        {
          ...productWithNumberPrice,
          quantity: parsedQuantity,
          cartItemId: `${productId}-${Date.now()}`,
        },
      ];
    });
  };

  console.log("Add to Cart", addToCart);

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.cartItemId !== cartItemId)
    );
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    const parsedNewQuantity = parseInt(newQuantity, 10);
    if (parsedNewQuantity > 0) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: parsedNewQuantity }
            : item
        )
      );
    }
  };

  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const productId = parseInt(product.id, 10);
      const exists = prevWishlist.find(
        (item) => parseInt(item.id, 10) === productId
      );
      if (exists) {
        return prevWishlist.filter(
          (item) => parseInt(item.id, 10) !== productId
        );
      }
      return [...prevWishlist, { ...product, id: productId }];
    });
  };

  console.log("Cart state:", cart);

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
