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

        <div
          className="flex-col gap-10 items-center"
          style={{ marginTop: "8.75rem" }}
        >
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
              <Form className="lg:flex-row flex flex-col justify-between">
                <div className="">
                  <p>Billing Details</p>
                  <div>
                    {" "}
                    <Field
                      type="text"
                      name="address"
                      id="address"
                      value={values.address}
                      onChange={handleChange}
                      placeholder="Address"
                      className="border border-solid border-black"
                    />
                    {errors.address && touched.address ? (
                      <div className="text-red-500 text-sm">
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
                      className="border border-solid border-black"
                    />
                    {errors.city && touched.city ? (
                      <div className="text-red-500 text-sm">{errors.city}</div>
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
                      className="border border-solid border-black"
                    />
                    {errors.postalCode && touched.postalCode ? (
                      <div className="text-red-500 text-sm">
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
                      className="border border-solid border-black"
                    />
                    {errors.country && touched.country ? (
                      <div className="text-red-500 text-sm">
                        {errors.country}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div>
                  <p>Products</p>
                  {cart.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="flex justify-between items-center"
                    >
                      <div className="flex gap-0.5">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-[30%]"
                        />
                        <div>
                          <p>{item.title}</p>
                          <p>
                            Brand: <span>{item.brand}</span>
                          </p>
                          <span>${item.price.toFixed(2)}</span>
                        </div>
                      </div>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}

                  <div className="">
                    <p>Shipping</p>
                    <div className="flex justify-between items-center">
                      <p>Shipping fees</p>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>Tax:</p>
                      <span>$10.00</span>
                    </div>
                  </div>

                  <div className="">
                    <div className="flex justify-between items-center">
                      <p>Total</p>
                      <span>${(total + 10).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="">
                    <p className="">Select Method</p>
                    <div className=" flex gap-2">
                      <Field type="radio" name="selectMethod" id="" />
                      <label htmlFor="selectMethod">
                        Paypal or credit card
                      </label>
                    </div>
                  </div>

                  <button type="submit">Place order</button>
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
