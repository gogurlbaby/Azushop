"use client";

import React from "react";
import Features from "./(home)/Features";
import Hero from "./(home)/Hero";
import TrendingProducts from "./(home)/TrendingProducts";

export default function Home() {
  return (
    <div>
      <Hero />
      <TrendingProducts />
      {/* <Features /> */}
    </div>
  );
}
