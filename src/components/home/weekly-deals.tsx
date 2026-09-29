"use client";

import React, { useState, useEffect } from "react";
import { Star, Heart, Repeat, ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";

interface WeeklyDealsProps {
  products: Product[];
}

export function WeeklyDeals({ products }: WeeklyDealsProps) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [activeTab, setActiveTab] = useState("Almost Sold out");

  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filterTabs = [
    "Up to 50% off",
    "Under $1",
    "Almost Sold out",
    "Beauty & Health",
    "Jewelry & Accessories",
    "Home & Kitchen",
    "Men's Clothing",
    "Sports & Outdoors",
  ];

  return (
    <section id="weekly-deals" className="w-full bg-[#082928] py-12 px-4 sm:px-6 lg:px-8 my-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Section Header: Title & Limited time countdown */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
              Weekly Best Deals
            </h2>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-xs text-gray-300 font-medium">Limited time only!</span>
            <div className="flex items-center gap-1 text-xs font-mono font-bold text-white">
              <span className="bg-[#E53935] px-2 py-0.5 rounded text-[11px] font-bold shadow-xs">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <span>:</span>
              <span className="bg-[#E53935] px-2 py-0.5 rounded text-[11px] font-bold shadow-xs">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span>:</span>
              <span className="bg-[#E53935] px-2 py-0.5 rounded text-[11px] font-bold shadow-xs">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span>:</span>
              <span className="bg-[#E53935] px-2 py-0.5 rounded text-[11px] font-bold shadow-xs">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* Filter Pills with ease-in-out lift animation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-medium">
          {filterTabs.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 ${
                  isActive
                    ? "bg-[#FFA000] text-white shadow-md scale-105"
                    : "bg-[#0f3837] text-gray-300 hover:text-white hover:bg-[#144745]"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* 5 Product Cards Grid with rich ease-in-out hover animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product) => {
            const isFavorited = wishlist.includes(product.id);

            return (
              <div
                key={product.id}
                className="group relative bg-white rounded-xl p-3.5 flex flex-col justify-between shadow-sm hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-transparent hover:border-emerald-200"
              >
                {/* Top Badge & Floating Action Icons */}
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-[#E53935] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide shadow-xs transition-transform duration-300 ease-in-out group-hover:scale-105">
                    Sale
                  </span>
                  <div className="flex items-center gap-2 text-gray-400">
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

                {/* Product Image on Clean White Container with zoom & drop-shadow */}
                <div className="w-full h-36 flex items-center justify-center p-2 mb-2 relative overflow-hidden rounded-lg bg-gray-50/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transition-all duration-500 ease-out transform group-hover:scale-115 group-hover:drop-shadow-lg"
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
                      ${(product.price * 1.25).toFixed(2)}
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

                  {/* Add to Cart button with smooth Slide-Up + Fade-In ease animation */}
                  <div className="pt-2 h-10 flex items-center">
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="w-full bg-[#0E494A] hover:bg-[#073031] text-white text-xs font-semibold py-2 rounded-md shadow-xs cursor-pointer transition-all duration-300 ease-in-out transform group-hover:translate-y-0 translate-y-2 opacity-80 group-hover:opacity-100 flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#FFA000]" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom 3 Bento Cards with 3D tilt & smooth zoom */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-2">
          {/* Card 1: Fitness for Smart Special Offer */}
          <div className="md:col-span-5 bg-white rounded-2xl p-6 sm:p-7 flex items-center justify-between shadow-sm hover:shadow-2xl transition-all duration-400 ease-in-out transform hover:-translate-y-1.5 relative group">
            <div className="space-y-2 max-w-[210px] z-10">
              <span className="text-[11px] font-bold text-[#0E494A] tracking-wider uppercase block">
                — Gadget Collection
              </span>
              <h3 className="text-base sm:text-lg font-black text-[#0E494A] leading-tight">
                FITNESS FOR SMART <br />
                SPECIAL OFFER
              </h3>
              <p className="text-[11px] text-gray-500 leading-snug">
                Dining, living, &amp; desk areas serve their purposes.
              </p>
              <div className="pt-2">
                <Button size="sm" className="bg-[#0E494A] hover:bg-[#082e2f] text-white rounded-md text-xs font-semibold px-5 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 cursor-pointer">
                  Shop Now
                </Button>
              </div>
            </div>

            <div className="w-40 sm:w-48 flex items-center justify-center p-2 transition-transform duration-500 ease-out group-hover:scale-115 group-hover:rotate-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=450&auto=format&fit=crop&q=80"
                alt="Fitness Smartwatch"
                className="max-h-36 w-auto object-contain drop-shadow-md"
              />
            </div>
          </div>

          {/* Card 2: Men's Fashion */}
          <div className="md:col-span-3 bg-[#FFF8E7] rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-2xl transition-all duration-400 ease-in-out transform hover:-translate-y-1.5 relative group">
            <div className="space-y-1.5 z-10">
              <span className="text-[10px] font-bold text-[#FFA000] uppercase block">
                — Men&apos;s Fashion
              </span>
              <h3 className="text-base font-bold text-gray-900 leading-snug">
                Men&apos;s Fashion
              </h3>
              <p className="text-xs text-gray-600 font-medium">
                Offer starts from <span className="text-[#FFA000] font-bold">$29.12</span>
              </p>
              <div className="pt-1">
                <Button size="sm" className="bg-[#FFA000] hover:bg-[#e69000] text-white rounded-md text-xs font-bold px-4 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 cursor-pointer">
                  Shop Now
                </Button>
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=350&auto=format&fit=crop&q=80"
                alt="Men Fashion"
                className="max-h-36 object-contain rounded-lg drop-shadow-xs transition-transform duration-500 ease-out group-hover:scale-115"
              />
            </div>
          </div>

          {/* Card 3: Felly Fan Offer */}
          <div className="md:col-span-4 bg-[#EAF5FA] rounded-2xl p-6 flex items-center justify-between shadow-sm hover:shadow-2xl transition-all duration-400 ease-in-out transform hover:-translate-y-1.5 relative group">
            <div className="space-y-2 z-10 max-w-[170px]">
              <span className="text-[10px] font-bold text-[#0288D1] uppercase block">
                — Home Appliances
              </span>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                Felly Fan Offer
              </h3>
              <p className="text-xs text-gray-600 font-medium">
                Offer starts from <span className="text-[#0288D1] font-bold">$29.12</span>
              </p>
              <div className="pt-1">
                <Button size="sm" className="bg-[#0288D1] hover:bg-[#0277bd] text-white rounded-md text-xs font-semibold px-4 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 cursor-pointer">
                  Shop Now
                </Button>
              </div>
            </div>

            <div className="w-32 sm:w-36 flex items-center justify-center p-2 transition-transform duration-500 ease-out group-hover:scale-115 group-hover:-rotate-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=350&auto=format&fit=crop&q=80"
                alt="Felly Fan"
                className="max-h-32 w-auto object-contain drop-shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
