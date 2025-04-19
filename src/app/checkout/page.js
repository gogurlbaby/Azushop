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

function Checkout() {
  const { cart, isLoggedIn } = useCart();
  const router = useRouter();

  const checkoutSchema = Yup.object().shape({
    address: Yup.string().required("Please enter your address"),
    city: Yup.string().required("Please enter your city"),
    postalCode: Yup.string().required("Please enter your postalCode"),
    country: Yup.string().required("Please enter your country"),
  });

  const total = cart.reduce(
    (sum, item) => sum + (item.price * item.quantity || 0),
    0
  );

  const handleSubmit = (values) => {
    if (!isLoggedIn) {
      router.push("/?auth=login");
    } else {
      console.log("Order placed:", { cart, shipping: values });
    }
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

        <div className="form-container flex-col items-center">
          <Formik
            initialValues={{
              address: "",
              city: "",
              postalCode: "",
              country: "",
            }}
            validationSchema={checkoutSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values, handleChange }) => (
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
                      value={values.address}
                      onChange={handleChange}
                      placeholder="Address *"
                      className="xl:w-[30rem] w-full border border-solid border-[#E6EFF5] bg-[#E6EFF5] text-black"
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
                      value={values.city}
                      onChange={handleChange}
                      placeholder="City"
                      className="xl:w-[30rem] w-full border border-solid border-[#E6EFF5] bg-[#E6EFF5] text-black"
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
                      value={values.postalCode}
                      onChange={handleChange}
                      placeholder="Postal code"
                      className="xl:w-[30rem] w-full border border-solid border-[#E6EFF5] bg-[#E6EFF5] text-black"
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
                      type="text"
                      name="country"
                      id="country"
                      value={values.country}
                      onChange={handleChange}
                      placeholder="Country"
                      className="xl:w-[30rem] w-full border border-solid border-[#E6EFF5] bg-[#E6EFF5] text-black"
                      style={{
                        padding: "0.5rem 1.5rem",
                        borderRadius: "5px",
                        marginTop: "2rem",
                      }}
                    />
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
                      style={{ padding: "2.5rem 0", marginBottom: "2rem" }}
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
                        $0.00
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="font-sans font-normal text-black text-sm">
                        Tax:
                      </p>
                      <span className="font-sans font-semibold text-black text-md">
                        $10.00
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
                        ${(total + 10).toFixed(2)}
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
                      <Field type="radio" name="selectMethod" id="" />
                      <label
                        htmlFor="selectMethod"
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
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default Checkout;
