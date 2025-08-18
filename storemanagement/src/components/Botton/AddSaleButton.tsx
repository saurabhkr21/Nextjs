import { useState } from "react";
import gqlClient from "@/lib/services/gql";
import { CREATE_SALE } from "@/lib/gql/queries";
import { ProductsWithSales } from "@/type";

export default function AddSaleButton({ product }: { product: ProductsWithSales }) {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSale() {
    setError("");
    setSuccess("");
    if (quantity < 1) {
      setError("Quantity must be at least 1");
      return;
    }
    try {
      const data: { createSale: boolean } = await gqlClient.request(CREATE_SALE, {
        id: product.id,
        quantity,
      });
      if (data.createSale) {
        setSuccess(`Added ${quantity} to sale!`);
      }
    } catch (err) {
      setError("Failed to create sale");
    }
  }

  return (
    <div className="flex flex-col items-center gap-3 p-4  rounded-xl shadow-md border border-gray-200 dark:border-slate-700 w-full max-w-xs">
      <label className="w-full text-sm font-semibold mb-1">
        Quantity To Sale
      </label>
      <input
        value={quantity}
        onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
        type="number"
        min={1}
        max={product?.stock}
        placeholder="Add quantity"
        className="w-full px-3 py-2 border rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-400"
      />
      <button
        onClick={handleSale}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
        disabled={product?.stock === 0}
      >
        Add to sale
      </button>
      {error && <div className="text-red-500 text-xs mt-2">{error}</div>}
      {success && <div className="text-green-500 text-xs mt-2">{success}</div>}
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Available stock: {product?.stock}
      </div>
    </div>
  );
}
