//@ts-nocheck
"use client";
import { CartContext } from "@/Context";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function AddToCart({ item }) {
  const { setCount } = useContext(CartContext);
  const [inCart, setInCart] = useState(false);
  

  useEffect(() => {
    let prevItems = localStorage.getItem("cart");
    prevItems = prevItems ? JSON.parse(prevItems) : [];
    let existingItem = prevItems?.find((cartItem) => cartItem.id === item.id);
    if (existingItem) setInCart(true);
    setCount(prevItems?.length);
  }, [item.id]);

  function handleAdd() {
    let prevItem = localStorage.getItem("cart");
    prevItem = prevItem ? JSON.parse(prevItem) : [];

    const exists = prevItem.find((cartItem) => cartItem.id === item.id);
    if (!exists) {
      prevItem.push(item);
      localStorage.setItem("cart", JSON.stringify(prevItem));
      setInCart(true);
      setCount(prevItem.length);
    }
  }

  return (
    <div className="flex gap-1">
      <Link href={"/cart"}>
        <button
          onClick={handleAdd}
          disabled={!item.stock}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            item.stock
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Buy Now
        </button>
      </Link>
      {inCart ? (
        <button
          disabled
          className="flex-1 py-2 px-4 rounded-md font-medium bg-gray-300 text-gray-500 cursor-not-allowed"
        >
          Added to Cart
        </button>
      ) : (
        <button
          onClick={handleAdd}
          disabled={!item.stock}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            item.stock
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}

