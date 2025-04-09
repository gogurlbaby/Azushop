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
import { Button } from "@/components/ui/button";

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
                <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
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
                      <DialogTitle>Login</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                      <div>
                        <Input type="email" placeholder="Email" required />
                      </div>
                      <div>
                        <Input
                          type="password"
                          placeholder="Password"
                          required
                        />
                      </div>
                      <Button type="submit">Login</Button>
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
                      <DialogTitle>Register</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleRegisterSubmit} className="space-y-4">
                      <div>
                        <Input type="text" placeholder="Name" required />
                      </div>
                      <div>
                        <Input type="email" placeholder="Email" required />
                      </div>
                      <div>
                        <Input
                          type="password"
                          placeholder="Password"
                          required
                        />
                      </div>
                      <Button type="submit">Register</Button>
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
