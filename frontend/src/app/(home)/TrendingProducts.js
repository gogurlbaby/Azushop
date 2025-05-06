"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import trendingProducts from "../json/trendingProducts.json";
import { useRouter } from "next/navigation";

function TrendingProducts() {
  const router = useRouter();

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
        {trendingProducts.map((item, index) => (
          <div
            key={item.id}
            className={`${
              index === Math.floor(trendingProducts.length / 2)
                ? "bg-[#D4EEF9] border-[#D4EEF9]"
                : "bg-[#E6EFF5]  border-[#E6EFF5]"
            } border border-solid rounded-lg`}
            style={{ padding: "2.063rem 3.875rem 1.563rem" }}
          >
            <p
              className="font-sans font-normal text-black text-3xl"
              style={{ marginBottom: "0.5rem" }}
            >
              {item.title}
            </p>
            <p
              className="font-sans font-normal text-black text-lg"
              style={{ marginBottom: "2.5rem" }}
            >
              {item.heading}
            </p>
            <img src={item.image_Url} alt="" style={{ marginBottom: "8rem" }} />
            <button
              onClick={() => router.push("/shop")}
              className="text-black font-sans font-semibold text-md flex gap-2 items-cente underline"
            >
              Shop now <ArrowUpRight className="text-black" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendingProducts;
