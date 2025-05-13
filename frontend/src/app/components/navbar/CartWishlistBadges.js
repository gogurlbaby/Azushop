"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "../../context/CartContext";

export default function CartWishlistBadges({ type }) {
  const { cart, wishlist } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const count = type === "cart" ? cart.length : wishlist.length;

  return count > 0 ? (
    <Badge className="bg-[#01589A] py-1 px-2">{count}</Badge>
  ) : null;
}
