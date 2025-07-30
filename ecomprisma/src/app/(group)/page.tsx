//@ts-nocheck

import { Suspense } from "react";
import ProductCard from "../../components/ProductCard";
import prismaClient from "@/services/prisma";


export default async function Home() {
  return (
    <div className=" ">
      <Suspense fallback={
        <div className="flex gap-5 text-2xl">
          Loading...
        </div>
      }>
      <HomePage/>
      </Suspense>
    </div>
  );
}

async function HomePage() {
  const url = "https://dummyjson.com/products?limit=194";
  const response = await fetch(url);
  const data = await response.json();
  const products = data?.products || [];
// const products=await prismaClient.product.findMany();
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-2">
      {
        products.map((item) => (
          <ProductCard
            key={item.id}
            item={item} />
        ))
      }
    </div>
  )
}