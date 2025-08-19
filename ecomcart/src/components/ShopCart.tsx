//@ts-nocheck
import { useState, useEffect } from "react";

export default function ShopCart({
  item,
  index,
  handleRemove,
  onQuantityChange,
}) {
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const updateCartInLocalStorage = (newQuantity) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart[index].quantity = newQuantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    if (onQuantityChange) onQuantityChange(index, newQuantity);
  };

  const handleQuantityIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateCartInLocalStorage(newQuantity);
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateCartInLocalStorage(newQuantity);
    }
  };

  const totalPrice = (item.price * quantity).toFixed(2);

  return (
    <div key={item.id} className="flex rounded-md h-full w-full mb-4">
      <div className="flex shadow-amber-100 shadow-2xl rounded-md overflow-hidden">
        <div className="w-80 flex-shrink-0">
          <img
            src={item.image_url}
            alt="product Image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex w-full flex-col gap-4 bg-blue-50 p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-800 flex-1 mr-4">
              {item.title}
            </h3>
            <button
              onClick={() => handleRemove(index)}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-red-100 transition-colors duration-200"
              title="Remove from cart"
            >
              <img
                width="20"
                src="https://img.icons8.com/material-outlined/24/filled-trash.png"
                alt="Remove item"
              />
            </button>
          </div>

          <p className="text-gray-600 text-sm line-clamp-2">
            {item.description}
          </p>

          <div className="flex justify-between items-center">
            <div className="text-lg font-bold text-green-600">
              ${item.price} each
            </div>
            <div className="flex items-center gap-3 bg-white rounded-lg px-3 py-2 shadow-sm">
              <button
                onClick={handleQuantityDecrease}
                disabled={quantity <= 1}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 flex items-center justify-center text-lg font-bold transition-colors duration-200"
              >
                −
              </button>
              <span className="font-semibold text-lg min-w-[2rem] text-center">
                {quantity}
              </span>
              <button
                onClick={handleQuantityIncrease}
                className="w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center text-lg font-bold transition-colors duration-200"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Rating:</span>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="font-medium">{item.rating}</span>
              </div>
            </div>
            <div className="text-xl font-bold text-blue-600">
              Total: ${totalPrice}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
