'use client'

import { useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";

export default function SideBarRight() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h2>Related Products</h2>
      <ul>
        <li>Product 1</li>
        <li>Product 2</li>
        <li>Product 3</li>
      </ul>
    </div>
  )
}
