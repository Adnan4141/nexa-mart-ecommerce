"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingBag, User, ChevronDown, Menu, Flame, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";

export function Header() {
  const { totalCartCount, totalCartPrice, wishlist, setIsCartOpen } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All Categories",
    "Smartphones",
    "Laptops & Computers",
    "Audio & Headphones",
    "Furniture",
    "Beauty & Health",
    "Fashion",
  ];

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-40 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-[#083333] text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
            <p className="font-medium tracking-wide">
              🔥 Introducing Big Display Horizon Pro Smartwatch @ <span className="text-amber-300 font-bold">$99</span> — Limited Time Offer!
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-gray-300 text-xs">
            <span className="flex items-center gap-1 hover:text-white cursor-pointer transition">
              <Phone className="w-3.5 h-3.5 text-amber-400" /> Support: +1 (800) 456-7890
            </span>
            <span className="flex items-center gap-1 hover:text-white cursor-pointer transition">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Genuine Guaranteed
            </span>
          </div>
        </div>
      </div>

      {/* Main Brand & Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-[#0B3B3C] flex items-center justify-center text-white shadow-md">
              <ShoppingBag className="w-6 h-6 text-[#FF9900]" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-[#0B3B3C]">
                Nexa<span className="text-[#FF9900]">Mart</span>
              </span>
              <p className="text-[10px] text-gray-400 font-medium -mt-1 tracking-wider uppercase">
                Premium Store
              </p>
            </div>
          </Link>

          {/* Search Box with Category Selector */}
          <div className="hidden md:flex flex-1 max-w-2xl items-center relative">
            <div className="flex w-full border-2 border-[#0B3B3C] rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-[#FF9900] transition">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-50 text-xs font-semibold text-gray-700 px-4 py-2.5 border-r border-gray-200 outline-none cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search in 10,000+ products, gadgets, essentials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm outline-none text-gray-800 placeholder-gray-400"
                />
              </div>
              <button className="bg-[#FF9900] hover:bg-[#e68a00] text-white px-6 font-semibold flex items-center justify-center transition cursor-pointer">
                <Search className="w-4 h-4 mr-1.5" /> Search
              </button>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Wishlist */}
            <button
              className="relative p-2 text-gray-600 hover:text-[#0B3B3C] hover:bg-gray-50 rounded-full transition cursor-pointer"
              title="Wishlist"
            >
              <Heart className="w-6 h-6" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 bg-[#FF9900] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 p-1.5 hover:bg-gray-50 rounded-lg transition group cursor-pointer"
            >
              <div className="relative p-1.5 bg-emerald-50 rounded-full group-hover:bg-emerald-100 transition">
                <ShoppingBag className="w-5 h-5 text-[#0B3B3C]" />
                <span className="absolute -top-1 -right-1 bg-[#FF9900] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {totalCartCount}
                </span>
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-[11px] text-gray-400 leading-none">Your Cart</span>
                <span className="text-xs font-bold text-gray-800">${totalCartPrice.toFixed(2)}</span>
              </div>
            </button>

            {/* Login / Register Link */}
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-2 pl-2 border-l border-gray-200 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-gray-100 group-hover:bg-emerald-50 group-hover:text-[#0B3B3C] flex items-center justify-center text-gray-600 transition">
                <User className="w-5 h-5" />
              </div>
              <div className="text-left text-xs leading-tight">
                <span className="text-gray-400 block text-[10px]">Hello,</span>
                <span className="font-bold text-[#0B3B3C] group-hover:text-[#FF9900] transition">
                  Login / Sign In
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="mt-3 md:hidden">
          <div className="flex w-full border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#FF9900]">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 text-sm outline-none"
            />
            <button className="bg-[#FF9900] text-white px-4 cursor-pointer">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Menu Bar */}
      <div className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="relative group py-2.5">
              <button className="flex items-center gap-2.5 bg-[#0B3B3C] text-white px-4 py-2 rounded-md font-semibold text-xs tracking-wide hover:bg-[#082b2c] transition shadow-xs cursor-pointer">
                <Menu className="w-4 h-4 text-[#FF9900]" />
                <span>Browse Categories</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1 opacity-70" />
              </button>

              <div className="absolute top-full left-0 w-64 bg-white border border-gray-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2">
                {categories.slice(1).map((cat) => (
                  <a
                    key={cat}
                    href="#categories"
                    className="block px-4 py-2 text-xs text-gray-700 hover:bg-emerald-50 hover:text-[#0B3B3C] font-medium transition"
                  >
                    {cat}
                  </a>
                ))}
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-gray-700">
              <a href="#hero" className="hover:text-[#FF9900] transition">Shop</a>
              <a href="#weekly-deals" className="flex items-center gap-1 text-[#0B3B3C] font-bold hover:text-[#FF9900] transition">
                Super Deals <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded font-bold">HOT</span>
              </a>
              <a href="#delivery-slot" className="hover:text-[#FF9900] transition">Delivery Slots</a>
              <a href="#categories" className="hover:text-[#FF9900] transition">Whats New</a>
              <a href="#weekly-deals" className="flex items-center gap-1 text-red-500 font-bold hover:text-red-600 transition">
                <Flame className="w-3.5 h-3.5" /> Special Offer
              </a>
              <a href="#sellers" className="hover:text-[#FF9900] transition">Top Sellers</a>
            </nav>
          </div>

          <div className="py-2.5 hidden sm:flex items-center gap-2 text-xs font-semibold text-[#0B3B3C]">
            <span className="text-gray-400">⚡ Super Fast Delivery:</span>
            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[11px] font-bold">
              Within 2 Hours
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
