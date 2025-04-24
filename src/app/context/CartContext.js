"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userName, setUserName] = useState("");

  // Load cart, wishlist, and orders from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }

    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }

    const token = localStorage.getItem("token");
    const savedUserName = localStorage.getItem("userName");

    if (token && savedUserName) {
      setIsLoggedIn(true);
      setUserName(savedUserName);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Save cart, wishlist, and orders to localStorage when they change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // Simulate delivery status update (for demo purposes)
  useEffect(() => {
    if (orders.length > 0) {
      const timer = setTimeout(() => {
        setOrders((prevOrders) =>
          prevOrders.map((order) => {
            if (order.status === "pending" && Math.random() > 0.5) {
              return { ...order, status: "delivered" };
            }
            return order;
          })
        );
      }, 5000); // Simulate delivery after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [orders]);

  const addToCart = (product, quantity = 1) => {
    const parsedQuantity = parseInt(quantity, 10);
    const productId = parseInt(product.id, 10);

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

  const createOrder = () => {
    if (cart.length === 0) {
      return {
        success: false,
        message: "Cart is empty",
      };
    }

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const order = {
      id: `order-${Date.now()}`,
      items: [...cart],
      total,
      date: new Date().toISOString(),
      status: "pending", // Initial status
    };

    setOrders((prevOrders) => [...prevOrders, order]);
    setCart([]);
    localStorage.removeItem("cart");
    return { success: true, message: "Order created successfully" };
  };

  // Function to manually toggle order status for testing
  const toggleOrderStatus = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: order.status === "pending" ? "delivered" : "pending",
            }
          : order
      )
    );
  };

  const login = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
    localStorage.setItem("userName", name);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName("");
    localStorage.removeItem("token");
    setCart([]);
    setWishlist([]);
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        createOrder,
        toggleOrderStatus,
        isLoggedIn,
        login,
        logout,
        userName,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
