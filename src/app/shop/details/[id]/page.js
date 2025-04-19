"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import products from "@/app/json/products.json";
import { useCart } from "../../../context/CartContext";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Star, Slash, ShoppingCart, Heart, Eye } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import "../../../styles/shop_details.css";

function ProductDetails({ params }) {
  // Get the id from params instead of router.query
  const { id } = React.use(params);
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState("1");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviewerName, setReviewerName] = useState("");

  useEffect(() => {
    if (id) {
      const foundProduct = products.find(
        (product) => product.id === parseInt(id)
      );
      setProduct(foundProduct);
      console.log("Product loaded", {
        foundProduct,
        inStock: foundProduct?.inStock,
      });

      const storedReviews = localStorage.getItem(`reviews_${id}`);
      if (storedReviews) {
        setReviews(JSON.parse(storedReviews));
      }
    }
  }, [id]);

  useEffect(() => {
    if (id && reviews.length > 0) {
      localStorage.setItem(`reviews_${id}`, JSON.stringify(reviews));
    }
  }, [reviews, id]);

  if (!product) return <div>Loading...</div>;

  // Parsed inStock string here
  const isInStock = product.inStock
    ? product.inStock.toLowerCase().includes("in stock")
    : true;

  const totalPrice = (product.price * parseInt(quantity, 10)).toFixed(2);

  const handleSubmitReview = () => {
    if (rating && comment && reviewerName) {
      const newReview = {
        id: Date.now(),
        name: reviewerName,
        rating: parseInt(rating),
        comment: comment,
        date: new Date().toLocaleDateString(),
      };
      setReviews([newReview, ...reviews]);
      setRating("");
      setComment("");
      setReviewerName("");
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={20}
        className={
          i < rating ? "text-[#01589A] fill-[#01589A]" : "text-gray-300"
        }
      />
    ));
  };

  const viewProduct = (product) => {
    router.push(`/shop/details/${product.id}`);
  };

  return (
    <div className="details-container flex flex-col justify-center items-center">
      <Breadcrumb className="flex justify-center items-center">
        <BreadcrumbList>
          <BreadcrumbLink
            href="/"
            className="text-black font-sans text-xl"
            style={{ textDecoration: "none" }}
          >
            Home
          </BreadcrumbLink>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="text-black font-bold font-sans text-xl">
              {product.category}
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="text-black font-bold font-sans text-xl">
              {product.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="product-details-container lg:flex-row flex flex-col gap-8">
        <div className="image-container bg-[#F9FBFC] rounded-xs">
          <img src={product.imageUrl} alt={product.title} className="w-full" />
        </div>
        <div>
          <div className="flex gap-16 mb-8">
            <p className="font-sans text-md text-[#999] font-semibold">
              Brand: <span className="text-black">{product.brand}</span>
            </p>
            <span className="flex gap-0.5 text-black text-md font-semibold">
              {renderStars(
                reviews.length > 0
                  ? Math.round(
                      reviews.reduce((acc, r) => acc + r.rating, 0) /
                        reviews.length
                    )
                  : 0
              )}
              ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
            </span>
          </div>
          <h3
            className="text-black font-serif font-bold text-4xl"
            style={{ marginBottom: "1.5rem" }}
          >
            {product.title}
          </h3>
          <p
            className="text-black font-sans font-normal text-base leading-6"
            style={{ marginBottom: "1.5rem", maxWidth: "15rem" }}
          >
            {product.description}
          </p>
          <p
            className="text-[#01589A] font-semibold font-sans text-3xl"
            style={{ marginBottom: "1.25rem" }}
          >
            ${totalPrice}{" "}
            {quantity > "1" && <span>(Unit: ${product.price})</span>}
          </p>

          <span>{product.inStock}</span>

          <Select
            value={quantity}
            onValueChange={(value) => {
              console.log("Quantity changed", { newValue: value });
              setQuantity(value);
            }}
          >
            <SelectTrigger
              className="bg-[#E6EFF5] rounded-sm text-[#999] border border-solid border-[#E6EFF5] w-[100px]"
              style={{ padding: "0.5rem 1rem", margin: "1rem 0" }}
            >
              <SelectValue placeholder="Qty" />
            </SelectTrigger>

            <SelectContent>
              {[...Array(10).keys()].map((x) => (
                <SelectItem key={x + 1} value={String(x + 1)}>
                  {x + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <button
            onClick={() => {
              const parsedQuantity = parseInt(quantity, 10);
              console.log("Add to Cart clicked", { product, parsedQuantity });
              addToCart(product, parsedQuantity);
            }}
            className="w-full cursor-pointer flex justify-center items-center bg-[#01589A] text-white text-lg font-sans font-semibold"
            style={{ padding: "0.6rem 1.5rem", borderRadius: "5px" }}
            disabled={!isInStock}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="tabs-container w-full max-w-7xl">
        <Tabs defaultValue="related" className="w-full">
          <TabsList className="lg:grid-cols-3 grid grid-cols-1 w-full gap-4 sticky top-0 bg-white z-10">
            <TabsTrigger value="related">Related Products</TabsTrigger>
            <TabsTrigger value="write-review">Write Your Review</TabsTrigger>
            <TabsTrigger value="all-reviews">
              View All Reviews ({reviews.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="related">
            <div className="tabs-content-margin lg:flex-row flex flex-col gap-4 overflow-x-auto">
              {products
                .filter(
                  (p) => p.category === product.category && p.id !== product.id
                )
                .slice(0, 4)
                .map((relatedProduct) => (
                  <div
                    key={relatedProduct.id}
                    className="bg-[#F9FBFC] flex flex-col justify-center items-center rounded-lg border border-solid border-[#F9FBFC] min-w-[200px]"
                    style={{ padding: "0.5rem 1rem 1.5rem" }}
                  >
                    <span
                      className="text-[#01589A] self-end"
                      style={{ marginTop: "0.5rem" }}
                    >
                      {relatedProduct.brand}
                    </span>
                    <img
                      src={relatedProduct.imageUrl}
                      alt={relatedProduct.title}
                      style={{ marginBottom: "1rem", cursor: "pointer" }}
                      onClick={() =>
                        router.push(`/shop/details/${relatedProduct.id}`)
                      }
                    />
                    <p className="font-semibold">{relatedProduct.title}</p>
                    <p className="font-normal text-center">
                      {relatedProduct.description}
                    </p>
                    <span
                      className="text-[#01589A] font-semibold"
                      style={{ marginBottom: "1rem" }}
                    >
                      ${relatedProduct.price}
                    </span>
                    <div className="flex gap-2" style={{ marginTop: "2rem" }}>
                      <ShoppingCart
                        className="cursor-pointer hover:text-blue-700"
                        onClick={() => addToCart(relatedProduct, 1)}
                      />
                      <Heart
                        className={`cursor-pointer ${
                          wishlist.some((item) => item.id === relatedProduct.id)
                            ? "text-red-500"
                            : "hover:text-red-500"
                        }`}
                        onClick={() => toggleWishlist(relatedProduct)}
                      />
                      <Eye
                        className="cursor-pointer hover:text-green-600"
                        onClick={() => viewProduct(relatedProduct)}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent
            value="write-review"
            className="tabs-content-margin lg:w-0 lg:min-w-md w-full mx-auto"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="text-black font-sans font-semibold text-lg mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="bg-[#E6EFF5] border border-solid border-[#E6EFF5] rounded-sm text-black"
                  style={{ padding: "0.5rem 1rem" }}
                />
              </div>
              <div>
                <label className="text-black font-semibold font-sans text-lg mb-2">
                  Ratings
                </label>
                <Select
                  value={rating}
                  onValueChange={(value) => setRating(value)}
                >
                  <SelectTrigger
                    className="w-full bg-[#E6EFF5] border border-solid border-[#E6EFF5] text-[#999]"
                    style={{ padding: "0.6rem 1rem", borderRadius: "5px" }}
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <SelectItem key={value} value={String(value)}>
                        <div className="flex gap-1">
                          {Array.from({ length: value }).map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className="text-[#01589A] fill-[#01589A]"
                            />
                          ))}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <label className="text-black font-semibold font-sans text-lg mb-2">
                  Comments
                </label>
                <textarea
                  rows="5"
                  className="bg-[#E6EFF5] border border-solid border-[#E6EFF5] rounded-sm text-black"
                  style={{ padding: "0.5rem 1rem", marginBottom: "2rem" }}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your review here..."
                />
              </div>
              <button
                onClick={handleSubmitReview}
                disabled={!rating || !comment || !reviewerName}
                className="w-full bg-[#01589A] text-white text-lg font-sans font-semibold"
                style={{ padding: "0.6rem 1.5rem", borderRadius: "5px" }}
              >
                Submit
              </button>
            </div>
          </TabsContent>

          <TabsContent value="all-reviews" className="tabs-content-margin">
            {reviews.length === 0 ? (
              <p className="text-lg text-black">
                No reviews yet. Be the first to write one!
              </p>
            ) : (
              reviews.map((review, index) => (
                <div
                  key={index}
                  className="border border-solid border-[#F9FBFC] bg-[#F9FBFC] p-4 mb-4"
                  style={{ borderRadius: "5px" }}
                >
                  <p
                    className="text-black font-normal font-sans text-xl"
                    style={{ marginBottom: "0.75rem" }}
                  >
                    {review.name}
                  </p>
                  <span
                    className="flex items-center gap-0.5"
                    style={{ marginBottom: "0.75rem" }}
                  >
                    {renderStars(review.rating)}
                  </span>
                  <p
                    className="text-black font-normal font-sans text-md"
                    style={{ marginBottom: "0.75rem" }}
                  >
                    {review.comment}
                  </p>
                  <p className="text-gray-500 font-normal font-sans text-md">
                    {review.date}
                  </p>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default ProductDetails;
