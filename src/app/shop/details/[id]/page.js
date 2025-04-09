"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import products from "@/app/json/products.json";
import { useCart } from "../../../context/CartContext";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
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

function ProductDetails({ params }) {
  // Get the id from params instead of router.query
  const { id } = React.use(params);
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeReview, setActiveReview] = useState(0);
  const [showRelatedProducts, setShowRelatedProducts] = useState(false);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
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

  const handleQuantityChange = (e) => setQuantity(e.target.value);

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
      setShowWriteReview(false);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={20}
        className={
          i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
        }
      />
    ));
  };

  const viewProduct = (product) => {
    router.push(`/shop/details/${product.id}`);
  };

  return (
    <div
      style={{ padding: "5.5rem 2.5rem 9.813rem" }}
      className="flex flex-col justify-center items-center"
    >
      <Breadcrumb className="flex justify-center items-center">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="text-black font-sans text-xl">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
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

      <div
        className="lg:flex-row flex flex-col gap-8"
        style={{ marginTop: "8.125rem" }}
      >
        <div>
          <img src={product.imageUrl} alt={product.title} />
        </div>
        <div>
          <div className="flex items-center gap-16">
            <span>Brand: {product.brand}</span>
            <span className="flex items-center gap-0.5">
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
          <h4>{product.title}</h4>
          <p>{product.description}</p>
          <span>${product.price}</span>
          <br />
          <span>{product.inStock}</span>
          <div>
            <label>Quantity:</label>
            <select value={quantity} onChange={handleQuantityChange}>
              {[...Array(10).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => addToCart(product, parseInt(quantity))}
            disabled={!product.inStock}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="w-full max-w-7xl" style={{ marginTop: "9.625rem" }}>
        <div className="lg:flex-row lg:justify-between lg:items-start flex flex-col justify-center items-center gap-8">
          <div className="flex-1">
            <button
              onClick={() => setShowRelatedProducts(!showRelatedProducts)}
              className="text-lg font-semibold mb-4"
            >
              {showRelatedProducts
                ? "Hide Related Products"
                : "Show Related Products"}
            </button>
            {showRelatedProducts && (
              <div className="">
                {products
                  .filter(
                    (p) =>
                      p.category === product.category && p.id !== product.id
                  )
                  .slice(0, 4)
                  .map((relatedProduct) => (
                    <div
                      key={relatedProduct.id}
                      className="bg-[#F9FBFC] flex justify-center flex-col items-center rounded-lg border border-solid: border-[#F9FBFC]"
                      style={{ padding: "0.5rem 1rem 1.5rem" }}
                    >
                      <span
                        className="text-[#01589A] relative lg:left-[8.5rem] left-[7rem]"
                        style={{ marginTop: "0.5rem" }}
                      >
                        {product.brand}
                      </span>
                      <img
                        src={relatedProduct.imageUrl}
                        alt={relatedProduct.title}
                        style={{ marginBottom: "1rem" }}
                        onClick={() =>
                          router.push(`/shop/details/${relatedProduct.id}`)
                        }
                      />
                      <p className="font-semibold">{relatedProduct.title}</p>
                      <p className="font-normal">
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
            )}
          </div>

          <div className="flex-1">
            <button
              onClick={() => setShowWriteReview(!showWriteReview)}
              className="text-lg font-semibold mb-4"
            >
              {showWriteReview ? "Hide Write Review" : "Write Your Review"}
            </button>
            {showWriteReview && (
              <div>
                <div className="flex flex-col gap-4">
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="border border-solid border-black p-2"
                  />
                </div>
                <div className="flex flex-col gap-4 mt-4">
                  <label>Ratings</label>
                  <Select
                    value={rating}
                    onValueChange={(value) => setRating(value)}
                  >
                    <SelectTrigger className="w-[150px]">
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
                                className="text-yellow-500 fill-yellow-500"
                              />
                            ))}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-4 mt-4">
                  <label>Comments</label>
                  <textarea
                    rows="5"
                    cols="33"
                    className="border border-solid border-black p-2"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your review here..."
                  />
                </div>
                <button
                  onClick={handleSubmitReview}
                  disabled={!rating || !comment || !reviewerName}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
                >
                  Submit
                </button>
              </div>
            )}
          </div>

          <div className="flex-1">
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="text-lg font-semibold mb-4"
            >
              {showAllReviews
                ? "Hide All Reviews"
                : `View All Reviews (${reviews.length})`}
            </button>
            {showAllReviews && (
              <div>
                {reviews.length === 0 ? (
                  <p>No reviews yet. Be the first to write one!</p>
                ) : (
                  reviews.map((review, index) => (
                    <div
                      key={index}
                      className="border border-solid border-[#D9D9D9] rounded-lg p-4 mb-4"
                    >
                      <p className="font-semibold">{review.name}</p>
                      <span className="flex items-center gap-0.5">
                        {renderStars(review.rating)}
                      </span>
                      <p>{review.comment}</p>
                      <p className="text-gray-500 text-sm">{review.date}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
