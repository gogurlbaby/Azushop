"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

function Orders() {
  const { orders, isLoggedIn, toggleOrderStatus } = useCart();
  const router = useRouter();
  // Filter state: "all", "pending", "delivered"
  const [filter, setFilter] = useState("all");
  const [registrationDate, setRegistrationDate] = useState(null);

  // Redirect to login if not logged in
  useEffect(() => {
    if (isLoggedIn === false) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  // Load registration date from localStorage
  useEffect(() => {
    const regDate = localStorage.getItem("registrationDate");
    if (regDate) {
      setRegistrationDate(new Date(regDate));
    }
  }, []);

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  // Filter orders based on status
  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  // Calculate total orders since registration
  const totalOrdersSinceRegistration = registrationDate
    ? orders.filter((order) => new Date(order.date) >= registrationDate).length
    : orders.length;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Orders</h1>

      {/* Display total orders since registration */}
      <p className="text-lg mb-4">
        <strong>Total Orders:</strong> {totalOrdersSinceRegistration}
      </p>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg ${
            filter === "all"
              ? "bg-[#01589A] text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 rounded-lg ${
            filter === "pending"
              ? "bg-[#01589A] text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Pending Delivery
        </button>
        <button
          onClick={() => setFilter("delivered")}
          className={`px-4 py-2 rounded-lg ${
            filter === "delivered"
              ? "bg-[#01589A] text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Delivered
        </button>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <p className="text-gray-500">
          {filter === "all"
            ? "You have no orders yet."
            : `No ${filter} orders found.`}
        </p>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
              <p className="text-gray-600">
                Date: {new Date(order.date).toLocaleString()}
              </p>
              <p className="text-gray-600">Total: ${order.total.toFixed(2)}</p>
              <p className="text-gray-600">
                <strong>Status:</strong>{" "}
                {order.status === "pending" ? "Pending Delivery" : "Delivered"}
              </p>
              <button
                onClick={() => toggleOrderStatus(order.id)}
                className="mt-2 px-4 py-1 bg-[#01589A] text-white rounded-lg"
              >
                Toggle Status (For Testing)
              </button>
              <div className="mt-2">
                <h3 className="text-lg font-medium">Items:</h3>
                <ul className="list-disc pl-5">
                  {order.items.map((item) => (
                    <li key={item.cartItemId}>
                      {item.name || "Item"} (x{item.quantity}) - $
                      {(item.price * item.quantity).toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
