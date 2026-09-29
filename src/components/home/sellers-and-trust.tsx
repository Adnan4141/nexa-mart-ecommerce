"use client";

import React from "react";
import { Star, RotateCcw, Headphones, Truck, ArrowRight } from "lucide-react";
import { Seller } from "@/types";

interface SellersAndTrustProps {
  sellers: Seller[];
}

export function SellersAndTrust({ sellers }: SellersAndTrustProps) {
  return (
    <section id="sellers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-6">
        <div className="text-center space-y-1.5 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Most Popular Seller
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Dining, living, and desk areas serve their purposes in total harmony of style.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {sellers.map((seller, idx) => (
            <div
              key={seller.id}
              className={`p-4 rounded-2xl border transition-all text-center flex flex-col items-center justify-between group cursor-pointer ${
                idx === 1
                  ? "bg-[#0B3B3C] text-white border-[#0B3B3C] shadow-lg"
                  : "bg-white border-gray-100 hover:border-emerald-200 hover:shadow-md"
              }`}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-3 shadow-xs ${
                  idx === 1 ? "bg-white/10" : "bg-gray-50"
                }`}
              >
                <span>{seller.logo}</span>
              </div>

              <div>
                <h4
                  className={`text-xs font-bold line-clamp-1 ${
                    idx === 1 ? "text-white" : "text-gray-900"
                  }`}
                >
                  {seller.name}
                </h4>
                <div
                  className={`flex items-center justify-center gap-1 text-[11px] mt-1 ${
                    idx === 1 ? "text-amber-300" : "text-amber-500"
                  }`}
                >
                  <Star className="w-3 h-3 fill-current" />
                  <span className="font-bold">{seller.rating}</span>
                  <span
                    className={`text-[10px] ${
                      idx === 1 ? "text-emerald-200" : "text-gray-400"
                    }`}
                  >
                    ({seller.totalReviews})
                  </span>
                </div>
              </div>

              <div className="pt-3 w-full">
                <span
                  className={`inline-block w-6 h-6 rounded-full text-xs font-black leading-6 mx-auto ${
                    idx === 1
                      ? "bg-amber-400 text-[#0B3B3C]"
                      : "bg-gray-100 text-gray-600 group-hover:bg-[#0B3B3C] group-hover:text-white"
                  } transition`}
                >
                  &rarr;
                </span>
              </div>
            </div>
          ))}

          <div className="p-4 rounded-2xl border border-dashed border-gray-300 bg-gray-50/50 hover:bg-emerald-50 hover:border-emerald-400 transition-all text-center flex flex-col items-center justify-center group cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-500 group-hover:text-[#0B3B3C] mb-2 shadow-xs">
              <ArrowRight className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-gray-800 group-hover:text-[#0B3B3C]">
              Explore More
            </h4>
            <p className="text-[10px] text-gray-400">50+ Stores</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="rounded-2xl border border-gray-100 bg-[#F4F9F9] p-6 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-sky-600 shadow-xs shrink-0">
            <RotateCcw className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-gray-900">
              Money Back Guarantee
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              If an item is damaged or not as described, return it within 30 days for a 100% full refund.
            </p>
            <span className="text-[11px] font-bold text-[#0B3B3C] hover:underline cursor-pointer block pt-1">
              Read Policy &rarr;
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-[#093537] text-white p-6 flex items-start gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#FF9900] shadow-xs shrink-0">
            <Headphones className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-white">
              24/7 Dedicated Support
            </h4>
            <p className="text-xs text-emerald-200/90 leading-relaxed">
              Real human support agents ready 24/7 via live chat, phone, or instant ticket resolution.
            </p>
            <span className="text-[11px] font-bold text-amber-300 hover:underline cursor-pointer block pt-1">
              Chat With Us &rarr;
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-[#FFFDF5] p-6 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-amber-600 shadow-xs shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-gray-900">
              Free Express Shipping
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Enjoy zero shipping charges on every order above $50 with real-time GPS tracking.
            </p>
            <span className="text-[11px] font-bold text-[#0B3B3C] hover:underline cursor-pointer block pt-1">
              Learn More &rarr;
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
