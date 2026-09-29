"use client";

import React, { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
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
    <footer className="bg-[#052324] text-white pt-14 pb-8 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <ShoppingBag className="w-5 h-5 text-[#FF9900]" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Nexa<span className="text-[#FF9900]">Mart</span>
              </span>
            </div>

            <p className="text-xs text-emerald-200/80 leading-relaxed max-w-sm">
              We connect millions of verified shoppers worldwide with premium electronics, stylish apparel, and everyday home essentials.
            </p>

            <div className="pt-2">
              <p className="text-xs font-bold text-gray-200 mb-2">
                Subscribe for weekly VIP discounts:
              </p>
              {isSubscribed ? (
                <div className="bg-emerald-800/60 text-emerald-200 px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Thanks for subscribing! Check your inbox for coupons.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border border-emerald-900 px-3.5 py-2 rounded-l-lg text-xs text-white placeholder-gray-400 outline-none w-full focus:ring-1 focus:ring-[#FF9900]"
                  />
                  <Button
                    type="submit"
                    className="bg-[#FF9900] hover:bg-[#e68a00] text-white px-5 rounded-r-lg rounded-l-none text-xs font-bold"
                  >
                    Subscribe
                  </Button>
                </form>
              )}
            </div>

            <div className="flex items-center gap-3 pt-3">
              <a href="#" className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white hover:opacity-80 transition text-xs font-bold">
                f
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white hover:opacity-80 transition text-xs font-bold">
                𝕏
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-white hover:opacity-80 transition text-xs font-bold">
                ig
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white hover:opacity-80 transition text-xs font-bold">
                ▶
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><a href="#about" className="hover:text-white transition">About Us</a></li>
              <li><a href="#privacy" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white transition">Terms & Conditions</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact Us</a></li>
              <li><a href="#faq" className="hover:text-white transition">Help & FAQs</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Customer Area
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><a href="#account" className="hover:text-white transition">My Account</a></li>
              <li><a href="#orders" className="hover:text-white transition">Order Tracking</a></li>
              <li><a href="#wishlist" className="hover:text-white transition">Wishlist</a></li>
              <li><a href="#delivery-slot" className="hover:text-white transition">VIP Delivery Schedule</a></li>
              <li><a href="#support" className="hover:text-white transition">Customer Support</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              NexaMart Business
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><a href="#sell" className="hover:text-white transition">Sell on NexaMart</a></li>
              <li><a href="#affiliate" className="hover:text-white transition">Affiliate Program</a></li>
              <li><a href="#wholesale" className="hover:text-white transition">Wholesale Inquiries</a></li>
              <li><a href="#careers" className="hover:text-white transition">Careers</a></li>
              <li><a href="#press" className="hover:text-white transition">Press & Media</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-emerald-950/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} NexaMart Inc. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold text-gray-400">Secure Payments:</span>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              <span className="font-bold text-sky-400">VISA</span>
              <span className="font-bold text-red-400">Mastercard</span>
              <span className="font-bold text-amber-400">PayPal</span>
              <span className="font-bold text-emerald-400">bKash</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
