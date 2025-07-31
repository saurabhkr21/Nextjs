//@ts-nocheck
"use client"

import ShopCart from "@/components/ShopCart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Payment from "../../components/Payment";



export default function page() {
    const [cartItem, setCartItem] = useState([]);
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('cart') || "[]");
        setCartItem(stored);
    }, []);
    function handleRemove(indexToDelete) {
        const updatedCart = cartItem.filter((_, index) => (index !== indexToDelete));
        setCartItem(updatedCart);
        // Update localStorage to persist the change
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("cartUpdated"));
    }
    let totalPrice = 0;
    // for (let i = 0; i < cartItem.length; i++) {
    //     totalPrice += cartItem[i].price;
    // }
    const router = useRouter();
    const goBack = () => {
        router.back();
    };

    const handleQuantityChange = (index, newQuantity) => {
    const updatedItems = [...cartItem];
    updatedItems[index].quantity = newQuantity;
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
};
    return (
        <div className="flex gap-5 p-10 h-full w-full">
            <div className="flex flex-col top-[60px]">
                <button onClick={goBack} className="text-black p-2 rounded">
                    ⬅️ Go Back
                </button>
                {
                    cartItem.length === 0 ? (
                        <p className="text-2xl font-medium">Cart is Empty</p>
                    ) : (
                        cartItem.map((item, index) => (
                            <ShopCart
                                key={item.id}
                                item={item}
                                index={index}
                                handleRemove={handleRemove}
                                handleQuantityChange={handleQuantityChange}
                            />
                            
                        ))
                    )
                }
            </div>
            <div className="sticky top-0 right-0 h-60 w-110 bg-white shadow-md p-2 rounded  z-50">
                <Payment />
            </div>
        </div>
    )
}


//@ts-nocheck


// export default function layout({ children }) {
//     return (
//         <div className="">
//                 {/* <Header/> */}
            
//             {/* <Payment/> */}
//             {children}
//         </div>
//     )
// }
