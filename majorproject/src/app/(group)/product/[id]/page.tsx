"use client";

import AddSaleButton from "@/components/Botton/AddSaleButton";
import ProductSaleChart from "@/components/UI/ProductSaleChart";
import { UserContext } from "@/components/contexts/UserContextProvider";
import { GET_PRODUCT } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/gql";
import { ProductsWithSales } from "@/type";
import { Box, Card, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function page() {
  const params = useParams();
  const { id } = params;
  const { user } = useContext(UserContext);

  console.log("id in product Details page : ", id);
  const [product, setProduct] = useState<ProductsWithSales>();
  useEffect(() => {
    async function getProduct() {
      try {
        const data: { getProduct: ProductsWithSales } = await gqlClient.request(
          GET_PRODUCT,
          {
            getProductId: id,
          }
        );
        console.log("data  in product details page : ", data);
        if (data?.getProduct) {
          setProduct(data?.getProduct);
        } else {
          console.log("product not available");
        }
      } catch {
        console.log("prodcut not found in user side");
      }
    }
    getProduct();
  }, []);

  const chartData =
    product?.sales?.map((sale) => {
      const date = new Date(Number(sale.createdAt));
      const format =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      const quantity = sale.quantity;
      const obj = {
        date: format,
        quantity,
      };
      return obj;
    }) || [];
  console.log("chartData in product details page : ", chartData);

  return (
    <div className="flex  items-center  min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
      <Box
        maxWidth="550px"
        key={product?.id}
        className="w-full items-center justify-center"
      >
        <Card className="p-8 rounded-2xl shadow-2xl border flex flex-col border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <div className="flex flex-col items-center mb-6">
            <Image
              src={product?.imageUrl ?? "/placeholder.png"}
              alt={product?.title || "Product Image"}
              width={220}
              height={120}
              className="rounded-xl object-cover border border-gray-300 dark:border-slate-700"
            />
          </div>
          <Text
            as="div"
            size="5"
            weight="bold"
            className="text-blue-700 dark:text-blue-400 mb-2 text-center"
          >
            {product?.title}
          </Text>
          <Text as="div" color="gray" size="3" className="mb-2 text-center">
            {product?.description}
          </Text>
          <div className="flex justify-center gap-6 mb-2">
            <Text
              as="div"
              size="4"
              weight="bold"
              className="text-green-600 dark:text-green-400"
            >
              Price ${product?.price}
            </Text>
            <Text
              as="div"
              size="4"
              className="text-gray-600 dark:text-gray-300"
            >
              Stock: {product?.stock}
            </Text>
          </div>
        </Card>
        <div className="w-full items-center justify-center">
          <AddSaleButton product={product} />
        </div>
      </Box>

      <div className="mt-8 w-full flex h-auto">
        {user?.role === "manager" ||
          (user?.role === "admin" && (
            <div className="w-full max-w-3xl h-100">
              <ProductSaleChart data={chartData} />
            </div>
          ))}
      </div>
    </div>
  );
}
