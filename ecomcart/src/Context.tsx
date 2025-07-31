//@ts-nocheck
"use client";
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export default function ContextProvider({children}) {
  const [count,setCount]=useState(0);
  const [inCart, setInCart] = useState(false);
  // function handleAdd(){
  //   setCount(count+1);
  // }
  return (
    <CartContext.Provider
    value={{
      count,
      setCount,
      inCart,
      setInCart
      }}>
        {children}
    </CartContext.Provider>
  );
}