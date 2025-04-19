"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

function LoginModal({ open, onOpenChange, onToggle, onSubmit, children }) {
  const loginModalSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Please enter your Email address"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Please enter your password"),
  });
  return (
    <>
      {children}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle
              className="text-black text-2xl font-sans font-normal text-left"
              style={{ padding: "1rem" }}
            >
              Login
            </DialogTitle>
          </DialogHeader>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginModalSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ errors, touched }) => (
              <Form
                onSubmit={onSubmit}
                className="space-y-4"
                style={{ padding: "1rem" }}
              >
                <div>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email address *"
                    className="xl:w-[30rem] w-full border border-solid border-[#E6EFF5] bg-[#E6EFF5] text-black"
                    style={{
                      padding: "0.5rem 1.5rem",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                {errors.email && touched.email ? (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </div>
                ) : null}
                <div>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password *"
                    className="xl:w-[30rem] w-full border border-solid border-[#E6EFF5] bg-[#E6EFF5] text-black"
                    style={{
                      padding: "0.5rem 1.5rem",
                      borderRadius: "5px",
                      marginTop: "2rem",
                    }}
                  />
                </div>
                {errors.password && touched.password ? (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </div>
                ) : null}
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
                    onClick={onToggle}
                  >
                    Register
                  </span>
                </p>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default LoginModal;
