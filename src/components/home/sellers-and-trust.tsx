"use client";

import React, { useState } from "react";
import { Star, ArrowUpRight, ArrowRight, LayoutGrid } from "lucide-react";

interface SellerItem {
  id: string;
  name: string;
  rating: number;
  reviews: string;
  logo: React.ReactNode;
  active?: boolean;
}

const SELLERS: SellerItem[] = [
  {
    id: "s1",
    name: "Easy Fashion Ltd.",
    rating: 5,
    reviews: "1.5k Review",
    logo: (
      <span className="text-2xl font-black"></span>
    ),
  },
  {
    id: "s2",
    name: "Outfit Fashion",
    rating: 5,
    reviews: "1.5k Review",
    logo: (
      <span className="w-10 h-10 rounded-full bg-[#E53935] text-white flex items-center justify-center font-black text-sm italic">
        Pl
      </span>
    ),
    active: true,
  },
  {
    id: "s3",
    name: "Artisan Fashion",
    rating: 5,
    reviews: "1.5k Review",
    logo: (
      <span className="text-2xl text-[#FFA000]">👑</span>
    ),
  },
  {
    id: "s4",
    name: "Sara Life Style",
    rating: 5,
    reviews: "1.5k Review",
    logo: (
      <span className="text-2xl font-black text-black">adidas</span>
    ),
  },
  {
    id: "s5",
    name: "Twelve Clothing",
    rating: 5,
    reviews: "1.5k Review",
    logo: (
      <span className="w-8 h-8 rounded-lg bg-[#FF6900] text-white flex items-center justify-center text-xs font-bold">
        וח
      </span>
    ),
  },
  {
    id: "s6",
    name: "Motion View",
    rating: 5,
    reviews: "1.5k Review",
    logo: (
      <span className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-sm font-black">
        S
      </span>
    ),
  },
  {
    id: "s7",
    name: "One Plus",
    rating: 5,
    reviews: "1.5k Review",
    logo: (
      <span className="w-7 h-7 rounded border border-red-500 text-red-500 flex items-center justify-center text-xs font-bold">
        1+
      </span>
    ),
  },
  {
    id: "s8",
    name: "Ferrari",
    rating: 5,
    reviews: "1.5k Review",
    logo: (
      <span className="w-8 h-8 rounded-md bg-[#FFA000] text-black flex items-center justify-center text-sm font-bold shadow-xs">
        🐎
      </span>
    ),
  },
  {
    id: "s9",
    name: "Easy Fashion Ltd.",
    rating: 5,
    reviews: "1.5k Review",
    logo: (
      <span className="text-2xl text-[#FFA000]">👑</span>
    ),
  },
];

