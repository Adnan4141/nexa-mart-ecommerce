"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ShoppingBag,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Phone,
  ArrowRight,
  ShieldCheck,
  Star,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "register" ? "register" : "login";

  // Tab State: 'login' | 'register'
  const [activeTab, setActiveTab] = useState<"login" | "register">(initialTab);

  // Common State
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Register form state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Successfully logged into NexaMart!");
    }, 900);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert("Please agree to the Terms & Privacy Policy to continue.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Registration successful! Welcome to NexaMart VIP Club.");
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col justify-between font-sans selection:bg-[#FFA000] selection:text-white">
      {/* Top Header */}
      <header className="w-full bg-[#082928] py-2.5 px-6 sm:px-10 border-b border-emerald-950">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform duration-200">
              <ShoppingBag className="w-4 h-4 text-[#FFA000]" />
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              Nexa<span className="text-[#FFA000]">Mart</span>
            </span>
          </Link>

          <Link
            href="/"
            className="text-xs font-semibold text-gray-300 hover:text-white transition flex items-center gap-1.5 cursor-pointer"
          >
            &larr; Back to Shopping
          </Link>
        </div>
      </header>

      {/* Main 2-Column Split Layout with Tab Switcher */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white min-h-[580px]">
          
          {/* Column 1: Left Brand Hero Banner (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#082928] via-[#0B3B3C] to-[#041D1E] text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-16 -top-16 w-56 h-56 bg-[#FFA000]/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-2">
              <span className="inline-flex items-center gap-1 bg-white/10 text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-xs">
                {activeTab === "login" ? (
                  <>
                    <Star className="w-3 h-3 fill-current" /> VIP Member Rewards
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 fill-current" /> Join VIP Club Today
                  </>
                )}
              </span>
              <h2 className="text-xl sm:text-2xl font-black leading-tight text-white">
                {activeTab === "login" ? (
                  <>
                    Discover the Ultimate <br />
                    <span className="text-[#FFA000]">Shopping Experience.</span>
                  </>
                ) : (
                  <>
                    Unlock Exclusive <br />
                    <span className="text-[#FFA000]">50% Member Deals.</span>
                  </>
                )}
              </h2>
              <p className="text-xs text-gray-300 font-normal leading-relaxed">
                {activeTab === "login"
                  ? "Access your personalized recommendations, scheduled VIP deliveries, and members-only flash deals."
                  : "Create your account in seconds to receive instant $20 discount vouchers and same-day priority dispatch."}
              </p>
            </div>

            {/* Showcase Image */}
            <div className="relative z-10 my-2 py-1 flex items-center justify-center">
              <div className="w-36 sm:w-44 relative transition-transform duration-500 ease-out group-hover:scale-105">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    activeTab === "login"
                      ? "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&auto=format&fit=crop&q=80"
                      : "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&auto=format&fit=crop&q=80"
                  }
                  alt="NexaMart Showcase"
                  className="w-full h-auto drop-shadow-xl rounded-xl transition-all duration-500"
                />
              </div>
            </div>

            {/* Checklist */}
            <div className="relative z-10 space-y-1.5 pt-2 border-t border-white/10 text-[11px] text-emerald-200">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FFA000] shrink-0" />
                <span>Over 10,000+ verified brand items</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FFA000] shrink-0" />
                <span>Scheduled 2-hour priority delivery</span>
              </div>
            </div>
          </div>

          {/* Column 2: Right Tab-wise Auth Form (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-9 flex flex-col justify-center bg-white">
            <div className="max-w-sm w-full mx-auto space-y-4">
              
              {/* Tab Switcher Pills */}
              <div className="flex items-center p-1 bg-gray-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                    activeTab === "login"
                      ? "bg-white text-gray-900 shadow-xs"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("register")}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                    activeTab === "register"
                      ? "bg-white text-gray-900 shadow-xs"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  Register
                </button>
              </div>

              {/* Form Header */}
              <div className="space-y-0.5">
                <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight font-sans">
                  {activeTab === "login" ? "Welcome Back to NexaMart" : "Create a NexaMart Account"}
                </h1>
                <p className="text-xs text-gray-500 font-normal">
                  {activeTab === "login"
                    ? "Enter your email & password to sign in."
                    : "Fill in your details below to become a member."}
                </p>
              </div>

              {/* Tab 1: Login Form */}
              {activeTab === "login" && (
                <form onSubmit={handleLoginSubmit} className="space-y-3 animate-in fade-in duration-300">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 block">
                      Email Address
                    </label>
                    <div className="relative">
                      <Input
                        type="email"
                        required
                        placeholder="adnan@example.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="pl-9 h-9 border-gray-200 focus-visible:ring-[#FFA000] text-xs rounded-lg"
                      />
                      <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-gray-700">
                        Password
                      </label>
                      <a
                        href="#forgot"
                        className="text-[11px] font-semibold text-[#FFA000] hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="pl-9 pr-9 h-9 border-gray-200 focus-visible:ring-[#FFA000] text-xs rounded-lg"
                      />
                      <Lock className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center pt-0.5">
                    <input
                      id="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 text-[#FFA000] border-gray-300 rounded focus:ring-[#FFA000] cursor-pointer"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 text-xs font-medium text-gray-600 cursor-pointer select-none"
                    >
                      Remember me for 30 days
                    </label>
                  </div>

                  <div className="pt-1">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#082928] hover:bg-[#051c1c] text-white h-9 rounded-lg text-xs font-bold shadow-xs transition-all duration-300 ease-in-out hover:scale-[1.01] active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      {isLoading ? "Signing in..." : "Sign In to Your Account"}
                      {!isLoading && <ArrowRight className="w-3.5 h-3.5 text-[#FFA000]" />}
                    </Button>
                  </div>
                </form>
              )}

              {/* Tab 2: Register Form */}
              {activeTab === "register" && (
                <form onSubmit={handleRegisterSubmit} className="space-y-2.5 animate-in fade-in duration-300">
                  <div className="space-y-0.5">
                    <label className="text-xs font-bold text-gray-700 block">
                      Full Name *
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        required
                        placeholder="e.g. Adnan Rahman"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        className="pl-9 h-9 border-gray-200 focus-visible:ring-[#FFA000] text-xs rounded-lg"
                      />
                      <User className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <label className="text-xs font-bold text-gray-700 block">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Input
                        type="email"
                        required
                        placeholder="adnan@example.com"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        className="pl-9 h-9 border-gray-200 focus-visible:ring-[#FFA000] text-xs rounded-lg"
                      />
                      <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <label className="text-xs font-bold text-gray-700 block">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Input
                        type="tel"
                        required
                        placeholder="+880 1712 345678"
                        value={registerPhone}
                        onChange={(e) => setRegisterPhone(e.target.value)}
                        className="pl-9 h-9 border-gray-200 focus-visible:ring-[#FFA000] text-xs rounded-lg"
                      />
                      <Phone className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <label className="text-xs font-bold text-gray-700 block">
                      Password *
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="At least 8 characters"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        className="pl-9 pr-9 h-9 border-gray-200 focus-visible:ring-[#FFA000] text-xs rounded-lg"
                      />
                      <Lock className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start pt-0.5">
                    <input
                      id="tab-register-terms"
                      type="checkbox"
                      required
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="w-3.5 h-3.5 mt-0.5 text-[#FFA000] border-gray-300 rounded focus:ring-[#FFA000] cursor-pointer"
                    />
                    <label
                      htmlFor="tab-register-terms"
                      className="ml-2 text-[11px] font-medium text-gray-600 cursor-pointer leading-tight select-none"
                    >
                      I agree to the{" "}
                      <a href="#terms" className="text-[#082928] font-bold underline hover:text-[#FFA000]">
                        Terms
                      </a>{" "}
                      &amp;{" "}
                      <a href="#privacy" className="text-[#082928] font-bold underline hover:text-[#FFA000]">
                        Privacy
                      </a>
                    </label>
                  </div>

                  <div className="pt-1">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#082928] hover:bg-[#051c1c] text-white h-9 rounded-lg text-xs font-bold shadow-xs transition-all duration-300 ease-in-out hover:scale-[1.01] active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      {isLoading ? "Creating account..." : "Complete Registration"}
                      {!isLoading && <ArrowRight className="w-3.5 h-3.5 text-[#FFA000]" />}
                    </Button>
                  </div>
                </form>
              )}

              {/* Social Logins Divider */}
              <div className="relative my-2 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <span className="relative bg-white px-2.5 text-[11px] text-gray-400">
                  or continue with
                </span>
              </div>

              {/* Google & Apple Options */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 py-1.5 px-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-xs font-semibold text-gray-700 transition cursor-pointer"
                >
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 py-1.5 px-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-xs font-semibold text-gray-700 transition cursor-pointer"
                >
                  <span>Apple</span>
                </button>
              </div>

              {/* Footer Switch Prompt */}
              <p className="text-center text-xs text-gray-600 pt-0.5 font-medium">
                {activeTab === "login" ? (
                  <>
                    New to NexaMart?{" "}
                    <button
                      type="button"
                      onClick={() => setActiveTab("register")}
                      className="font-bold text-[#FFA000] hover:underline cursor-pointer"
                    >
                      Create an account
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setActiveTab("login")}
                      className="font-bold text-[#FFA000] hover:underline cursor-pointer"
                    >
                      Sign In
                    </button>
                  </>
                )}
              </p>

              <div className="pt-0.5 flex items-center justify-center gap-1 text-[10px] text-gray-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                256-bit encrypted secure authentication
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer minimal */}
      <footer className="py-3 text-center text-[11px] text-gray-400 border-t border-gray-200 bg-white">
        © {new Date().getFullYear()} NexaMart Inc. All rights reserved.
      </footer>
    </div>
  );
}
