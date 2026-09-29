"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Successfully logged into NexaMart!");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col justify-between font-sans selection:bg-[#FFA000] selection:text-white">
      {/* Top Simple Header */}
      <header className="w-full bg-[#082928] py-4 px-4 sm:px-8 border-b border-emerald-950">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform duration-200">
              <ShoppingBag className="w-5 h-5 text-[#FFA000]" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white">
              Nexa<span className="text-[#FFA000]">Mart</span>
            </span>
          </Link>

          <Link
            href="/"
            className="text-xs font-semibold text-gray-300 hover:text-white transition flex items-center gap-1 cursor-pointer"
          >
            &larr; Back to Shopping
          </Link>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-md bg-white rounded-3xl p-7 sm:p-10 shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl">
          {/* Card Header */}
          <div className="text-center space-y-2 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#082928] text-white flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-7 h-7 text-[#FFA000]" />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight font-sans">
              Welcome Back
            </h1>
            <p className="text-xs text-gray-500 font-normal">
              Sign in to manage your orders, wishlist, and VIP express delivery.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 block">
                Email Address
              </label>
              <div className="relative">
                <Input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 border-gray-200 focus-visible:ring-[#FFA000]"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-700">
                  Password
                </label>
                <a
                  href="#forgot"
                  className="text-xs font-semibold text-[#FFA000] hover:underline cursor-pointer"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11 border-gray-200 focus-visible:ring-[#FFA000]"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-[#FFA000] border-gray-300 rounded focus:ring-[#FFA000] cursor-pointer"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 text-xs font-medium text-gray-600 cursor-pointer select-none"
              >
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#082928] hover:bg-[#051c1c] text-white h-11 rounded-xl text-xs font-bold shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoading ? "Signing in..." : "Sign In to NexaMart"}
              {!isLoading && <ArrowRight className="w-4 h-4 text-[#FFA000]" />}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <span className="relative bg-white px-3 text-xs text-gray-400">
              or continue with
            </span>
          </div>

          {/* Social Auth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 text-xs font-bold text-gray-700 transition cursor-pointer">
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 text-xs font-bold text-gray-700 transition cursor-pointer">
              <span>Apple</span>
            </button>
          </div>

          {/* Switch to Register */}
          <p className="text-center text-xs text-gray-600 mt-6 font-medium">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-[#FFA000] hover:underline cursor-pointer"
            >
              Create Account
            </Link>
          </p>

          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-center gap-1.5 text-[11px] text-gray-400 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            End-to-end 256-bit encrypted security
          </div>
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="py-6 text-center text-xs text-gray-400 border-t border-gray-200 bg-white">
        © {new Date().getFullYear()} NexaMart Inc. All rights reserved.
      </footer>
    </div>
  );
}
