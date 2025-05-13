"use client";

import React from "react";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import { NavDropdown } from "react-bootstrap";
import { ChevronDown } from "lucide-react";

function UserDropdown() {
  const router = useRouter();
  const { userName, logout } = useCart();

  const handleLogout = () => {
    logout();
    router.push("/");
  };
  return (
    <NavDropdown
      title={
        <span className="flex gap-2 items-center text-black text-md font-sans font-normal">
          {userName || "User"}
          <ChevronDown size={18} className="text-black font-normal" />
        </span>
      }
      id="user-dropdown"
      align="end"
    >
      <NavDropdown.Item
        className="text-black text-md font-sans font-normal"
        onClick={() => router.push("/orders")}
      >
        Orders
      </NavDropdown.Item>
      <NavDropdown.Item
        className="text-black text-md font-sans font-normal"
        onClick={() => router.push("/profile")}
      >
        Profile
      </NavDropdown.Item>
      <NavDropdown.Item
        className="text-black text-md font-sans font-normal"
        onClick={handleLogout}
      >
        Logout
      </NavDropdown.Item>
    </NavDropdown>
  );
}

export default UserDropdown;
