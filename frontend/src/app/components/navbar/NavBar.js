"use client";

import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";
import { useRouter, usePathname } from "next/navigation";
import {
  House,
  ShoppingBag,
  ShoppingCart,
  Heart,
  LogIn,
  User,
} from "lucide-react";
import dynamic from "next/dynamic";
import "../../styles/navbar.css";
import { useCart } from "../../context/CartContext";
import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";
import { Suspense } from "react";
import AuthHandler from "./AuthHandler";
import CartWishlistBadges from "./CartWishlistBadges";
import ErrorBoundary from "./ErrorBoundary";

const UserDropdown = dynamic(() => import("./UserDropdown"), { ssr: false });

function NavBar() {
  const [active, setActive] = useState("home");
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { cart, wishlist, isLoggedIn } = useCart();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const routeToNavItem = {
      "/": "home",
      "/shop": "shop",
      "/cart": "cart",
      "/favorite": "favorite",
    };

    const currentNavItem = pathname.startsWith("/shop")
      ? "shop"
      : routeToNavItem[pathname] || "home";
    setActive(currentNavItem);
  }, [pathname]);

  const handleNavClick = (navItem, route) => {
    setActive(navItem);
    router.push(route);
  };

  const handleLoginSubmit = (values) => {
    console.log("NavBar handleLoginSubmit:", values);
    router.push("/checkout");
  };

  const handleRegisterSubmit = (values) => {
    console.log("NavBar handleRegisterSubmit:", values);
    router.push("/checkout");
  };

  return (
    <ErrorBoundary>
      <div>
        <Suspense fallback={<div></div>}>
          <AuthHandler
            setLoginOpen={setLoginOpen}
            setRegisterOpen={setRegisterOpen}
          />
        </Suspense>
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
                    {cart.length > 0 && <CartWishlistBadges type="cart" />}
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
                      <CartWishlistBadges type="wishlist" />
                    )}
                  </Nav.Link>
                </Nav>
                <Nav className="justify-content-end flex-grow-1 pe-3 gap-3 mt-3 mt-lg-0">
                  {!isHydrated || isLoggedIn === null ? (
                    <div className="w-16" />
                  ) : isLoggedIn ? (
                    <UserDropdown />
                  ) : (
                    <>
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
                    </>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </div>
    </ErrorBoundary>
  );
}

export default NavBar;
