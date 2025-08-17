"use client";

import AddSaleButton from "@/components/Botton/AddSaleButton";
import DeleteProduct from "@/components/Botton/DeleteProduct";
import EditProductBtn from "@/components/Botton/EditProduct";
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

  // console.log("id in product Details page : ", id);

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
        // console.log("data  in product details page : ", data);
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
  // console.log("product in product details page : ", product);

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
  // console.log("chartData in product details page : ", chartData);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen  p-4 lg:p-8 gap-8 w-full">
      <Box
        maxWidth="550px"
        key={product?.id}
        className="w-full flex flex-col items-center justify-center"
      >
        <Card className="p-4 sm:p-8 rounded-2xl shadow-2xl border flex flex-col border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 w-full max-w-lg">
          {user?.role === "admin" || user?.role === "manager" ? (
            <div className="flex justify-end mb-4 gap-4">
              <EditProductBtn product={product} />
              {product && <DeleteProduct product={product} />}
            </div>
          ) : null}
          <div className="flex flex-col items-center mb-6">
            <Image
              src={product?.imageUrl ?? "/placeholder.png"}
              alt={product?.title || "Product Image"}
              width={220}
              height={120}
              className="rounded-xl object-cover border border-gray-300 dark:border-slate-700 w-full max-w-xs"
            />
          </div>
          <Text
            as="div"
            size="5"
            weight="bold"
            className="text-blue-700 dark:text-blue-400 mb-2 text-center break-words"
          >
            {product?.title}
          </Text>
          <Text
            as="div"
            color="gray"
            size="3"
            className="mb-2 text-center break-words"
          >
            {product?.description}
          </Text>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-2 w-full">
            <Text
              as="div"
              size="4"
              weight="bold"
              className="text-green-600 dark:text-green-400 text-center"
            >
              Price ${product?.price}
            </Text>
            <Text
              as="div"
              size="4"
              className="text-gray-600 dark:text-gray-300 text-center"
            >
              Stock: {product?.stock}
            </Text>
          </div>
        </Card>
        <div className="w-full flex items-center justify-center mt-4">
          {product && <AddSaleButton product={product} />}
        </div>
      </Box>

      <div className="mt-8 w-full flex h-auto">
        {user?.role === "manager" ||
          (user?.role === "admin" && (
            <div className="w-full max-w-3xl h-120">
              <ProductSaleChart data={chartData} />
            </div>
          ))}
      </div>
    </div>
  );
}
