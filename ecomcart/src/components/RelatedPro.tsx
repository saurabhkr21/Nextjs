//@ts-nocheck
'use client';
import React, { useEffect, useState } from 'react';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import Link from 'next/link';
import AddToCart from './AddToCart';
import products from '@/constants/data';
import prismaClient from '@/services/prisma';

const RelatedProducts = ({ param }) => {
  const [favorites, setFavorites] = useState(new Set());
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      newFavorites.has(productId) ? newFavorites.delete(productId) : newFavorites.add(productId);
      return newFavorites;
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Best Seller': return 'bg-blue-500';
      case 'New': return 'bg-green-500';
      case 'Sale': return 'bg-red-500';
      case 'Hot': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  // 🔽 Fetch & Filter Data
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        // const res = await fetch('https://dummyjson.com/products');
        // const data = await res.json();
        const data=await prismaClient.products.findMany();

        const filtered = data.products.filter(
          (prod) => prod.category === param.category && prod.id !== Number(param.id)
        );

        setRelatedProducts(filtered);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchRelatedProducts();
  }, [param]);

  return (
    <div className="max-w-8xl flex flex-col justify-between p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">You might also like</h2>
        <p className="text-gray-600">Customers who viewed this item also viewed</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-between lg:grid-cols-4 gap-4">
        {relatedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white flex flex-col  rounded-xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <div className="relative">
              <img
                src={product.image_url}
                alt={product.title}
                className="w-full h-48 object-center group-hover:scale-105 transition-transform duration-300"
              />

              <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold text-white ${getBadgeColor(product.brand || 'Hot')}`}>
                {product.brand || 'Hot'}
              </div>

              {product.discountPercentage && (
                <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  -{Math.round(product.discountPercentage)}%
                </div>
              )}

              <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-2 transition-opacity duration-300 ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'}`}>
                {/* <button className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow">
                  <Eye className="w-5 h-5 text-gray-600" />
                </button> */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
                >
                  <Heart className={`w-5 h-5 ${favorites.has(product.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                </button>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {product.title}
              </h3>

              <div className="flex items-center gap-1 mb-2">
                {renderStars(product.rating)}
                <span className="text-sm text-slate-600 ml-1">({product.stock})</span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl font-bold text-gray-900">${product.price}</span>
                <span className="text-sm text-gray-500 line-through">${Math.round(product.price * 1.2)}</span>
              </div>

              {/* <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 font-medium">
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button> */}
              <AddToCart
              key={product.id}
              item={product}/>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link href={`/`}>
        <button className="bg-transparent border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-900 hover:text-white transition-colors font-medium">
          View More Products
        </button>
        </Link>
      </div>
    </div>
  );
};

export default RelatedProducts;
