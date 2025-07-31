//@ts-nocheck
"use client"
import { useEffect, useState } from 'react';

export default function Payment() {
    const [cartItem, setCartItem] = useState([]);
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('cart') || "[]");
        setCartItem(stored);

        const handleCartUpdate = () => {
            const updated = JSON.parse(localStorage.getItem('cart') || "[]");
            setCartItem(updated);
        };
        window.addEventListener("cartUpdated", handleCartUpdate);

        return () => {
            window.removeEventListener("cartUpdated", handleCartUpdate);
        };
    }, []);

    let totalPrice = 0;
    let itemPrice = 0;
    for (let i = 0; i < cartItem.length; i++) {
        itemPrice += cartItem[i].price;
    }
    return (
        <div className=" flex flex-col justify-end p-2 gap-5 w-[400px] text-xl">
            <div className='flex flex-col border-b-1 gap-4'>
                <button className='bg-amber-500  rounded-md flex flex-1  justify-center-safe'>
                    Pay with EcoCart
                </button>
                <span className='text-sm'>
                    By placing your order, you agree to Amazon's
                    <span className=' underline'> privacy notice </span> and
                    <span className=' underline'> conditions of use. </span>
                </span>
            </div>
            <div className='flex flex-col text-sm'>
                <span className='flex justify-between'>
                    <span>Items:</span>
                    <span>${itemPrice.toFixed(2)}</span>
                </span>
                <span className='flex justify-between'>
                    <span>Delivery:</span>
                    <span>$ 0.00</span>
                </span>
                <span className='flex justify-between'>
                    <span>Marketplace Fee:</span>
                    <span>$ 5.00</span>
                </span>
                <span className='flex font-medium justify-between'>
                    <span>Order Total</span>
                    <span>$ {totalPrice.toFixed(2)}</span>
                </span>
            </div>

        </div>

    )
}
