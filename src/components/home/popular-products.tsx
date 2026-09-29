"use client";

import React, { useState } from "react";
import { Star, Heart, Repeat, ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/cart-context";

interface PopularProductsProps {
  products: Product[];
}

export function PopularProducts({ products }: PopularProductsProps) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [hoveredCard, setHoveredCard] = useState<string | null>("pop-4"); // pop-4 has Add to cart in screenshot
  const [visibleCount, setVisibleCount] = useState(10);

  return (
    <section id="popular-products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
      {/* Title Header */}
      <div className="text-center space-y-1.5 max-w-xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-sans">
          Popular Products
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 font-normal">
          Dining, living, and desk areas serve their purposes in total harmony of style.
        </p>
      </div>

      {/* 5-Column Grid (Exactly 2 rows of 5 = 10 products as shown in Screenshot) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.slice(0, visibleCount).map((product) => {
          const isHovered = hoveredCard === product.id;
          const isFavorited = wishlist.includes(product.id);

          return (
            <div
              key={product.id}
              onMouseEnter={() => setHoveredCard(product.id)}
              className="group bg-white rounded-xl p-3.5 flex flex-col justify-between shadow-xs hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-gray-100 hover:border-emerald-200 relative"
            >
              {/* Top Action Icons (Heart & Compare) */}
              <div className="flex items-center justify-end h-5 mb-1">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-1 rounded-full transition-all duration-200 ease-in-out cursor-pointer transform hover:scale-125 ${
                      isFavorited ? "text-red-500 bg-red-50" : "hover:text-red-500 hover:bg-gray-100"
                    }`}
                    title="Wishlist"
                  >
                    <Heart className="w-3.5 h-3.5" fill={isFavorited ? "currentColor" : "none"} />
                  </button>
                  <button
                    className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-[#0E494A] transition-all duration-200 ease-in-out cursor-pointer transform hover:scale-125 hover:rotate-180"
                    title="Compare"
                  >
                    <Repeat className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Product Image on Clean Isolated Container */}
              <div className="w-full h-36 flex items-center justify-center p-2 mb-2 relative overflow-hidden rounded-lg bg-gray-50/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain transition-all duration-500 ease-out transform group-hover:scale-115 group-hover:drop-shadow-md"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-1">
                <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 leading-tight transition-colors duration-200 ease-in-out group-hover:text-[#0E494A]">
                  {product.name}
                </h3>

                <div className="flex items-center gap-1.5 pt-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#FFA000] animate-pulse" />
                  <span className="text-[11px] text-gray-500 font-medium">Motion View</span>
                </div>

                <div className="flex items-baseline gap-2 pt-0.5">
                  <span className="text-xs font-bold text-gray-900 transition-colors duration-200 ease-in-out group-hover:text-[#FFA000]">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-gray-400 line-through">
                    ${(product.originalPrice || product.price * 1.05).toFixed(2)}
                  </span>
                </div>

                {/* Star Ratings */}
                <div className="flex items-center gap-1 text-[10px] text-[#FFA000]">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-current text-[#FFA000]" />
                    ))}
                  </div>
                  <span className="text-gray-400 text-[10px]">(2)</span>
                </div>

                {/* Add to Cart button matching Screenshot style */}
                <div className="pt-2 h-10 flex items-center">
                  {isHovered ? (
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="w-full bg-[#0E494A] hover:bg-[#073031] text-white text-xs font-medium py-2 rounded-md shadow-xs cursor-pointer transition-all duration-300 ease-in-out transform group-hover:translate-y-0 translate-y-2 opacity-90 group-hover:opacity-100 flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#FFA000]" />
                      Add to Cart
                    </button>
                  ) : (
                    <div className="w-full" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More Pill Button (Exact Screenshot Style) */}
      <div className="flex justify-center pt-3">
        <button
          onClick={() => alert("All 10 popular products are currently displayed!")}
          className="border border-[#0E494A] hover:bg-[#0E494A] text-[#0E494A] hover:text-white px-8 py-2 rounded-full text-xs font-bold transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
        >
          Load More
        </button>
      </div>
    </section>
  );
}
