"use client";

import React, { useState, useEffect } from "react";
import { Star, Heart, Repeat, ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";

interface BestSellerSectionProps {
  products: Product[];
}

export function BestSellerSection({ products }: BestSellerSectionProps) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [activeTab, setActiveTab] = useState<"New Arrivals" | "Best Seller" | "Best Offers">("Best Seller");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Sneaker Fest Countdown (Screenshot 5)
  const [sneakerTime, setSneakerTime] = useState({
    hours: 20,
    minutes: 45,
    seconds: 9,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setSneakerTime((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="best-seller" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* 1. Amazfit Wide Mint Gradient Banner (Exact Screenshot 5 Top) */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#BAE8DE] via-[#E2F7F2] to-[#C9EFE8] px-8 sm:px-14 py-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xs border border-emerald-100/60 group hover:shadow-xl transition-all duration-500 ease-in-out">
        {/* Left Smartwatches Cutout */}
        <div className="w-64 sm:w-80 flex items-center justify-center p-2 transition-transform duration-700 ease-out group-hover:scale-105">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80"
            alt="Amazfit Smartwatch"
            className="max-h-48 w-auto object-contain drop-shadow-2xl"
          />
        </div>

        {/* Right Info & CTA */}
        <div className="text-center md:text-right space-y-2.5 max-w-md z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B3B3C] tracking-tight">
            AMAZFIT <br />
            SMARTWATCH
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium tracking-wide uppercase">
            UPGRADE YOUR WELLBEING <br />
            WITH A FEATURE-PACKED SMARTWATCH
          </p>
          <div className="pt-2">
            <button className="border border-[#0B3B3C] hover:bg-[#0B3B3C] text-[#0B3B3C] hover:text-white px-7 py-2 rounded-md font-bold text-xs uppercase tracking-wider transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 cursor-pointer shadow-xs">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>

      {/* 2. Tabs Selector (New Arrivals / Best Seller [Active] / Best Offers) */}
      <div className="flex items-center justify-center gap-8 border-b border-gray-100 pb-3">
        {(["New Arrivals", "Best Seller", "Best Offers"] as const).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm sm:text-base font-extrabold pb-2 transition-all duration-300 ease-in-out cursor-pointer relative ${
                isActive
                  ? "text-[#0B3B3C] border-b-2 border-[#0B3B3C] scale-105"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* 3. Grid: Left Sneaker Fest Spotlight + Right 2x4 (8 Cards) Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Dark Spotlight Card: Sneaker Fest 2024 */}
        <div className="lg:col-span-4 rounded-2xl bg-black text-white p-6 sm:p-7 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-500 ease-in-out">
          {/* Header & Timer */}
          <div className="space-y-2 z-10 text-center">
            <span className="text-[11px] text-gray-300 font-medium tracking-wide">
              Limited time only!
            </span>
            <div className="flex items-center justify-center gap-1 font-mono text-xs font-bold">
              <span className="bg-white text-black px-2.5 py-1 rounded shadow-xs">
                {String(sneakerTime.hours).padStart(2, "0")}
              </span>
              <span>:</span>
              <span className="bg-white text-black px-2.5 py-1 rounded shadow-xs">
                {String(sneakerTime.minutes).padStart(2, "0")}
              </span>
              <span>:</span>
              <span className="bg-white text-black px-2.5 py-1 rounded shadow-xs">
                {String(sneakerTime.seconds).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Central Image: Smartphone & Smartwatch */}
          <div className="my-6 flex items-center justify-center p-2 relative z-10 transition-transform duration-500 ease-out group-hover:scale-110">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=450&auto=format&fit=crop&q=80"
              alt="Sneaker Fest Products"
              className="max-h-60 w-auto object-contain drop-shadow-[0_10px_25px_rgba(0,255,200,0.35)]"
            />
          </div>

          {/* Bottom Title & Link */}
          <div className="text-center space-y-1.5 z-10">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Sneaker Fest 2024
            </h3>
            <p className="text-[11px] text-gray-400">
              Up to 40% off Women Sneakers
            </p>
            <div className="pt-1">
              <span className="text-xs font-bold text-[#FFA000] underline underline-offset-4 hover:text-amber-300 transition-colors duration-200 cursor-pointer">
                Shop Now
              </span>
            </div>
          </div>
        </div>

        {/* Right 8 Product Cards Grid (4 columns x 2 rows) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.slice(0, 8).map((product) => {
            const isHovered = hoveredCard === product.id;
            const isFavorited = wishlist.includes(product.id);

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredCard(product.id)}
                className="group bg-white rounded-xl p-3.5 flex flex-col justify-between shadow-xs hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-gray-100 hover:border-emerald-200 relative"
              >
                {/* Top Action Icons */}
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
                <div className="w-full h-32 flex items-center justify-center p-2 mb-2 relative overflow-hidden rounded-lg bg-gray-50/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transition-all duration-500 ease-out transform group-hover:scale-115 group-hover:drop-shadow-md"
                  />
                </div>

                {/* Product Details */}
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

                  {/* Ratings */}
                  <div className="flex items-center gap-1 text-[10px] text-[#FFA000]">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-current text-[#FFA000]" />
                      ))}
                    </div>
                    <span className="text-gray-400 text-[10px]">(2)</span>
                  </div>

                  {/* Add to Cart button on hover */}
                  <div className="pt-2 h-9 flex items-center">
                    {isHovered ? (
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="w-full bg-[#0E494A] hover:bg-[#073031] text-white text-xs font-medium py-1.5 rounded-md shadow-xs cursor-pointer transition-all duration-300 ease-in-out transform group-hover:translate-y-0 translate-y-2 opacity-90 group-hover:opacity-100 flex items-center justify-center gap-1.5 active:scale-95"
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
      </div>
    </section>
  );
}
