import { GET_ALL_PRODUCTS } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/gql";
import { Box, Card, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "../../../generated/prisma";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products: { getAllProducts: Product[] } = await gqlClient.request(
        GET_ALL_PRODUCTS
      );
      setProducts(products?.getAllProducts || []);
    };
    fetchProducts();
  }, []);

  // function isNewProduct(item: Product) {
  //   if (!item.createdAt) return false;
  //   const created = new Date(Number(item.createdAt));
  //   const now = new Date();
  //   const diffDays =
  //     (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
  //   return diffDays <= 7;
  // }

  return (
    <div className="flex flex-wrap gap-2 w-full ">
      {products.map((item) => {
        // const newTag = isNewProduct(item) && item.stock > 0;
        return (
          <Box
            width="250px"
            className="transition-transform hover:scale-105"
            key={item.id}
          >
            <Card className="p-4 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 relative h-[350px] flex flex-col justify-between">
              <Link
                href={`/product/${item.id}`}
                key={item.id}
                className="no-underline"
              >
                {/* Image wrapper with fixed height */}
                <div className="relative flex justify-center mb-3 h-[180px]">
                  <Image
                    sizes="(max-width: 250px) 100vw, 250px"
                    src={item?.imageUrl ?? "/placeholder.png"}
                    alt={item.title}
                    fill
                    priority
                    className="rounded-lg object-cover border border-gray-300 dark:border-slate-700"
                  />
                  {/* {newTag && (
                    <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                      New
                    </span>
                  )} */}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1">
                  <Text
                    as="div"
                    size="4"
                    weight="bold"
                    className="text-blue-700 dark:text-blue-400 mb-1"
                  >
                    {item.title}
                  </Text>
                  <div className="relative group">
                    <Text
                      as="div"
                      color="gray"
                      size="2"
                      className="mb-2 line-clamp-2 bg-gray-50 dark:bg-slate-700/40 px-2 py-1 rounded transition-shadow group-hover:shadow-lg group-hover:ring-2 group-hover:ring-blue-300 dark:group-hover:ring-blue-800 cursor-pointer"
                      title={item.description}
                    >
                      {item.description}
                    </Text>
                  </div>
                </div>
              </Link>

              {/* Footer */}
              <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-200 dark:border-slate-700">
                <Text
                  as="div"
                  size="3"
                  weight="bold"
                  className="text-green-600 dark:text-green-400"
                >
                  ₹ {item.price}
                </Text>
                <Text
                  as="div"
                  size="2"
                  className="text-gray-600 dark:text-gray-300"
                >
                  Stock: {item.stock}
                </Text>
              </div>
            </Card>
          </Box>
        );
      })}
    </div>
  );
}
