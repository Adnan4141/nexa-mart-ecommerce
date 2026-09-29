"use client";

import React, { useState } from "react";
import { ArrowRight, Ticket } from "lucide-react";
import { Coupon } from "@/types";
import { Button } from "@/components/ui/button";

interface CategoryShowcaseProps {
  coupons?: Coupon[];
}

interface CategoryItem {
  id: string;
  name: string;
  image: string;
  bgColor: string;
  highlighted?: boolean;
}

const CATEGORY_ITEMS: CategoryItem[] = [
  {
    id: "jewelry",
    name: "Jewelry",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&auto=format&fit=crop&q=80",
    bgColor: "#FFF4E5",
  },
  {
    id: "beauty-health-1",
    name: "Beauty & Health",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&auto=format&fit=crop&q=80",
    bgColor: "#FBE9E7",
  },
  {
    id: "music-sounds",
    name: "Music & Sounds",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80",
    bgColor: "#0288D1",
    highlighted: true,
  },
  {
    id: "beauty-health-2",
    name: "Beauty & Health",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=300&auto=format&fit=crop&q=80",
    bgColor: "#FCE4EC",
  },
  {
    id: "home-appliance",
    name: "Home Appliance",
    image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=300&auto=format&fit=crop&q=80",
    bgColor: "#EDE7F6",
  },
  {
    id: "sports",
    name: "Sports",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=300&auto=format&fit=crop&q=80",
    bgColor: "#FFF3E0",
  },
];

