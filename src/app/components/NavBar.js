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

function NavBar() {
  const [active, setActive] = useState("home");
  const router = useRouter();
  const { cart, wishlist } = useCart();

  const handleNavClick = (navItem, route) => {
    setActive(navItem);
    router.push(route);
  };
  return (
    <div>
      <Navbar expand="lg" className="navbar">
        <Container fluid>
          <Navbar.Brand
            className="navbar-brand"
            onClick={() => handleNavClick("home", "/")}
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
                <Nav.Link
                  className={`nav-link ${active === "login" ? "active" : ""}`}
                  onClick={() => handleNavClick("login", "/login")}
                >
                  <LogIn />
                  Login
                </Nav.Link>

                <Nav.Link
                  className={`nav-link ${
                    active === "register" ? "active" : ""
                  }`}
                  onClick={() => handleNavClick("register", "/register")}
                >
                  <User />
                  Register
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
