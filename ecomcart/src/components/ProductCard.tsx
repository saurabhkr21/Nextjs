//@ts-nocheck
"use client";
import Image from "next/image";

import { useState } from "react";
import AddToCart from "./AddToCart";
import Link from "next/link";
import DeleteItem from "./delete-item-btn";
import EditProdBtn from "./edit-prod-button";

const ProductCard = ({ item }) => {
  const [isWishListed, setIsWishListed] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [activeImage, setActiveImage] = useState(
    item.thumbnail || item.images?.[0]
  );
  const href = "/product/" + item.id;

  const handleWishlist = () => {
    setIsWishListed(!isWishListed);
  };

  function costPrice(discountedPrice, discountPercentage) {
    if (discountPercentage >= 100) return 0;
    return (discountedPrice / (1 - discountPercentage / 100)).toFixed(2);
  }
  const discountedPrice = item.price;
  const discountPercentage = item.discountPercentage;
  const originalPrice = costPrice(discountedPrice, discountPercentage);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden max-w-sm">
      <div className="relative group">
        <Link href={href}>
          <div className="relative h-54 w-full bg-gray-100">
            {!imageError ? (
              <Image
                src={item.image_url}
                alt={item.title}
                fill
                // width={100}
                // height={100}
                className="object-contain group-hover:scale-105 transition-transform duration-300"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <svg
                  className="w-16 h-16"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
        </Link>
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {item.images?.map((img, idx) => (
            <div
              key={idx}
              className="w-12 h-12 rounded border cursor-pointer overflow-hidden"
            >
              <Image
                src={img}
                alt={`thumb-${idx}`}
                width={48}
                height={48}
                className={`object-cover w-full h-full ${
                  activeImage === img ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setActiveImage(img)}
              />
            </div>
          ))}
        </div>

        {item.discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
            -{item.discountPercentage}%
          </div>
        )}

        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
        >
          <svg
            className={`w-5 h-5 ${
              isWishListed ? "text-red-500 fill-current" : "text-gray-400"
            }`}
            fill={isWishListed ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      <div className="p-4">
        <div className="text-sm text-gray-500 mb-1">{item.category}</div>

        <Link href={href}>
          <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
            {item.title}
          </h3>
        </Link>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(item.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-1">({item.brand})</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">
              ${item.price}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${originalPrice}
              </span>
            )}
          </div>
          <div
            className={`text-sm ${
              item.stock ? "text-green-600" : "text-red-600"
            }`}
          >
            {item.stock ? "In Stock" : "Out of Stock"}
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {item.description}
        </p>

        <div className="flex  justify-between">
          <AddToCart item={item} />
          <div className="flex justify-end gap-1">
            <EditProdBtn item={item} />
            <DeleteItem id={item.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
