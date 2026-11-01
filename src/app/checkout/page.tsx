"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  CreditCard,
  ArrowLeft,
  CheckCircle2,
  Tag,
  AlertCircle,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/cart-context";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalCartPrice, clearCart } = useCart();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Dhaka");
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "STRIPE" | "BKASH">("COD");
  const [couponInput, setCouponInput] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCompleteId, setOrderCompleteId] = useState<string | null>(null);

  const shippingFee = totalCartPrice > 50 || totalCartPrice === 0 ? 0 : 5;
  const discountAmount = (totalCartPrice * discountPercent) / 100;
  const grandTotal = Math.max(0, totalCartPrice - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (code === "NEXA10" || code === "SAVE10") {
      setDiscountPercent(10);
      setCouponSuccess("10% discount coupon applied successfully!");
    } else if (code === "VIP20" || code === "BLACKFRIDAY") {
      setDiscountPercent(20);
      setCouponSuccess("20% VIP discount coupon applied!");
    } else {
      alert("Invalid coupon code. Try 'NEXA10' or 'VIP20'!");
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    if (!fullName || !email || !phone || !address) {
      alert("Please fill in all required shipping fields.");
      return;
    }

    setIsSubmitting(true);
    const orderNumber = "ORD-" + Math.floor(100000 + Math.random() * 900000);

    // Save order in local history for order tracking demo
    try {
      const existingOrders = JSON.parse(localStorage.getItem("nexamart_orders") || "[]");
      const newOrder = {
        orderNumber,
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,
        shippingAddress: `${address}, ${city}`,
        items: cart,
        totalAmount: grandTotal,
        paymentMethod,
        paymentStatus: paymentMethod === "COD" ? "UNPAID" : "PAID",
        status: "PROCESSING",
        createdAt: new Date().toISOString(),
      };
      existingOrders.unshift(newOrder);
      localStorage.setItem("nexamart_orders", JSON.stringify(existingOrders));
    } catch {
      // ignore
    }

    setTimeout(() => {
      setIsSubmitting(false);
      clearCart();
      setOrderCompleteId(orderNumber);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFB] selection:bg-[#FFA000] selection:text-white">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#0B3B3C] transition">
            <ArrowLeft className="w-4 h-4" /> Back to Shopping
          </Link>
        </div>

        {orderCompleteId ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-14 text-center max-w-xl mx-auto shadow-xl space-y-5 animate-in fade-in zoom-in-95">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Order Confirmed!
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Thank you, <span className="font-bold text-gray-900">{fullName}</span>! Your order has been placed successfully. A confirmation receipt has been sent to{" "}
              <span className="font-bold text-[#0B3B3C]">{email}</span>.
            </p>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-900 space-y-1">
              <span className="text-gray-500 uppercase tracking-wider block font-semibold text-[10px]">Your Order Tracking ID</span>
              <span className="text-lg font-mono font-black text-[#0B3B3C]">{orderCompleteId}</span>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={`/track-order?orderId=${orderCompleteId}`}>
                <Button className="bg-[#0B3B3C] hover:bg-[#072828] text-white text-xs font-bold px-6 py-2.5 rounded-xl cursor-pointer w-full sm:w-auto">
                  Track Live Order &rarr;
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="text-xs px-6 py-2.5 rounded-xl font-bold cursor-pointer w-full sm:w-auto">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Shipping & Payment Form */}
            <div className="lg:col-span-7 space-y-6">
              <form onSubmit={handlePlaceOrder} id="checkout-form" className="space-y-6">
                {/* 1. Customer Information */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs space-y-4">
                  <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#0B3B3C] text-white text-xs flex items-center justify-center font-bold">1</span>
                    Customer &amp; Contact Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">Full Name *</label>
                      <Input
                        required
                        placeholder="e.g. Adnan Rahman"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="text-xs rounded-xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">Email Address *</label>
                      <Input
                        required
                        type="email"
                        placeholder="adnan@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-xs rounded-xl"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-bold text-gray-700">Phone / WhatsApp Number *</label>
                      <Input
                        required
                        type="tel"
                        placeholder="+880 1712 345678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="text-xs rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Shipping Address */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs space-y-4">
                  <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#0B3B3C] text-white text-xs flex items-center justify-center font-bold">2</span>
                    Delivery Address
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">Street Address *</label>
                      <Input
                        required
                        placeholder="House #, Road #, Sector, Area"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="text-xs rounded-xl"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700">City / Region *</label>
                        <Input
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="text-xs rounded-xl"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700">Country</label>
                        <Input disabled value="Bangladesh" className="text-xs rounded-xl bg-gray-50" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Payment Method */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs space-y-4">
                  <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#0B3B3C] text-white text-xs flex items-center justify-center font-bold">3</span>
                    Select Payment Method
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label
                      onClick={() => setPaymentMethod("COD")}
                      className={`p-4 rounded-xl border flex flex-col justify-between gap-2 cursor-pointer transition ${
                        paymentMethod === "COD"
                          ? "border-[#0B3B3C] bg-emerald-50/50 ring-2 ring-[#0B3B3C]/10"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Truck className="w-5 h-5 text-[#0B3B3C]" />
                        <input type="radio" checked={paymentMethod === "COD"} readOnly className="accent-[#0B3B3C]" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gray-900 block">Cash on Delivery</span>
                        <span className="text-[10px] text-gray-500">Pay when delivered</span>
                      </div>
                    </label>

                    <label
                      onClick={() => setPaymentMethod("STRIPE")}
                      className={`p-4 rounded-xl border flex flex-col justify-between gap-2 cursor-pointer transition ${
                        paymentMethod === "STRIPE"
                          ? "border-[#0B3B3C] bg-emerald-50/50 ring-2 ring-[#0B3B3C]/10"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <CreditCard className="w-5 h-5 text-indigo-600" />
                        <input type="radio" checked={paymentMethod === "STRIPE"} readOnly className="accent-[#0B3B3C]" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gray-900 block">Card / Stripe</span>
                        <span className="text-[10px] text-gray-500">Visa, Mastercard</span>
                      </div>
                    </label>

                    <label
                      onClick={() => setPaymentMethod("BKASH")}
                      className={`p-4 rounded-xl border flex flex-col justify-between gap-2 cursor-pointer transition ${
                        paymentMethod === "BKASH"
                          ? "border-[#0B3B3C] bg-emerald-50/50 ring-2 ring-[#0B3B3C]/10"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-pink-600">bKash</span>
                        <input type="radio" checked={paymentMethod === "BKASH"} readOnly className="accent-[#0B3B3C]" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gray-900 block">Mobile Banking</span>
                        <span className="text-[10px] text-gray-500">Instant gateway</span>
                      </div>
                    </label>
                  </div>
                </div>
              </form>
            </div>

            {/* Right 5 Cols: Order Summary & Coupon */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-5 sticky top-24">
                <h3 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100 flex items-center justify-between">
                  <span>Order Summary</span>
                  <span className="text-xs font-normal text-gray-500">{cart.length} item{cart.length !== 1 ? "s" : ""}</span>
                </h3>

                {/* Items preview */}
                <div className="max-h-56 overflow-y-auto divide-y divide-gray-100 pr-1 space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-50 border p-1 shrink-0 flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-gray-900 truncate">{item.name}</h4>
                        <span className="text-[11px] text-gray-500">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="pt-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        placeholder="Coupon (e.g. VIP20)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="text-xs uppercase font-mono pl-8 rounded-xl"
                      />
                      <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-3" />
                    </div>
                    <Button type="submit" variant="outline" className="text-xs font-bold px-4 rounded-xl cursor-pointer">
                      Apply
                    </Button>
                  </div>
                  {couponSuccess && (
                    <p className="text-[11px] text-emerald-600 font-semibold mt-1.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {couponSuccess}
                    </p>
                  )}
                </form>

                {/* Totals */}
                <div className="space-y-2 pt-3 border-t border-gray-100 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-gray-900">${totalCartPrice.toFixed(2)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Discount ({discountPercent}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>{shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `$${shippingFee.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-100 text-sm">
                    <span className="font-extrabold text-gray-900">Grand Total</span>
                    <span className="text-lg font-black text-[#0B3B3C]">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Place Order CTA */}
                <Button
                  type="submit"
                  form="checkout-form"
                  disabled={isSubmitting || cart.length === 0}
                  className="w-full bg-[#0B3B3C] hover:bg-[#072828] text-white py-3.5 rounded-xl font-bold text-xs shadow-md transition-all duration-300 hover:scale-[1.01] active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Processing Order..." : `Confirm Order — $${grandTotal.toFixed(2)}`}
                </Button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>256-bit SSL Encrypted &amp; Verified Checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}

