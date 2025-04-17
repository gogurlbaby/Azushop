import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "../context/CartContext";

function AuthModals() {
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
    <div className="">
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle
              className="text-black text-2xl font-sans font-normal text-left"
              style={{ padding: "1rem" }}
            >
              Login
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleLoginSubmit}
            className="space-y-4"
            style={{ padding: "1rem" }}
          >
            <div>
              <Input
                type="email"
                placeholder="Email address *"
                required
                className="xl:w-[30rem] w-full border border-solid border-[#E6EFF5] bg-[#E6EFF5] text-black"
                style={{
                  padding: "0.5rem 1.5rem",
                  borderRadius: "5px",
                }}
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password *"
                required
                className="xl:w-[30rem] w-full border border-solid border-[#E6EFF5] bg-[#E6EFF5] text-black"
                style={{
                  padding: "0.5rem 1.5rem",
                  borderRadius: "5px",
                  marginTop: "2rem",
                }}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#01589A] flex justify-center items-center border border-solid border-[#01589A] text-white text-lg font-sans font-semibold"
              style={{
                padding: "0.5rem 0",
                borderRadius: "5px",
                marginTop: "2rem",
              }}
            >
              Login
            </button>
            <p
              className="text-black text-md font-sans font-normal text-center underline cursor-pointer"
              style={{ marginTop: "2rem" }}
            >
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

      <Dialog
        open={registerOpen}
        onOpenChange={setRegisterOpen}
        style={{ padding: "2.5rem 5rem" }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle
              className="text-black text-2xl font-sans font-normal text-left"
              style={{ padding: "1rem" }}
            >
              Register
            </DialogTitle>{" "}
          </DialogHeader>
          <form
            onSubmit={handleRegisterSubmit}
            className="space-y-4"
            style={{ padding: "1rem" }}
          >
            <div>
              <Input
                type="text"
                placeholder="Full name"
                required
                className="xl:w-[30rem] w-full border border-solid border-[#E6EFF5] bg-[#E6EFF5] text-black"
                style={{
                  padding: "0.5rem 1.5rem",
                  borderRadius: "5px",
                }}
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email address *"
                required
                className="xl:w-[30rem] w-full border border-solid border-[#E6EFF5] bg-[#E6EFF5] text-black"
                style={{
                  padding: "0.5rem 1.5rem",
                  borderRadius: "5px",
                  marginTop: "2rem",
                }}
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password *"
                required
                className="xl:w-[30rem] w-full border border-solid border-[#E6EFF5] bg-[#E6EFF5] text-black"
                style={{
                  padding: "0.5rem 1.5rem",
                  borderRadius: "5px",
                  marginTop: "2rem",
                }}
              />
            </div>
            <div>
              <Input
                type="confirmPassword"
                placeholder="Confirm password *"
                required
                className="xl:w-[30rem] w-full border border-solid border-[#E6EFF5] bg-[#E6EFF5] text-black"
                style={{
                  padding: "0.5rem 1.5rem",
                  borderRadius: "5px",
                  marginTop: "2rem",
                }}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#01589A] flex justify-center items-center border border-solid border-[#01589A] text-white text-lg font-sans font-semibold"
              style={{
                padding: "0.5rem 0",
                borderRadius: "5px",
                marginTop: "2rem",
              }}
            >
              Register
            </button>
            <p
              className="text-black text-md font-sans font-normal text-center underline cursor-pointer"
              style={{ marginTop: "2rem" }}
            >
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

export default AuthModals;
