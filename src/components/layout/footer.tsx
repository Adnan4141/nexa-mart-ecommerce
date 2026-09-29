"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setIsSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#052627] text-white pt-16 pb-8 border-t border-emerald-950 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Brand Logo, Description, Subscribe Input & Social Media (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* NexaMart Brand Logo */}
            <div className="flex items-center gap-2">
              <span className="text-3xl font-extrabold tracking-tight text-white font-sans">
                Nexa<span className="text-[#FFA000]">Mart</span>
              </span>
            </div>

            {/* Tagline */}
            <p className="text-xs sm:text-sm text-gray-300 font-normal leading-relaxed max-w-sm">
              We have expertise in building scalable, high performance e-commerce application.
            </p>

            {/* We Are Ready to help + White Subscribe Input Box */}
            <div className="space-y-2.5 pt-1">
              <h4 className="text-sm font-bold text-white tracking-wide">
                We Are Ready to help
              </h4>

              {isSubscribed ? (
                <div className="bg-emerald-900/80 text-emerald-200 px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 max-w-md">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Thanks for subscribing! Check your email.
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex items-center bg-white rounded-lg p-1 max-w-md shadow-md focus-within:ring-2 focus-within:ring-[#FFA000] transition"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs text-gray-800 placeholder-gray-400 outline-none rounded-l-md"
                  />
                  <button
                    type="submit"
                    className="bg-[#FFA000] hover:bg-[#e69000] text-white text-xs font-bold px-6 py-2.5 rounded-md shadow-xs transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            {/* Social Media Circular Buttons (Facebook, Twitter, Dribbble, Behance) */}
            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs font-bold text-white tracking-wide">
                Social Media
              </h4>
              <div className="flex items-center gap-3">
                {/* Facebook (Deep Blue) */}
                <a
                  href="#facebook"
                  className="w-8 h-8 rounded-full bg-[#3B5998] hover:bg-[#2d4373] text-white flex items-center justify-center text-xs font-black shadow-sm transition-all duration-300 ease-in-out transform hover:scale-115 cursor-pointer"
                  title="Facebook"
                >
                  f
                </a>
                {/* Twitter (Light Blue) */}
                <a
                  href="#twitter"
                  className="w-8 h-8 rounded-full bg-[#00ACEE] hover:bg-[#0092ca] text-white flex items-center justify-center text-xs font-bold shadow-sm transition-all duration-300 ease-in-out transform hover:scale-115 cursor-pointer"
                  title="Twitter"
                >
                  𝕏
                </a>
                {/* Dribbble (Pink) */}
                <a
                  href="#dribbble"
                  className="w-8 h-8 rounded-full bg-[#EA4C89] hover:bg-[#d93b77] text-white flex items-center justify-center text-xs font-bold shadow-sm transition-all duration-300 ease-in-out transform hover:scale-115 cursor-pointer"
                  title="Dribbble"
                >
                  🏀
                </a>
                {/* Behance (Navy Blue) */}
                <a
                  href="#behance"
                  className="w-8 h-8 rounded-full bg-[#0057FF] hover:bg-[#0047d4] text-white flex items-center justify-center text-xs font-bold shadow-sm transition-all duration-300 ease-in-out transform hover:scale-115 cursor-pointer"
                  title="Behance"
                >
                  Bē
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Information (2.3 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-gray-200 tracking-wide">
              Information
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-normal">
              <li>
                <a href="#about" className="hover:text-white transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#delivery" className="hover:text-white transition-colors duration-200">
                  Delivery Information
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition-colors duration-200">
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <a href="#return" className="hover:text-white transition-colors duration-200">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#become-seller" className="hover:text-white transition-colors duration-200">
                  Become seller
                </a>
              </li>
              <li>
                <a href="#vendor" className="hover:text-white transition-colors duration-200">
                  Vendor profile
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links (2.3 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-gray-200 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-normal">
              <li>
                <a href="#account" className="hover:text-white transition-colors duration-200">
                  Your Account
                </a>
              </li>
              <li>
                <a href="#returns" className="hover:text-white transition-colors duration-200">
                  Returns &amp; Exchanges
                </a>
              </li>
              <li>
                <a href="#return-center" className="hover:text-white transition-colors duration-200">
                  Return Center
                </a>
              </li>
              <li>
                <a href="#purchase-history" className="hover:text-white transition-colors duration-200">
                  Purchase History
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-white transition-colors duration-200">
                  Latest News Blog
                </a>
              </li>
              <li>
                <a href="#advertise" className="hover:text-white transition-colors duration-200">
                  Advertise your products
                </a>
              </li>
              <li>
                <a href="#sell" className="hover:text-white transition-colors duration-200">
                  Sell product
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: My Accounts (2.4 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-gray-200 tracking-wide">
              My Accounts
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-normal">
              <li>
                <a href="#my-account" className="hover:text-white transition-colors duration-200">
                  My account
                </a>
              </li>
              <li>
                <a href="#cart" className="hover:text-white transition-colors duration-200">
                  Shopping Cart
                </a>
              </li>
              <li>
                <a href="#wishlist" className="hover:text-white transition-colors duration-200">
                  Wishlist
                </a>
              </li>
              <li>
                <a href="#orders" className="hover:text-white transition-colors duration-200">
                  Order History
                </a>
              </li>
              <li>
                <a href="#international" className="hover:text-white transition-colors duration-200">
                  International Orders
                </a>
              </li>
              <li>
                <a href="#your-account" className="hover:text-white transition-colors duration-200">
                  Your account
                </a>
              </li>
              <li>
                <a href="#your-orders" className="hover:text-white transition-colors duration-200">
                  Your orders
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges (Exact Screenshot Match) */}
        <div className="border-t border-emerald-950/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p className="font-normal">
            © Copyright 2026. All rights reserved.{" "}
            <span className="text-[#FFA000] font-semibold cursor-pointer hover:underline">
              NexaMart
            </span>
          </p>

          {/* Payment Method Badges */}
          <div className="flex items-center gap-2">
            {/* VISA */}
            <div className="bg-[#1A1F2C] border border-white/10 px-2.5 py-1 rounded flex items-center justify-center text-[10px] font-black italic text-white tracking-wider">
              VISA
            </div>
            {/* Mastercard */}
            <div className="bg-[#1A1F2C] border border-white/10 px-2 py-1 rounded flex items-center justify-center gap-0.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EB001B] inline-block -mr-1" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#F79E1B] inline-block opacity-90" />
            </div>
            {/* Payoneer */}
            <div className="bg-[#1A1F2C] border border-white/10 px-2.5 py-1 rounded flex items-center justify-center text-[10px] font-bold text-[#FF4800]">
              Payoneer
            </div>
            {/* PayPal */}
            <div className="bg-[#1A1F2C] border border-white/10 px-2.5 py-1 rounded flex items-center justify-center text-[10px] font-extrabold italic text-[#0079C1]">
              PayPal
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
