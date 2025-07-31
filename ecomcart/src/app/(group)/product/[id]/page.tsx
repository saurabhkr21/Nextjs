//@ts-nocheck

import AddToCart from "@/components/AddToCart";
import Cards from "@/components/cards";
import RelatedProducts from "@/components/RelatedPro";
import SearchProd from "@/components/SearchProd";
import products from "@/constants/data";
import prismaClient from "@/services/prisma";
import { notFound } from "next/navigation";
import { title } from "process";

// export async function generateMetadata({ params }) {
//   const id = params.id;

//   const url = "https://dummyjson.com/products/" + id;
//   const response = await fetch(url);
//   const products = await response.json();
//   return {
//     title: products.id ? products.title : "Product not found",
//     description: products?.description,
//   };
// }

export default async function page({ params }) {
  const id = params.id;
  // const relPro = params.category;

  // const url = "https://dummyjson.com/products/" + id;
  // const response = await fetch(url);
  // const products = await response.json();

  // const result = await fetch("https://localhost:3000/api/products/" + id);
  // const data = await result.json();
  // const products = data?.data;

  // if (!products.id) {
  //   notFound();
  // }

  // const products = data?.products || [];
  const products = await prismaClient.products.findUnique({
    where: {
      id: id,
    },
  });
  return (
    <div className="flex flex-col">
      <div className="flex items-center ml-[85px] mt-2 justify-between">
        <SearchProd key={products.id} item={products} />
      </div>
      <div className="flex flex-wrap">
        <RelatedProducts
          param={{ id: products.id, category: products.category }}
        />
      </div>
    </div>
  );
}

// export function RelatedProd({ item }) {
//     return (
//         <div className="flex flex-col">
//             <div className="flex">
//                 <Link href={`/product/${item.id}`}>
//                     <Image
//                         src={activeImage}
//                         alt={item.title}
//                         fill
//                         className="object-contain transition-transform duration-300"
//                     />
//                 </Link>
//                 <div>
//                     <p>{item.title}</p>
//                 </div>

//             </div>

//         </div>
//     )
// }
