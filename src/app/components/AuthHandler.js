"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AuthHandler({ setLoginOpen, setRegisterOpen }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const auth = searchParams.get("auth");
    if (auth === "login") {
      setLoginOpen(true);
      setRegisterOpen(false);
    } else if (auth === "register") {
      setRegisterOpen(true);
      setLoginOpen(false);
    }
  }, [searchParams, setLoginOpen, setRegisterOpen]);

  return null;
}
