// Shared utility function for handling authentication submission
export const handleAuthSubmit = async ({
  values,
  login,
  onSubmit,
  setSubmitting,
  setErrors,
  isLogin = false,
  role = "user",
}) => {
  try {
    console.log(
      `${isLogin ? "Login" : "Register"} values for ${role}:`,
      values
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (role === "user") {
      if (isLogin) {
        const storedEmail = localStorage.getItem("userEmail");
        const storedPassword = localStorage.getItem("userPassword");
        const storedUserName = localStorage.getItem("userName");

        console.log("Stored credentials:", {
          storedEmail,
          storedPassword,
          storedUserName,
        });
        console.log("Entered credentials:", {
          email: values.email,
          password: values.password,
        });

        if (!storedEmail || !storedPassword) {
          throw new Error("No account found, please register first");
        }
        if (
          values.email.toLowerCase() !== storedEmail.toLowerCase() ||
          values.password !== storedPassword
        ) {
          throw new Error("Invalid email or password");
        }

        const mockResponse = {
          token: "mock-token",
          user: {
            fullName: storedUserName || values.email.split("@")[0],
            role,
          },
        };
        localStorage.setItem("token", mockResponse.token);
        const userName =
          mockResponse.user?.fullName || values.email.split("@")[0];
        login(userName);
      } else {
        const mockResponse = { token: "mock-token", role };
        localStorage.setItem("token", mockResponse.token);
        localStorage.setItem("userEmail", values.email.toLowerCase());
        localStorage.setItem("userPassword", values.password);
        localStorage.setItem("userName", values.fullName);
        // Save registration date
        const registrationDate = new Date().toISOString();
        localStorage.setItem("registrationDate", registrationDate);
        login(values.fullName);
      }
    } else if (role === "admin") {
      throw new Error("Admin authentication not implemented yet");
    } else {
      throw new Error("Invalid role specified");
    }

    if (onSubmit) onSubmit(values);
  } catch (error) {
    console.error(
      `${isLogin ? "Login" : "Register"} error for ${role}:`,
      error
    );
    setErrors({ email: error.message });
  } finally {
    setSubmitting(false);
  }
};