export function SellersAndTrust() {
  const [selectedSeller, setSelectedSeller] = useState("s2");

  return (
    <section id="sellers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      {/* 1. Header: Most Popular Seller */}
      <div className="text-center space-y-1.5 max-w-xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-sans">
          Most Popular Seller
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 font-normal">
          Dining, living, and desk areas serve their purposes in total harmony of style.
        </p>
      </div>

      {/* 2. Grid of 10 Cards (9 Sellers + 1 Explore More card) matching Screenshot 1 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {SELLERS.map((seller) => {
          const isSelected = selectedSeller === seller.id;

          return (
            <div
              key={seller.id}
              onClick={() => setSelectedSeller(seller.id)}
              className={`rounded-2xl p-5 flex flex-col items-center justify-between text-center transition-all duration-300 ease-in-out cursor-pointer relative group ${
                isSelected
                  ? "bg-[#0E494A] text-white shadow-xl -translate-y-1.5 border border-[#0E494A]"
                  : "bg-white text-gray-900 border border-gray-100 shadow-xs hover:shadow-lg hover:-translate-y-1"
              }`}
            >
              {/* Seller Logo Box */}
              <div className="h-12 flex items-center justify-center mb-2 transition-transform duration-300 ease-out group-hover:scale-110">
                {seller.logo}
              </div>

              {/* Name & Star Ratings */}
              <div className="space-y-1 my-1">
                <h4 className={`text-xs font-bold line-clamp-1 transition-colors ${
                  isSelected ? "text-white" : "text-gray-900 group-hover:text-[#0E494A]"
                }`}>
                  {seller.name}
                </h4>

                <div className="flex items-center justify-center gap-1 text-[10px] text-[#FFA000]">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-current text-[#FFA000]" />
                    ))}
                  </div>
                  <span className={`text-[10px] ${isSelected ? "text-gray-300" : "text-gray-400"}`}>
                    ({seller.reviews})
                  </span>
                </div>
              </div>

              {/* Bottom Circular Arrow Icon */}
              <div className="pt-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out ${
                    isSelected
                      ? "bg-[#FFA000] text-black shadow-sm"
                      : "bg-gray-100 text-gray-500 group-hover:bg-[#0E494A] group-hover:text-white"
                  }`}
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}

        {/* 10th Card: Explore More (Soft Pale Green/Gray Background) */}
        <div className="rounded-2xl bg-[#E8EFEF] p-5 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer group">
          <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center text-[#0E494A] mb-2 shadow-xs group-hover:scale-110 transition-transform">
            <LayoutGrid className="w-5 h-5 text-[#0E494A]" />
          </div>
          <h4 className="text-xs font-black text-gray-900 group-hover:text-[#0E494A] transition-colors">
            Explore More
          </h4>
        </div>
      </div>

      {/* 3. Bottom 3 Trust Proposition Cards matching Screenshot exactly */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {/* Card 1: Money Back Guarantee (White Card with Pale Blue Icon) */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 flex items-start gap-4 shadow-xs hover:shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1">
          <div className="w-12 h-12 rounded-full bg-[#E0F2F1] flex items-center justify-center text-[#00897B] shrink-0 text-xl font-bold shadow-xs">
            🛡️
          </div>
          <div className="space-y-1.5">
            <h4 className="text-sm font-bold text-gray-900">
              Money Back Guarantee
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed font-normal">
              Enjoy a hassle-free shopping experience with Our Money Back Guarantee shop.
            </p>
            <span className="text-[11px] font-semibold text-gray-800 underline underline-offset-4 hover:text-[#0E494A] transition-colors cursor-pointer block pt-0.5">
              Explore More
            </span>
          </div>
        </div>

        {/* Card 2: 24/7 Customer Service (Highlighted Dark Forest Green Card) */}
        <div className="rounded-2xl bg-[#082928] text-white p-6 flex items-start gap-4 shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#FFA000] shrink-0 text-xl font-bold shadow-xs">
            💬
          </div>
          <div className="space-y-1.5">
            <h4 className="text-sm font-bold text-white">
              24/7 Customer Service
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed font-normal">
              Our 24/7 Customer Service ensures you are never alone—reach out anytime, day or night, for prompt assistance.
            </p>
            <span className="text-[11px] font-semibold text-[#FFA000] underline underline-offset-4 hover:text-amber-200 transition-colors cursor-pointer block pt-0.5">
              Explore More
            </span>
          </div>
        </div>

        {/* Card 3: Fast & Free Shipping (White Card with Pale Yellow/Orange Icon) */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 flex items-start gap-4 shadow-xs hover:shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1">
          <div className="w-12 h-12 rounded-full bg-[#FFF8E1] flex items-center justify-center text-[#FFA000] shrink-0 text-xl font-bold shadow-xs">
            📦
          </div>
          <div className="space-y-1.5">
            <h4 className="text-sm font-bold text-gray-900">
              Fast &amp; Free Shipping
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed font-normal">
              Enjoy a hassle-free shopping experience with Our Money Back Guarantee shop.
            </p>
            <span className="text-[11px] font-semibold text-gray-800 underline underline-offset-4 hover:text-[#0E494A] transition-colors cursor-pointer block pt-0.5">
              Explore More
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
