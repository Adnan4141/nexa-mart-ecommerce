"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/types";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";

interface WeeklyDealsProps {
  products: Product[];
}

export function WeeklyDeals({ products }: WeeklyDealsProps) {
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
    "Men Clothing",
    "Sports & Outdoors",
  ];

  return (
    <section id="weekly-deals" className="w-full bg-[#052627] text-white py-12 px-4 sm:px-6 lg:px-8 my-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-emerald-900/60">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
              Weekly Best Deals
            </h2>
            <p className="text-xs text-emerald-300/80 mt-1">
              Grab premium products with exclusive massive price drops. Refreshes weekly!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-emerald-200">Limited time only!</span>
            <div className="flex items-center gap-1 font-mono text-xs font-black">
              <span className="bg-red-600 text-white px-2 py-1 rounded shadow-xs">
                {String(timeLeft.days).padStart(2, "0")}d
              </span>
              <span>:</span>
              <span className="bg-red-600 text-white px-2 py-1 rounded shadow-xs">
                {String(timeLeft.hours).padStart(2, "0")}h
              </span>
              <span>:</span>
              <span className="bg-red-600 text-white px-2 py-1 rounded shadow-xs">
                {String(timeLeft.minutes).padStart(2, "0")}m
              </span>
              <span>:</span>
              <span className="bg-red-600 text-white px-2 py-1 rounded shadow-xs">
                {String(timeLeft.seconds).padStart(2, "0")}s
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-medium">
          {filterTabs.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-4 py-2 rounded-full transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#FF9900] text-white font-bold shadow-md"
                    : "bg-[#0B3B3C] text-emerald-100/90 hover:bg-emerald-800/60"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="dark"
              showProgressBar={true}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
          <div className="relative rounded-2xl overflow-hidden bg-[#EFF6F8] p-6 text-gray-900 flex justify-between items-center group">
            <div className="space-y-2 max-w-[170px] z-10">
              <span className="text-[11px] font-bold text-emerald-700 tracking-wider uppercase">
                Gadget Collection
              </span>
              <h3 className="text-base sm:text-lg font-black leading-tight text-[#0B3B3C]">
                FITNESS FOR SMART SPECIAL OFFER
              </h3>
              <p className="text-[11px] text-gray-500">
                Next-gen health monitoring & multi-sport tracker.
              </p>
              <Button size="sm" className="bg-[#0B3B3C] hover:bg-[#072828] text-white rounded-md text-xs font-semibold px-4 mt-1 cursor-pointer">
                Shop Now
              </Button>
            </div>
            <div className="w-36 pointer-events-none group-hover:scale-105 transition-transform duration-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&auto=format&fit=crop&q=80"
                alt="Fitness Smartwatch"
                className="w-full h-auto drop-shadow-md"
              />
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden bg-[#FFF9E6] p-6 text-gray-900 flex justify-between items-center group">
            <div className="space-y-2 max-w-[170px] z-10">
              <span className="text-[11px] font-bold text-amber-700 tracking-wider uppercase">
                Men&apos;s Fashion
              </span>
              <h3 className="text-base sm:text-lg font-black leading-tight text-gray-900">
                Urban Casual Wear
              </h3>
              <p className="text-xs font-semibold text-gray-600">
                Offer starts from <span className="text-amber-700 font-bold">$29.12</span>
              </p>
              <Button size="sm" className="bg-[#FF9900] hover:bg-[#e68a00] text-white rounded-md text-xs font-semibold px-4 mt-1 cursor-pointer">
                Shop Now
              </Button>
            </div>
            <div className="w-32 pointer-events-none group-hover:scale-105 transition-transform duration-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=400&auto=format&fit=crop&q=80"
                alt="Men Jacket"
                className="w-full h-auto drop-shadow-md"
              />
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden bg-[#EBF7FD] p-6 text-gray-900 flex justify-between items-center group">
            <div className="space-y-2 max-w-[170px] z-10">
              <span className="text-[11px] font-bold text-sky-700 tracking-wider uppercase">
                Home Appliances
              </span>
              <h3 className="text-base sm:text-lg font-black leading-tight text-gray-900">
                Felly Desk Fan Offer
              </h3>
              <p className="text-xs font-semibold text-gray-600">
                Offer starts from <span className="text-sky-700 font-bold">$19.99</span>
              </p>
              <Button size="sm" className="bg-sky-600 hover:bg-sky-700 text-white rounded-md text-xs font-semibold px-4 mt-1 cursor-pointer">
                Shop Now
              </Button>
            </div>
            <div className="w-32 pointer-events-none group-hover:scale-105 transition-transform duration-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=400&auto=format&fit=crop&q=80"
                alt="Portable Fan"
                className="w-full h-auto drop-shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
