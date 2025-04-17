"use client";

import React, { useState } from "react";
import Banner from "../components/Banner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import products from "../json/products.json";
import categories from "@/app/json/productCategories.json";
import brands from "@/app/json/productBrands.json";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [brandSelectOpen, setBrandSelectOpen] = useState(false);
  const [price, setPrice] = useState("");
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const router = useRouter();

  const filteredProducts = products.filter((product) => {
    const parsedPrice = parseFloat(price);
    return (
      (selectedCategory ? product.category === selectedCategory : true) &&
      (selectedBrand.length > 0
        ? selectedBrand.includes(product.brand)
        : true) &&
      (price && !isNaN(parsedPrice) ? product.price >= parsedPrice : true)
    );
  });

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value === "" || !isNaN(value)) {
      setPrice(value);
    }
  };

  const handleReset = () => {
    setSelectedCategory("");
    setSelectedBrand([]);
    setPrice("");
  };

  const viewProduct = (product) => {
    router.push(`/shop/details/${product.id}`);
  };

  return (
    <div>
      <Banner
        title="New Arrival"
        subtitle="Shop through our latest selection of Products"
      />

      <div className="bg-white" style={{ padding: "1.375rem 2.5rem 9.625rem" }}>
        <Breadcrumb className="flex justify-center items-center">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="text-black font-sans text-xl"
                style={{ textDecoration: "none" }}
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-black font-bold font-sans text-xl">
                Shop
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="lg:flex-row flex flex-col gap-16">
          {/* Categories  Sidebar */}
          <div style={{ paddingTop: "5rem" }}>
            <div className="">
              <p className="font-sans text-black text-2xl font-semibold">
                Shop By
              </p>
              <div style={{ padding: "1rem 0" }}>
                <Select
                  onValueChange={(value) => setSelectedCategory(value)}
                  value={selectedCategory}
                >
                  <SelectTrigger
                    className="bg-white w-full rounded-sm border border-solid border-[#999]"
                    style={{ padding: "0.5rem 1rem", borderRadius: "5px" }}
                  >
                    <SelectValue placeholder="Product Categories" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {categories.map((cat, idx) => (
                        <SelectItem key={idx} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="" style={{ padding: "1.5rem 0" }}>
              <Select open={brandSelectOpen} onOpenChange={setBrandSelectOpen}>
                <SelectTrigger
                  className="bg-white w-full border border-solid border-[#999]"
                  style={{ padding: "0.5rem 1rem", borderRadius: "5px" }}
                >
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>

                <SelectContent className="max-h-64 overflow-y-auto">
                  <SelectGroup>
                    {brands.map((brand, idx) => {
                      const isChecked = selectedBrand.includes(brand);
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-2 px-3 py-1 cursor-pointer"
                          onClick={(e) => {
                            // Prevent select from closing
                            e.stopPropagation();
                            if (isChecked) {
                              setSelectedBrand((prev) =>
                                prev.filter((b) => b !== brand)
                              );
                            } else {
                              setSelectedBrand((prev) => [...prev, brand]);
                            }
                          }}
                        >
                          <Checkbox id={`brand-${idx}`} checked={isChecked} />
                          <label
                            htmlFor={`brand-${idx}`}
                            className="text-sm font-normal"
                          >
                            {brand}
                          </label>
                        </div>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <p className="font-sans text-black text-lg font-semibold mt-3">
                Price
              </p>{" "}
              <input
                type="text"
                id="price"
                value={price}
                onChange={handlePriceChange}
                placeholder="Enter price"
                className="bg-[#E6EFF5] w-full rounded-sm border border-solid border-[#E6EFF5]"
                style={{ marginBottom: "1.5rem", padding: "0.5rem 1rem" }}
              />
              <button
                onClick={handleReset}
                style={{ borderRadius: "5px" }}
                className="bg-[#01589A] w-full py-2 px-8 border border-solid border-[#01589A] font-semibold font-sans text-lg text-white flex justify-center items-center"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Products Display */}
          <div
            className="lg:grid-cols-3 grid grid-cols-1 gap-8"
            style={{ marginTop: "5rem" }}
          >
            {filteredProducts.map((product) => (
              <div
                className="bg-[#F9FBFC] flex justify-center flex-col items-center rounded-lg border border-solid: border-[#F9FBFC]"
                style={{ padding: "0.5rem 1rem 1.5rem" }}
                key={product.id}
              >
                <span
                  className="text-[#01589A] relative self-end"
                  style={{ marginTop: "0.5rem" }}
                >
                  {product.brand}
                </span>
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  style={{ marginBottom: "1rem" }}
                />
                <p className="font-semibold">{product.title}</p>
                <p className="font-normal">{product.description}</p>
                <span
                  className="text-[#01589A] font-semibold"
                  style={{ marginBottom: "1rem" }}
                >
                  ${product.price}
                </span>
                <div className="flex gap-2" style={{ marginTop: "2rem" }}>
                  <ShoppingCart
                    className="cursor-pointer hover:text-blue-700"
                    onClick={() => addToCart(product, 1)}
                  />
                  <Heart
                    className={`cursor-pointer ${
                      wishlist.some((item) => item.id === product.id)
                        ? "text-red-500"
                        : "hover:text-red-500"
                    }`}
                    onClick={() => toggleWishlist(product)}
                  />
                  <Eye
                    className="cursor-pointer  hover:text-green-600"
                    onClick={() => viewProduct(product)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
