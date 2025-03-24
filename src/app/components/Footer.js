import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ padding: "2.625rem 2.5rem 1.25rem" }}>
      <hr className="w-full border-[0.5px] border-solid bg-[#D9D9D9]" />
      <div className="lg:flex-row lg:justify-between flex flex-col items-center bg-white">
        <div className="flex gap-[1rem] items-center">
          <img src="/images/visa.svg" alt="visa-logo" />{" "}
          <img src="/images/paypal.svg" alt="paypal-logo" />
          <img src="/images/mastercard.svg" alt="mastercard-logo" />
        </div>
        <div>
          <p className="text-black text-md font-normal font-sans">
            &copy; {currentYear} Evershop. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
