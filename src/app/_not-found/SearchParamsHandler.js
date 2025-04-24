"use client";

import { useSearchParams } from "next/navigation";

export default function SearchParamsHandler() {
  const searchParams = useSearchParams();
  const auth = searchParams.get("auth");

  return auth === "login" ? <p>Please log in to continue.</p> : null;
}
