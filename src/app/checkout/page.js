"use client";

import React from "react";
import Banner from "../components/Banner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import "../styles/checkout.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { countries } from "countries-list";

function Checkout() {
  const { cart, isLoggedIn } = useCart();
  const router = useRouter();

  const countryNames = Object.values(countries)
    .map((c) => c.name)
    .sort();

  const checkoutSchema = Yup.object().shape({
    address: Yup.string()
      .trim()
      .min(5, "Address must be at least 5 characters long")
      .max(100, "Address cannot exceed 100 characters")
      .matches(
        /^[a-zA-Z0-9\s,.-]+$/,
        "Address can only contain letters, numbers, spaces, commas, periods, or hyphens"
      )
      .required("Please enter your address"),
    city: Yup.string()
      .trim()
      .min(2, "City must be at least 2 characters long")
      .max(50, "City cannot exceed 50 characters")
      .matches(
        /^[a-zA-Z\s-]+$/,
        "City can only contain letters, spaces, or hyphens"
      )
      .required("Please enter your city"),
    postalCode: Yup.string()
      .trim()
      .min(5, "Postal code must be at least 5 characters")
      .max(10, "Postal code cannot exceed 10 characters")
      .matches(
        /^[a-zA-Z0-9\s-]+$/,
        "Postal code can only contain letters, numbers, spaces, or hyphens"
      )
      .required("Please enter your postal code"),
    country: Yup.string()
      .oneOf(countryNames, "Please select a valid country")
      .required("Please select your country"),
    selectMethod: Yup.string().required("Please select a payment method"),
  });

  const calculateShippingFee = (cartTotal, country) => {
    if (cartTotal >= 100) return 0;
    if (country === "United States") return 10;
    if (country === "Canada") return 15;
    return 20;
  };

  const calculateTaxFee = (cartTotal, country) => {
    if (country === "United States") return cartTotal * 0.08;
    if (country === "Canada") return cartTotal * 0.05;
    return 0;
  };

  const total = cart.reduce(
    (sum, item) => sum + (item.price * item.quantity || 0),
    0
  );

  const handleSubmit = (values, { setSubmitting }) => {
    if (!isLoggedIn) {
      router.push("/?auth=login");
    } else {
      console.log("Order placed:", {
        cart,
        shipping: values,
        shippingFee: calculateShippingFee(total, values.country),
        taxFee: calculateTaxFee(total, values.country),
      });
    }
    setSubmitting(false);
  };

  return (
    <>
      <Banner title="Checkout" />
      <div className="checkout-container">
        <Breadcrumb className="flex justify-center items-center">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="text-black font-sans text-xl"
                style={{ textDecoration: "none" }}
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-black font-bold font-sans text-xl">
                Checkout
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {cart.length === 0 ? (
          <div className="text-center mt-8">
            <p className="text-lg text-black mb-4">Your cart is empty.</p>
            <p
              className="cursor-pointer text-blue-700 text-lg"
              onClick={() => router.push("/shop")}
            >
              Shop Your Items Here
            </p>
          </div>
        ) : (
          <div className="form-container flex-col items-center">
            <Formik
              initialValues={{
                address: "",
                city: "",
                postalCode: "",
                country: "",
                selectMethod: "",
              }}
              validationSchema={checkoutSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, values, setFieldValue }) => {
                const shippingFee = calculateShippingFee(total, values.country);
                const taxFee = calculateTaxFee(total, values.country);
                console.log("Checkout state:", {
                  country: values.country,
                  shippingFee,
                  taxFee,
                  total,
                });
                return (
                  <Form className="lg:flex-row lg:justify-around flex flex-col">
                    <div className="">
                      <p
                        className="font-sans font-semibold text-black text-2xl"
                        style={{ marginBottom: "2rem" }}
                      >
                        Billing Details
                      </p>
                      <div>
                        {" "}
                        <Field
                          type="text"
                          name="address"
                          id="address"
                          placeholder="Address *"
                          className="lg:min-w-lg mx-auto w-full border border-solid border-[#E6EFF5] bg-[#E6EFF5] text-black"
                          style={{
                            padding: "0.5rem 1.5rem",
                            borderRadius: "5px",
                          }}
                        />
                        {errors.address && touched.address ? (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.address}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="city"
                          id="city"
                          placeholder="City"
                          className="lg:min-w-lg mx-auto w-full border border-solid border-[#E6EFF5] bg-[#E6EFF5] text-black"
                          style={{
                            padding: "0.5rem 1.5rem",
                            borderRadius: "5px",
                            marginTop: "2rem",
                          }}
                        />
                        {errors.city && touched.city ? (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.city}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="postalCode"
                          id="postalCode"
                          placeholder="Postal code"
                          className="lg:min-w-lg mx-auto w-full border border-solid border-[#E6EFF5] bg-[#E6EFF5] text-black"
                          style={{
                            padding: "0.5rem 1.5rem",
                            borderRadius: "5px",
                            marginTop: "2rem",
                          }}
                        />
                        {errors.postalCode && touched.postalCode ? (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.postalCode}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <Field
                          as="select"
                          name="country"
                          id="country"
                          placeholder="Country"
                          className="lg:min-w-lg mx-auto w-full border border-solid border-[#E6EFF5] bg-[#E6EFF5] text-black"
                          style={{
                            padding: "0.5rem 1.5rem",
                            borderRadius: "5px",
                            marginTop: "2rem",
                          }}
                          onChange={(e) => {
                            console.log("Country selected:", e.target.value);
                            setFieldValue("country", e.target.value);
                          }}
                        >
                          <option value="">Select a country *</option>
                          {countryNames.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </Field>
                        {errors.country && touched.country ? (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.country}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="">
                      <p
                        className="product font-sans font-semibold text-black text-2xl"
                        style={{ marginBottom: "2rem" }}
                      >
                        Products
                      </p>
                      {cart.map((item) => (
                        <div
                          key={item.cartItemId}
                          className="bg-[#F9FBFC] flex justify-between items-center border-b-1 border-b-solid border-b-[#D9D9D9]"
                          style={{ padding: "1rem 0", marginBottom: "2rem" }}
                        >
                          <div className="lg:flex-row flex flex-col gap-0.5">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="lg:w-32 md:w-100 w-full object-cover rounded-md"
                            />
                            <div className="">
                              <p className="font-sans font-semibold text-black text-md mb-2">
                                {item.title}
                              </p>
                              <p className="font-sans font-semibold text-[#999] text-md mb-2">
                                Brand:{" "}
                                <span className="text-black">{item.brand}</span>
                              </p>
                              <span className="font-sans font-semibold text-black text-md mb-2">
                                ${item.price.toFixed(2)}
                              </span>
                            </div>
                          </div>
                          <span className="lg:block hidden font-sans font-semibold text-black text-lg mb-2">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}

                      <div
                        className="border-b-1 border-b-solid border-b-[#D9D9D9]"
                        style={{ padding: "0.5rem 0" }}
                      >
                        <p className="font-sans font-semibold text-black text-base mb-2">
                          Shipping
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="font-sans font-normal text-black text-sm mb-1">
                            Shipping fees
                          </p>
                          <span className="font-sans font-semibold text-black text-md">
                            ${shippingFee.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="font-sans font-normal text-black text-sm">
                            Tax:
                          </p>
                          <span className="font-sans font-semibold text-black text-md">
                            ${taxFee.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div
                        className="border-b-1 border-b-solid border-b-[#D9D9D9]"
                        style={{ padding: "1rem 0" }}
                      >
                        <div className="flex justify-between items-center">
                          <p className="font-sans font-semibold text-black text-base">
                            Total
                          </p>
                          <span className="font-sans font-semibold text-black text-md">
                            ${(total + shippingFee + taxFee).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div
                        className="border-b-1 border-b-solid border-b-[#D9D9D9]"
                        style={{ padding: "1rem 0", marginBottom: "2.5rem" }}
                      >
                        <p className="font-sans font-semibold text-black text-base mb-1">
                          Select Method
                        </p>
                        <div className=" flex gap-2">
                          <Field
                            type="radio"
                            name="selectMethod"
                            id="paypal"
                            value="paypal"
                          />
                          <label
                            htmlFor="paypal"
                            className="font-sans font-normal text-black text-md"
                          >
                            Paypal or credit card
                          </label>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#01589A] flex justify-center items-center border border-solid border-[#01589A] text-white text-lg font-sans font-semibold"
                        style={{ padding: "0.5rem 0", borderRadius: "5px" }}
                      >
                        Place order
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        )}
      </div>
    </>
  );
}

export default Checkout;
