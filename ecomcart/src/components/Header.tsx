//@ts-nocheck
"use client";
import Link from "next/link";
import AddToCart from "./AddToCart";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/Context";
import AddProdBtn from "./Add-prod-btn";
import { getUserFromCookies } from "@/helper";
import { cookies } from "next/headers";

export default function Header() {
  const [userInput, setUserInput] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const { count } = useContext(CartContext);
  
  function handleClick(e) {
    setUserInput(e.target.value);
    console.log(userInput);
  }
  useEffect(() => {
    async function getProds() {
      const response = await fetch("https://dummyjson.com/products?limit=194");
      const data = await response.json();
      const products = data.products;
      let filteredSuggestion = products.filter((item) => {
        return item.title.toLowerCase().includes(userInput.toLowerCase());
      });
      setSuggestion(filteredSuggestion.slice(0, 10));
    }
    if (userInput) {
      getProds();
    } else {
      setSuggestion([]);
    }
  }, [userInput]);
  return (
    <div className="flex w-full bg-[#131921] text-white  justify-between gap-1  items-center p-2">
      <div className="flex font-bold text-2xl w-[144px] items-center justify-center h-[40px] hover:border-white border border-transparent">
        <Link href="/">ECOCart.in</Link>
      </div>
      <div className="flex w-[140px] h-[40px] p-0.5 hover:border-white border border-transparent">
        <span className="flex items-end justify-center">
          <img
            width="18"
            height="12"
            src="https://img.icons8.com/fluency-systems-regular/FFFFFF/marker--v1.png"
            alt="marker--v1"
          />
        </span>
        <span className="flex flex-col ">
          <p className="text-xs">Deliver to Saurabh</p>
          <p className="text-md text-medium">Sheohar 845430</p>
        </span>
      </div>
      <div className="flex flex-1 relative border rounded h-10 overflow-hidden group z-[4] outline-2 group-has-[input:active]:outline-[#FF9900] text-black">
        <form
          action="/search"
          method="GET"
          className={`flex-1 flex  text-black`}
        >
          <select className="bg-[#E6E6E6] px-2 z-[4]  hover:outline-2 hover:outline-[#FF9900] active:outline-2 active:outline-[#FF9900]">
            <option value="ALL">All</option>
            <option value="Game">Game</option>
            <option value="Mobile">Mobile</option>
            <option value="Beauty">Beauty</option>
          </select>
          <input
            type="text"
            value={userInput}
            onChange={handleClick}
            className="flex-1 bg-white p-1"
            name="q"
            placeholder="Search ECOCart.in"
          />
          <button className="px-2 bg-[#FEBD69] z-[4] hover:outline-2 hover:outline-[#FF9900] active:outline-2 active:outline-[#FF9900]">
            <img
              className="size-6"
              src="https://img.icons8.com/ios-filled/100/search.png"
              alt="search"
            />
          </button>
        </form>
        {suggestion.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white text-black shadow-lg z-20 rounded max-h-60 overflow-y-auto">
            {suggestion.map((elem) => (
              <Link
                href={`/product/${elem.id}`}
                key={elem.id}
                onClick={() => {
                  // setUserInput("");
                  // setSuggestion([]);
                }}
              >
                <p className="px-3 py-2 hover:bg-gray-100  cursor-pointer">
                  {elem.title}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
      <AddProdBtn/>
      <div className="flex gap-1">
        {/* <Link href="/login">
          <button className="w-15 hover:border-white  border-transparent text-md  text-white rounded-md h-10 border">
            Login
          </button>
        </Link> */}
        <Link href="/cart">
          <button className="flex w-15 text-md hover:border-white  border-transparent text-white rounded-md h-10 border items-center justify-center">
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/material-outlined/FFFFFF/shopping-cart.png"
              alt="shopping-cart"
            />{count}
          </button>
        </Link>
      </div>
    </div>
  );
}
