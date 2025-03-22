import React from "react";
import { Truck, PackageCheck, Gem } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div
        className="bg-[#01589A]"
        style={{
          padding: "2.625rem 2.5rem 7.25rem",
        }}
      >
        <p
          className="lg:text-4xl lg:leading-12 text-white text-2xl font-normal font-sans text-left"
          style={{ marginBottom: "3.25rem" }}
        >
          We're tackling the biggest challenges in laptops and electronic
          products.
        </p>

        <div className="lg:grid-cols-3 grid grid-cols-1 gap-[2.5rem]">
          <div className="flex flex-col justify-center items-center">
            <Truck size={40} className="mb-[1rem] text-white text-center" />
            <p className="text-white text-md font-bold font-sans text-center mb-[1rem]">
              Fast & free shipping
            </p>
            <p className="text-white text-md font-normal font-sans text-center">
              Every single order ships for free. No minimums, no tiers, no fine
              print whatsoever.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center">
            <PackageCheck
              size={40}
              className="mb-[1rem] text-white text-center"
            />
            <p className="text-white text-md font-normal font-sans text-center mb-[1rem]">
              Innovative, User-Centric Design
            </p>
            <p className="text-white text-md font-bold font-sans text-center">
              Our cutting-edge designs prioritize performance, portability, and
              seamless integration into your lifestyle.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center">
            <Gem size={40} className="mb-[1rem] text-white text-center" />
            <p className="text-white text-md font-bold font-sans text-center mb-[1rem]">
              Durable, High-Quality Materials
            </p>
            <p className="text-white text-md font-normal font-sans text-center">
              We use premium aluminum, high-resolution OLED displays, and
              durable batteries for superior quality.
            </p>
          </div>
        </div>
      </div>

      <div
        className="md:flex-row md:justify-between flex flex-col items-center bg-white"
        style={{ padding: "2.625rem 2.5rem 1.25rem" }}
      >
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
