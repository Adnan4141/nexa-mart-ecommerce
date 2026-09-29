"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";

interface BestSellerSectionProps {
  products: Product[];
}

export function BestSellerSection({ products }: BestSellerSectionProps) {
  const [activeTab, setActiveTab] = useState<"New Arrivals" | "Best Seller" | "Best Offers">("Best Seller");

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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-100 via-teal-50 to-emerald-200 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-emerald-200/50 shadow-xs">
        <div className="flex items-center justify-center gap-6 z-10">
          <div className="w-44 sm:w-60 pointer-events-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=80"
              alt="Amazfit Smartwatch"
              className="w-full h-auto drop-shadow-2xl rounded-2xl"
            />
          </div>
        </div>

        <div className="text-center md:text-right space-y-3 z-10 max-w-md">
          <span className="text-xs font-black tracking-widest text-[#0B3B3C] uppercase">
            NexaMart Exclusive
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
            AMAZFIT SMARTWATCH
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            UPGRADE YOUR WELLBEING WITH A FEATURE-PACKED SMARTWATCH FOR PRO ATHLETES.
          </p>
          <div className="pt-2">
            <Button className="bg-[#0B3B3C] hover:bg-[#072828] text-white px-7 py-2.5 rounded-full font-bold text-xs shadow-md cursor-pointer">
              SHOP NOW <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 pt-4 border-b border-gray-100 pb-3">
        {(["New Arrivals", "Best Seller", "Best Offers"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm sm:text-base font-bold pb-2 transition cursor-pointer ${
              activeTab === tab
                ? "text-[#0B3B3C] border-b-2 border-[#0B3B3C]"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 rounded-3xl bg-black text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-300 font-semibold">Limited time only!</span>
              <div className="flex items-center gap-1 font-mono text-xs font-black bg-white text-black px-2.5 py-1 rounded-md">
                <span>{String(sneakerTime.hours).padStart(2, "0")}</span>
                <span>:</span>
                <span>{String(sneakerTime.minutes).padStart(2, "0")}</span>
                <span>:</span>
                <span>{String(sneakerTime.seconds).padStart(2, "0")}</span>
              </div>
            </div>

            <div className="py-6 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&auto=format&fit=crop&q=80"
                alt="Sneaker Fest Watch"
                className="max-h-56 object-contain drop-shadow-[0_10px_20px_rgba(0,255,200,0.3)] group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="space-y-1 text-center">
              <h3 className="text-2xl font-black tracking-tight">Sneaker Fest 2024</h3>
              <p className="text-xs text-gray-400">Up to 40% off Women Sneakers & Smart Gear</p>
              <div className="pt-2">
                <span className="text-xs font-bold text-[#FF9900] underline cursor-pointer hover:text-amber-300 transition">
                  Shop Now &rarr;
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
