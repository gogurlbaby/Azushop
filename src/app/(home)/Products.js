import React from "react";
import { ArrowUpRight } from "lucide-react";

function Products() {
  return (
    <div className="bg-white" style={{ padding: "6.25rem 1.5rem" }}>
      <p
        className="font-semibold font-sans text-black lg:text-4xl text-lg text-center"
        style={{ marginBottom: "1.5rem" }}
      >
        Top Trending Products
      </p>
      <p
        className="font-normal font-sans text-black text-2xl text-center"
        style={{ marginBottom: "5.375rem" }}
      >
        Discover the latest must-have items that are taking the market by storm.
        Stay ahead with our curated collection of trending products designed to
        elevate your lifestyle.
      </p>

      <div className="lg:grid-cols-3 lg:items-center grid grid-cols gap-7">
        <div
          className="bg-[#E6EFF5] border border-solid border-[#E6EFF5] rounded-lg"
          style={{ padding: "2.063rem 3.875rem 1.563rem" }}
        >
          <p
            className="font-sans font-normal text-black text-3xl"
            style={{ marginBottom: "0.5rem" }}
          >
            Macbook
          </p>
          <p
            className="font-sans font-normal text-black text-lg"
            style={{ marginBottom: "2.5rem" }}
          >
            Up to 50% off laptop
          </p>
          <img
            src="/images/computer.svg"
            alt=""
            style={{ marginBottom: "8rem" }}
          />
          <a
            href=""
            className="text-black font-sans font-semibold text-md flex gap-2 items-center"
          >
            Shop now <ArrowUpRight className="text-black" />
          </a>
        </div>

        <div
          className="bg-[#D4EEF9] border border-solid border-[#D4EEF9] rounded-lg"
          style={{ padding: "2.063rem 3.875rem 1.563rem" }}
        >
          <p
            className="font-sans font-normal text-black text-3xl"
            style={{ marginBottom: "0.5rem" }}
          >
            Iphones
          </p>
          <p
            className="font-sans font-normal text-black text-lg"
            style={{ marginBottom: "2.5rem" }}
          >
            Free shipping
          </p>
          <img
            src="/images/phones.svg"
            alt=""
            style={{ marginBottom: "8rem" }}
          />
          <a
            href=""
            className="text-black font-sans font-semibold text-md flex gap-2 items-center"
          >
            Shop now <ArrowUpRight className="text-black" />
          </a>
        </div>

        <div
          className="bg-[#E6EFF5] border border-solid border-[#E6EFF5] rounded-lg"
          style={{ padding: "2.063rem 3.875rem 1.563rem" }}
        >
          <p
            className="font-sans font-normal text-black text-3xl"
            style={{ marginBottom: "0.5rem" }}
          >
            Digital Lens
          </p>
          <p
            className="font-sans font-normal text-black text-lg"
            style={{ marginBottom: "2.5rem" }}
          >
            Up to 40% off Camera
          </p>
          <img
            src="/images/camera.svg"
            alt=""
            style={{ marginBottom: "8rem" }}
          />
          <a
            href=""
            className="text-black font-sans font-semibold text-md flex gap-2 items-center"
          >
            Shop now <ArrowUpRight className="text-black" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Products;
