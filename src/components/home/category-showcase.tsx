"use client";

import React from "react";
import { ArrowRight, Ticket, Sparkles } from "lucide-react";
import { Category, Coupon } from "@/types";
import { Button } from "@/components/ui/button";

interface CategoryShowcaseProps {
  categories: Category[];
  coupons: Coupon[];
}

export function CategoryShowcase({ categories, coupons }: CategoryShowcaseProps) {
  return (
    <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-1.5 max-w-xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          Shop Deals by Category
        </h2>
        <p className="text-xs sm:text-sm text-gray-500">
          Dining, living, and desk areas serve their purposes in total harmony of style.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((cat, idx) => (
          <div
            key={cat.id}
            className="group bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer"
          >
            <div
              className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-3xl mb-3 transition-transform duration-300 group-hover:scale-110 shadow-xs ${
                idx === 2 ? "ring-2 ring-[#0B3B3C] ring-offset-2" : ""
              }`}
              style={{ backgroundColor: cat.color || "#F3F4F6" }}
            >
              <span>{cat.icon}</span>
            </div>
            <h4 className="text-xs font-bold text-gray-800 group-hover:text-[#0B3B3C] transition">
              {cat.name}
            </h4>
            <span className="text-[10px] text-gray-400 mt-0.5 group-hover:text-[#FF9900] transition flex items-center gap-0.5">
              See More <ArrowRight className="w-2.5 h-2.5" />
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#F8F9FA] rounded-2xl p-5 flex flex-col justify-between min-h-[260px] group border border-gray-100">
          <div className="w-full flex justify-center py-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop&q=80"
              alt="Nikon Camera"
              className="max-h-32 object-contain group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="text-center space-y-1.5 pt-2">
            <h3 className="text-sm font-extrabold text-gray-900">
              Nikon V2 HD Digital Camera
            </h3>
            <p className="text-xs text-gray-500">
              Starting at <span className="font-bold text-[#0B3B3C]">$29.12</span>
            </p>
            <div>
              <Button size="sm" className="bg-[#0B3B3C] hover:bg-[#072828] text-white text-xs px-4 rounded-full cursor-pointer">
                Shop Now
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-[#FFF4E8] rounded-2xl p-5 flex flex-col justify-between min-h-[260px] group border border-amber-100">
          <div className="text-center space-y-1">
            <h3 className="text-sm font-extrabold text-gray-900">
              New Samsung Smartphone
            </h3>
            <p className="text-[11px] font-bold text-red-500">Phone Discount : 30% OFF</p>
            <div className="pt-1">
              <Button size="sm" className="bg-[#FF9900] hover:bg-[#e68a00] text-white text-xs px-4 rounded-full cursor-pointer">
                Shop Now
              </Button>
            </div>
          </div>
          <div className="w-full flex justify-center py-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&auto=format&fit=crop&q=80"
              alt="Smartphone"
              className="max-h-32 object-contain group-hover:scale-105 transition-transform"
            />
          </div>
        </div>

        <div className="bg-[#F2F2F2] rounded-2xl p-5 flex flex-col justify-between min-h-[260px] group border border-gray-200">
          <div className="text-center space-y-1">
            <h3 className="text-sm font-extrabold text-gray-900">
              Wooden Chair Modern Furniture
            </h3>
            <p className="text-xs text-gray-500">
              Starting at <span className="font-bold text-[#0B3B3C]">$29.12</span>
            </p>
            <div className="pt-1">
              <Button size="sm" className="bg-[#0B3B3C] hover:bg-[#072828] text-white text-xs px-4 rounded-full cursor-pointer">
                Shop Now
              </Button>
            </div>
          </div>
          <div className="w-full flex justify-center py-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1580481077195-c9a7596a2d98?w=400&auto=format&fit=crop&q=80"
              alt="Wooden Chair"
              className="max-h-32 object-contain group-hover:scale-105 transition-transform"
            />
          </div>
        </div>

        <div className="bg-[#FEECEC] rounded-2xl p-5 flex flex-col justify-between min-h-[260px] group border border-red-100">
          <div className="text-center space-y-1">
            <h3 className="text-sm font-extrabold text-gray-900">
              Wireless Noise Cancelling Earphones
            </h3>
            <p className="text-[11px] font-bold text-red-500">Sound System Sale : 16% OFF</p>
            <div className="pt-1">
              <span className="text-xs font-bold text-red-600 hover:underline cursor-pointer flex items-center justify-center gap-1">
                Shop Now <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
          <div className="w-full flex justify-center py-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&auto=format&fit=crop&q=80"
              alt="ANC Earphones"
              className="max-h-32 object-contain group-hover:scale-105 transition-transform"
            />
          </div>
        </div>
      </div>

      <div className="relative rounded-2xl overflow-hidden bg-[#072627] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-extrabold text-[#FF9900] uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Black Friday Sale 50%
          </span>
          <h3 className="text-xl sm:text-2xl font-black">
            Save Up to <span className="text-amber-400">50%</span> with Our Exclusive Coupons
          </h3>
          <p className="text-xs text-emerald-200">
            Apply code <span className="bg-emerald-900 text-amber-300 font-mono px-2 py-0.5 rounded font-bold">NEXA50</span> at checkout
          </p>
        </div>

        <Button className="bg-[#FF9900] hover:bg-[#e68a00] text-white font-bold px-8 py-3 rounded-full text-xs shadow-md whitespace-nowrap cursor-pointer">
          <Ticket className="w-4 h-4 mr-2" /> View All Coupons
        </Button>
      </div>
    </section>
  );
}
