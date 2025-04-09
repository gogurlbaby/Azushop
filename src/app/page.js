"use client";

import React, { useEffect, useState } from "react";
import Features from "./(home)/Features";
import Hero from "./(home)/Hero";
import TrendingProducts from "./(home)/TrendingProducts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "./context/CartContext";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const { login } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  useEffect(() => {
    const auth = searchParams.get("auth");
    if (auth === "login") setLoginOpen(true);
    if (auth === "register") setRegisterOpen(true);
  }, [searchParams]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login();
    setLoginOpen(false);
    router.push("/checkout");
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    login();
    setLoginOpen(false);
    router.push("/checkout");
  };

  return (
    <div>
      <Hero />
      <TrendingProducts />
      <Features />

      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <Input type="email" placeholder="Email" required />
            </div>
            <div>
              <Input type="password" placeholder="Password" required />
            </div>
            <Button type="submit">Login</Button>
            <p>
              Don’t have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => {
                  setLoginOpen(false);
                  setRegisterOpen(true);
                }}
              >
                Register
              </span>
            </p>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register</DialogTitle>{" "}
          </DialogHeader>
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <Input type="text" placeholder="Name" required />
            </div>
            <div>
              <Input type="email" placeholder="Email" required />
            </div>
            <div>
              <Input type="password" placeholder="Password" required />
            </div>
            <Button type="submit">Register</Button>
            <p>
              Already have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => {
                  setRegisterOpen(false);
                  setLoginOpen(true);
                }}
              >
                Login
              </span>
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
