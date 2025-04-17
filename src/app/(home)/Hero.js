"use client";

import React, { useRef, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

function Hero() {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const router = useRouter();
  useEffect(() => {
    const currentPlugin = plugin.current;
    return () => {
      currentPlugin.stop();
    };
  }, []);

  const slides = [
    {
      image: "/images/hero1.svg",
      title: "Next-Gen Mobility",
      description:
        "Power, performance, and style—experience the future of smartphones today.",
    },
    {
      image: "/images/hero2.svg",
      title: "Power Meets Portability",
      description:
        "Unmatched performance and sleek design—built for work and play.",
    },
    {
      image: "/images/hero3.svg",
      title: "Capture Every Moment",
      description:
        "Experience exceptional clarity and precision with our new high-performance cameras.",
    },
  ];

  return (
    <div className="w-screen relative">
      <Carousel plugins={[plugin.current]} className="w-full">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="w-screen relative">
              <div className="relative w-screen">
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-screen object-cover"
                />

                <div className="absolute top-1/3 left-10 max-w-lg">
                  <h1
                    className="lg:text-7xl lg:leading-20 text-lg text-white tracking-[7%] font-bold font-serif"
                    style={{ marginBottom: "2rem" }}
                  >
                    {slide.title}
                  </h1>
                  <p
                    className="text-lg text-white font-normal font-serif"
                    style={{ marginBottom: "2rem" }}
                  >
                    {slide.description}
                  </p>
                  <button
                    onClick={() => router.push("/shop")}
                    className="flex gap-2 justify-center items-center bg-white border border-solid border-white hover:bg-blue-700 text-black font-medium"
                    style={{ padding: "0.8rem", borderRadius: "4px" }}
                  >
                    Shop Now
                    <ChevronRight className="text-black" />
                  </button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default Hero;
