//@ts-nocheck
"use client"
import Image from 'next/image';
import { useState } from 'react';
import AddToCart from './AddToCart';
import Link from 'next/link';

const SearchProd = ({ item }) => {
    const [isWishListed, setIsWishListed] = useState(false);
    const [activeImage, setActiveImage] = useState(item.image_url || item.images?.[0]);

    const handleWishlist = () => setIsWishListed(!isWishListed);

    const costPrice = (discountedPrice, discountPercentage) =>
        discountPercentage >= 100 ? 0 : (discountedPrice / (1 - discountPercentage / 100)).toFixed(2);

    const discountedPrice = item.price;
    const discountPercentage = item.discountPercentage;
    const originalPrice = costPrice(discountedPrice, discountPercentage);

    return (
        <div className="flex  rounded-md border shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden max-w-6xl">
            <div className="relative w-[650px] p-2 border-r bg-gray-50">
                <div className="relative h-100  rounded-sm overflow-hidden">
                    <Link href={`/product/${item.id}`}>
                        <Image
                            src={activeImage}
                            alt={item.title}
                            fill
                            className="object-contain transition-transform duration-300"
                        />
                    </Link>
                    <div className="flex absolute bottom-0 gap-2 mt-3 overflow-x-auto">
                        {item.images?.map((img, idx) => (
                            <div key={idx} className="w-16 h-16  rounded border cursor-pointer m-1 overflow-hidden">
                                <Image
                                    src={img}
                                    alt={`thumb-${idx}`}
                                    width={48}
                                    height={48}
                                    className={`object-cover w-full h-full ${activeImage === img ? 'ring-2 ring-blue-500' : ''}`}
                                    onClick={() => setActiveImage(img)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                {item.discountPercentage > 0 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold shadow">
                        -{item.discountPercentage}%
                    </div>
                )}

                <button
                    onClick={handleWishlist}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-50"
                >
                    <svg
                        className={`w-6 h-6 ${isWishListed ? 'text-red-500 fill-current' : 'text-gray-400'}`}
                        fill={isWishListed ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
            </div>

            <div className="flex flex-col h-[160px] justify-between p-2 sm:p-4 w-full">

                <div className="text-xs uppercase text-gray-500">{item.category}</div>
                <Link href={`/product/${item.id}`}>
                    <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2 mt-1">
                        {item.title}
                    </h2>
                </Link>

                <div className="flex items-center mt-2 mb-1">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-xs text-gray-600 ml-2">({item.brand})</span>
                </div>

                <div className="flex items-center justify-between mt-2 mb-1">
                    <div className="space-x-2">
                        <span className="text-xl font-bold text-gray-900">${discountedPrice}</span>
                        {originalPrice && (
                            <span className="text-sm line-through text-gray-400">${originalPrice}</span>
                        )}
                    </div>
                    <span className={`text-sm ${item.stock ? 'text-green-600' : 'text-red-500'}`}>
                        {item.stock ? 'In Stock' : 'Out of Stock'}
                    </span>
                </div>

                <p className="text-sm text-gray-600 mt-2 line-clamp-3">{item.description}</p>

                <div className="mt-3 text-sm space-y-1 text-gray-700">
                    <p><strong>Warranty:</strong> {item.warrantyInformation || 'No warranty info'}</p>
                    <p><strong>Shipping:</strong> {item.shippingInformation || 'Standard shipping applies'}</p>
                </div>

                {item.reviews?.length > 0 && (
                    <div className="mt-2 sm:mt-3 bg-gray-50 rounded-lg p-1 sm:p-2">
                        <p className="font-medium text-gray-800 mb-2">Customer Reviews:</p>
                        <ul className="space-y-2 max-h-[120px] overflow-y-auto pr-2">
                            {item.reviews.slice(0, 3).map((review, idx) => (
                                <li key={idx} className="text-sm  pb-1">
                                    <span className="text-blue-600 font-semibold">{review.user}</span>: <span className="text-gray-700">{review.comment}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="mt-2 sm:mt-4">
                    <AddToCart
                        key={item.id}
                        item={item} />
                </div>
            </div>
        </div>
    );
};

export default SearchProd;
