"use client";

import React, { Suspense } from "react";
import Features from "./(home)/Features";
import Hero from "./(home)/Hero";
import TrendingProducts from "./(home)/TrendingProducts";
import AuthModals from "./(home)/AuthModals";

export default function Home() {
  return (
    <div>
      <Hero />
      <TrendingProducts />
      <Features />
      <Suspense fallback={<div>Loading authentication...</div>}>
        <AuthModals />
      </Suspense>
    </div>
  );
}
