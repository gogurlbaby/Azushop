"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

function Profile() {
  const { userName, isLoggedIn } = useCart();
  const router = useRouter();
  const [updateMessage, setUpdateMessage] = useState("");

  useEffect(() => {
    if (isLoggedIn === false) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  const profileSchema = Yup.object().shape({
    fullName: Yup.string().required("Please enter your full name"),
    password: Yup.string().min(8, "Password must be at least 8 characters"),
  });
  return (
    <div>
      {" "}
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
        <div className="lg:w-[50%] w-full border-gray-200 rounded-lg p-4 shadow-sm mb-4">
          <p className="text-lg">
            <strong>Name:</strong> {userName}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {localStorage.getItem("userEmail")}
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-2">Update Profile</h2>
        <Formik
          initialValues={{
            fullName: userName || "",
            password: "",
          }}
          validationSchema={profileSchema}
          onSubmit={(values, { setSubmitting }) => {
            try {
              // Update fullName if changed
              if (values.fullName && values.fullName !== userName) {
                localStorage.setItem("userName", values.fullName);
                // Refresh to update NavBar (simplest approach for now)
                window.location.reload();
              }

              // Update password if provided
              if (values.password) {
                localStorage.setItem("userPassword", values.password);
              }

              setUpdateMessage("Profile updated successfully!");
            } catch (error) {
              setUpdateMessage("Failed to update profile. Please try again.");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-4">
                <Field
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Full name *"
                  className="lg:w-[50%] w-full border border-solid border-gray-300 rounded-lg p-2"
                />
                {errors.fullName && touched.fullName ? (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.fullName}
                  </div>
                ) : null}
              </div>
              <div className="mb-4">
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="New password (optional)"
                  className="lg:w-[50%] w-full border border-solid border-gray-300 rounded-lg p-2"
                />
                {errors.password && touched.password ? (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </div>
                ) : null}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="lg:w-[50%] w-full bg-[#01589A] text-white font-semibold py-2 rounded-lg"
              >
                Update Profile
              </button>
              {updateMessage && (
                <p
                  className={`text-sm mt-2 ${
                    updateMessage.includes("successfully")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {updateMessage}
                </p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Profile;
