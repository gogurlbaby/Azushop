"use client";

import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";
import { useRouter, useSearchParams } from "next/navigation";
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
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

function NavBar() {
  const [active, setActive] = useState("home");
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart, wishlist, login } = useCart();

  useEffect(() => {
    const auth = searchParams.get("auth");
    if (auth) {
      setLoginOpen(true);
      setRegisterOpen(false);
    } else if (auth === "register") {
      setRegisterOpen(true);
      setLoginOpen(false);
    }
  }, [searchParams]);

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
          <Navbar.Brand className="navbar-brand" href="/">
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
                <LoginModal
                  open={loginOpen}
                  onOpenChange={setLoginOpen}
                  onToggle={() => {
                    setLoginOpen(false);
                    setRegisterOpen(true);
                  }}
                  onSubmit={handleLoginSubmit}
                >
                  <Nav.Link
                    variant="ghost"
                    className="nav-link"
                    onClick={() => setLoginOpen(true)}
                  >
                    <LogIn />
                    Login
                  </Nav.Link>
                </LoginModal>

                <RegisterModal
                  open={registerOpen}
                  onOpenChange={setRegisterOpen}
                  onToggle={() => {
                    setRegisterOpen(false);
                    setLoginOpen(true);
                  }}
                  onSubmit={handleRegisterSubmit}
                >
                  <Nav.Link
                    className="nav-link"
                    onClick={() => setRegisterOpen(true)}
                  >
                    <User />
                    Register
                  </Nav.Link>
                </RegisterModal>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