export function CategoryShowcase({ coupons }: CategoryShowcaseProps) {
  const [selectedCat, setSelectedCat] = useState("music-sounds");

  return (
    <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Title Header */}
      <div className="text-center space-y-1.5 max-w-xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-sans">
          Shop Deals by Category
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 font-normal">
          Dining, living, and desk areas serve their purposes in total harmony of style.
        </p>
      </div>

      {/* 6 Category Circular Cards matching Screenshot 4 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {CATEGORY_ITEMS.map((cat) => {
          const isSelected = selectedCat === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`bg-white rounded-2xl p-4 flex flex-col items-center justify-between text-center transition-all duration-300 ease-in-out cursor-pointer relative group ${
                isSelected
                  ? "border border-gray-100 shadow-xl -translate-y-1.5"
                  : "border border-gray-100/70 shadow-xs hover:shadow-lg hover:-translate-y-1"
              }`}
            >
              {/* Circular Avatar */}
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center p-3 mb-3 transition-transform duration-500 ease-out group-hover:scale-110 overflow-hidden shadow-xs relative ${
                  cat.highlighted ? "ring-4 ring-sky-400/40" : ""
                }`}
                style={{ backgroundColor: cat.bgColor }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-contain drop-shadow-xs"
                />
              </div>

              {/* Title */}
              <h4 className="text-xs font-bold text-gray-800 transition-colors duration-200 group-hover:text-[#0B3B3C]">
                {cat.name}
              </h4>

              {/* Bottom Action Pill */}
              <div className="pt-2">
                {isSelected ? (
                  <span className="inline-flex items-center gap-1 bg-[#0E494A] text-white text-[10px] font-semibold px-3 py-1 rounded-full shadow-xs transition-all duration-300 ease-in-out">
                    See More &rarr;
                  </span>
                ) : (
                  <span className="text-[10px] text-gray-400 font-medium group-hover:text-[#FFA000] transition-colors duration-200 flex items-center justify-center gap-0.5">
                    See More &rarr;
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4 Feature Promo Cards Grid (Exact Screenshot 4 Layout & Styling) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Nikon V2 Camera (Light Gray Background) */}
        <div className="bg-[#F8F9FA] rounded-2xl p-5 flex flex-col justify-between min-h-[310px] border border-gray-100 shadow-xs hover:shadow-xl transition-all duration-400 ease-in-out transform hover:-translate-y-1 group">
          <div className="w-full flex-1 flex items-center justify-center py-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=450&auto=format&fit=crop&q=80"
              alt="Nikon V2 HD Digital Camera"
              className="max-h-36 w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-110 drop-shadow-sm"
            />
          </div>
          <div className="text-center space-y-1.5 pt-3">
            <h3 className="text-sm font-bold text-gray-900 leading-tight">
              Nikon V2 <br />
              HD Digital Camera
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              Starting at <span className="font-bold text-red-500">$29.12</span>
            </p>
            <div className="pt-1.5">
              <Button size="sm" className="bg-[#0B3B3C] hover:bg-[#072828] text-white text-xs font-semibold px-6 rounded-full shadow-xs transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 cursor-pointer">
                Shop Now
              </Button>
            </div>
          </div>
        </div>

        {/* Card 2: New Samsung Smartphone (Light Peach Background) */}
        <div className="bg-[#FFF4E8] rounded-2xl p-5 flex flex-col justify-between min-h-[310px] border border-amber-100/60 shadow-xs hover:shadow-xl transition-all duration-400 ease-in-out transform hover:-translate-y-1 group">
          <div className="text-center space-y-1">
            <h3 className="text-sm font-bold text-gray-900 leading-tight">
              New Samsung <br />
              Smartphone Green
            </h3>
            <p className="text-[11px] font-semibold text-red-500">Phone Discount : 30% OFF</p>
            <div className="pt-1">
              <Button size="sm" className="bg-[#FFA000] hover:bg-[#e69000] text-white text-xs font-bold px-6 rounded-full shadow-xs transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 cursor-pointer">
                Shop Now
              </Button>
            </div>
          </div>
          <div className="w-full flex-1 flex items-center justify-center py-2 mt-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=450&auto=format&fit=crop&q=80"
              alt="Samsung Smartphone"
              className="max-h-36 w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-110 drop-shadow-sm"
            />
          </div>
        </div>

        {/* Card 3: Wooden Chair Modern Furniture (Soft Light Gray) */}
        <div className="bg-[#EDEDED] rounded-2xl p-5 flex flex-col justify-between min-h-[310px] border border-gray-200/60 shadow-xs hover:shadow-xl transition-all duration-400 ease-in-out transform hover:-translate-y-1 group">
          <div className="text-center space-y-1">
            <h3 className="text-sm font-bold text-gray-900 leading-tight">
              Wooden Chair <br />
              Modern Furniture
            </h3>
            <p className="text-xs text-gray-600 font-medium">
              Starting at <span className="font-bold text-red-500">$29.12</span>
            </p>
            <div className="pt-1">
              <Button size="sm" className="bg-[#0B3B3C] hover:bg-[#072828] text-white text-xs font-semibold px-6 rounded-full shadow-xs transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 cursor-pointer">
                Shop Now
              </Button>
            </div>
          </div>
          <div className="w-full flex-1 flex items-center justify-center py-2 mt-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1580481077195-c9a7596a2d98?w=450&auto=format&fit=crop&q=80"
              alt="Wooden Chair Modern Furniture"
              className="max-h-36 w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-110 drop-shadow-sm"
            />
          </div>
        </div>

        {/* Card 4: Wireless Noise Cancelling Earphones (Soft Pink Background) */}
        <div className="bg-[#FEEBEB] rounded-2xl p-5 flex flex-col justify-between min-h-[310px] border border-red-100 shadow-xs hover:shadow-xl transition-all duration-400 ease-in-out transform hover:-translate-y-1 group">
          <div className="text-center space-y-1">
            <h3 className="text-sm font-bold text-gray-900 leading-tight">
              Wireless Noise Cancelling <br />
              Earphones
            </h3>
            <p className="text-[11px] font-semibold text-red-500">Sound system Sale : 16% OFF</p>
            <div className="pt-1">
              <span className="text-xs font-bold text-red-500 hover:text-red-700 cursor-pointer flex items-center justify-center gap-1 transition-all duration-200">
                Shop Now <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
              </span>
            </div>
          </div>
          <div className="w-full flex-1 flex items-center justify-center py-2 mt-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=450&auto=format&fit=crop&q=80"
              alt="Noise Cancelling Earphones"
              className="max-h-36 w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-110 drop-shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Dark Forest Green Coupon Banner (Exact Screenshot 4) */}
      <div className="relative rounded-xl overflow-hidden bg-[#072627] text-white px-6 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md transition-all duration-400 ease-in-out hover:shadow-xl">
        <div className="space-y-0.5 text-center sm:text-left">
          <span className="text-[10px] font-bold text-[#FFA000] uppercase tracking-wider block">
            Black Friday Sale 20%
          </span>
          <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
            Save Up to <span className="text-[#FFA000]">50%</span> with Our Coupons
          </h3>
        </div>

        <Button className="bg-[#FFA000] hover:bg-[#e69000] text-gray-900 font-bold px-6 py-2 rounded-full text-xs shadow-md whitespace-nowrap transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 cursor-pointer">
          View All Coupons
        </Button>
      </div>
    </section>
  );
}
