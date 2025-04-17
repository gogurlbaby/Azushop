"use client";

import React, { useState } from "react";
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";
import { useRouter } from "next/navigation";
import {
  House,
  ShoppingBag,
  ShoppingCart,
  Heart,
  LogIn,
  User,
} from "lucide-react";
import "../styles/navbar.css";
import { useCart } from "../context/CartContext";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

function NavBar() {
  const [active, setActive] = useState("home");
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const router = useRouter();
  const { cart, wishlist, login } = useCart();

  const handleNavClick = (navItem, route) => {
    setActive(navItem);
    router.push(route);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login();
    setLoginOpen(false);
    router.push("/checkout");
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    login();
    setRegisterOpen(false);
    router.push("/checkout");
  };

  return (
    <div>
      <Navbar expand="lg" className="navbar">
        <Container fluid>
          <Navbar.Brand
            className="navbar-brand"
            onClick={() => router.push("/")}
          >
            <p className="logo">Azushop</p>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Offcanvas
            id="responsive-navbar-nav"
            placement="end"
            className="w-full"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title> </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 gap-3">
                <Nav.Link
                  className={`nav-link ${active === "home" ? "active" : ""}`}
                  onClick={() => handleNavClick("home", "/")}
                >
                  <House />
                  Home
                </Nav.Link>
                <Nav.Link
                  className={`nav-link ${active === "shop" ? "active" : ""}`}
                  onClick={() => handleNavClick("shop", "/shop")}
                >
                  <ShoppingBag />
                  Shop
                </Nav.Link>
                <Nav.Link
                  className={`nav-link ${active === "cart" ? "active" : ""}`}
                  onClick={() => handleNavClick("cart", "/cart")}
                >
                  <ShoppingCart />
                  Cart
                  {cart.length > 0 && (
                    <Badge className="bg-[#01589A] py-1 px-2">
                      {cart.length}
                    </Badge>
                  )}
                </Nav.Link>
                <Nav.Link
                  className={`nav-link ${
                    active === "favorite" ? "active" : ""
                  }`}
                  onClick={() => handleNavClick("favorite", "/favorite")}
                >
                  <Heart />
                  Favorite
                  {wishlist.length > 0 && (
                    <Badge className="bg-[#01589A] py-1 px-2">
                      {" "}
                      {wishlist.length}
                    </Badge>
                  )}
                </Nav.Link>
              </Nav>
              <Nav className="justify-content-end flex-grow-1 pe-3 gap-3 mt-3 mt-lg-0">
                <Dialog
                  open={loginOpen}
                  onOpenChange={setLoginOpen}
                  style={{ padding: "2.5rem 5rem" }}
                >
                  <DialogTrigger asChild>
                    <Nav.Link
                      variant="ghost"
                      className="nav-link"
                      onClick={() => setLoginOpen(true)}
                    >
                      <LogIn />
                      Login
                    </Nav.Link>
                  </DialogTrigger>
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
                    </form>
                  </DialogContent>
                </Dialog>

                <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
                  <DialogTrigger asChild>
                    <Nav.Link
                      className="nav-link"
                      onClick={() => setRegisterOpen(true)}
                    >
                      <User />
                      Register
                    </Nav.Link>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle
                        className="text-black text-2xl font-sans font-normal text-left"
                        style={{ padding: "1rem" }}
                      >
                        Register
                      </DialogTitle>
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
                    </form>
                  </DialogContent>
                </Dialog>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
