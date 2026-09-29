"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Bento Column (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          {/* Main Top Banner: Furniture Collection */}
          <div className="relative rounded-3xl overflow-hidden bg-[#EBF2F3] p-8 sm:p-12 min-h-[380px] flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all duration-500 ease-in-out">
            <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-emerald-100/60 rounded-full blur-2xl pointer-events-none transition-transform duration-700 ease-in-out group-hover:scale-125" />

            <div className="relative z-10 max-w-sm space-y-4">
              <span className="inline-block bg-white text-[#0B3B3C] text-xs font-bold px-3 py-1 rounded-full shadow-xs uppercase tracking-wider transition-all duration-300 ease-in-out group-hover:bg-[#0B3B3C] group-hover:text-white">
                Weekend Special
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B3B3C] leading-[1.15] tracking-tight">
                Best Furniture <br />
                <span className="text-emerald-700 transition-colors duration-300 ease-in-out group-hover:text-emerald-900">
                  Collection
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Dining, living, &amp; desk areas serve their purposes in total harmony of style and ergonomics.
              </p>
              <div>
                <Button className="bg-[#0B3B3C] hover:bg-[#082828] text-white px-7 py-3 rounded-full font-bold shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:translate-x-1 active:scale-95 cursor-pointer">
                  Shop Now <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                </Button>
              </div>
            </div>

            {/* Armchair cutout with 3D float animation */}
            <div className="absolute right-4 bottom-2 sm:right-10 sm:bottom-6 w-52 sm:w-80 pointer-events-none transition-all duration-500 ease-out transform group-hover:scale-110 group-hover:-translate-y-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&auto=format&fit=crop&q=80"
                alt="Yellow Armchair Furniture"
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>

            <div className="relative z-10 flex items-center gap-1.5 pt-4">
              <span className="w-6 h-2 rounded-full bg-[#0B3B3C] transition-all duration-300 ease-in-out" />
              <span className="w-2 h-2 rounded-full bg-gray-400 hover:bg-[#0B3B3C] transition-colors duration-200 cursor-pointer" />
              <span className="w-2 h-2 rounded-full bg-gray-400 hover:bg-[#0B3B3C] transition-colors duration-200 cursor-pointer" />
            </div>
          </div>

          {/* Bottom Sub-banners */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Men's Fashion */}
            <div className="relative rounded-2xl overflow-hidden bg-[#E8EEF5] p-6 flex flex-col justify-between min-h-[190px] group shadow-sm hover:shadow-xl transition-all duration-500 ease-in-out transform hover:-translate-y-1">
              <div className="relative z-10 max-w-[160px] space-y-2">
                <span className="text-[11px] font-bold text-red-500 uppercase tracking-wider">
                  Super Sale 50%
                </span>
                <h3 className="text-lg font-black text-gray-900 leading-snug">
                  Stylish Men&apos;s Fashion
                </h3>
                <Button size="sm" className="bg-[#0B3B3C] hover:bg-[#072828] text-white rounded-full text-xs font-semibold px-4 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 cursor-pointer">
                  Shop Now
                </Button>
              </div>
              <div className="absolute right-0 bottom-0 w-36 pointer-events-none transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-x-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=400&auto=format&fit=crop&q=80"
                  alt="Men Fashion"
                  className="w-full h-auto drop-shadow-lg"
                />
              </div>
            </div>

            {/* Kids Mid Summer Promo */}
            <div className="relative rounded-2xl overflow-hidden bg-[#FBF0EA] p-6 flex flex-col justify-between min-h-[190px] group shadow-sm hover:shadow-xl transition-all duration-500 ease-in-out transform hover:-translate-y-1">
              <div className="relative z-10 max-w-[160px] space-y-1">
                <span className="text-[11px] font-black text-amber-700 tracking-wider">
                  Mid Summer
                </span>
                <div className="text-2xl font-black text-red-600 transition-transform duration-300 ease-in-out group-hover:scale-110 origin-left">
                  -30%
                </div>
                <p className="text-xs text-gray-600 font-medium">Trendy Kids Wear</p>
                <div className="pt-1">
                  <span className="text-xs font-bold text-[#0B3B3C] group-hover:text-[#FF9900] transition-colors duration-200 cursor-pointer flex items-center gap-1">
                    Discover <ArrowRight className="w-3 h-3 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 w-36 pointer-events-none transition-transform duration-500 ease-out group-hover:scale-110">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400&auto=format&fit=crop&q=80"
                  alt="Kid Fashion"
                  className="w-full h-auto drop-shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Tall Banner (4 Cols) */}
        <div className="lg:col-span-4">
          <div className="relative rounded-3xl overflow-hidden bg-[#F3EBE6] p-8 sm:p-10 h-full flex flex-col justify-between min-h-[460px] group shadow-sm hover:shadow-xl transition-all duration-500 ease-in-out">
            <div className="relative z-10 space-y-3">
              <span className="text-xs font-extrabold text-red-600 uppercase tracking-wider">
                Super Sale 50%
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
                Stylish Looks <br />
                For Any Season
              </h2>
              <p className="text-xs text-gray-600 max-w-xs">
                Hand-picked modern luxury fashion tailored for everyday chic elegance.
              </p>
              <div>
                <Button className="bg-[#8E443D] hover:bg-[#72342e] text-white rounded-full text-xs font-bold px-6 shadow-md transition-all duration-300 ease-in-out transform hover:translate-x-1 active:scale-95 cursor-pointer">
                  Shop Now <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                </Button>
              </div>
            </div>

            <div className="relative mt-6 w-full flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80"
                alt="Season Fashion"
                className="w-full max-h-[360px] object-cover rounded-2xl shadow-xl transition-all duration-700 ease-out transform group-hover:scale-105 group-hover:shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
