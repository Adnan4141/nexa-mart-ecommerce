"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Package,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  ArrowLeft,
  AlertCircle,
  Phone,
  Calendar,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function OrderTrackingContent() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get("orderId") || "";

  const [searchQuery, setSearchQuery] = useState(initialOrderId);
  const [orderData, setOrderData] = useState<any | null>(null);
  const [searched, setSearched] = useState(false);

  const performSearch = (id: string) => {
    if (!id.trim()) return;
    setSearched(true);

    try {
      const orders = JSON.parse(localStorage.getItem("nexamart_orders") || "[]");
      const found = orders.find(
        (o: any) =>
          o.orderNumber?.toLowerCase() === id.trim().toLowerCase() ||
          o.customerPhone?.includes(id.trim())
      );

      if (found) {
        setOrderData(found);
      } else {
        // Fallback demo order for testing
        if (id.toUpperCase().startsWith("ORD-")) {
          setOrderData({
            orderNumber: id.toUpperCase(),
            customerName: "Adnan Rahman",
            customerPhone: "+880 1712 345678",
            shippingAddress: "House 24, Road 7, Banani, Dhaka",
            items: [
              {
                id: "demo-item",
                name: "Horizon Pro AMOLED Smartwatch",
                price: 99.0,
                quantity: 1,
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=350&auto=format&fit=crop&q=80",
              },
            ],
            totalAmount: 99.0,
            status: "OUT_FOR_DELIVERY",
            createdAt: new Date().toISOString(),
          });
        } else {
          setOrderData(null);
        }
      }
    } catch {
      setOrderData(null);
    }
  };

  useEffect(() => {
    if (initialOrderId) {
      performSearch(initialOrderId);
    }
  }, [initialOrderId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const steps = [
    { title: "Order Placed", desc: "Received by NexaMart Hub", icon: CheckCircle2, done: true },
    { title: "Processing & Quality Check", desc: "Item verified & packed", icon: Package, done: true },
    {
      title: "Out for Delivery",
      desc: "Handed over to VIP Courier",
      icon: Truck,
      done: orderData?.status === "OUT_FOR_DELIVERY" || orderData?.status === "DELIVERED",
    },
    { title: "Delivered", desc: "Package signed by customer", icon: MapPin, done: orderData?.status === "DELIVERED" },
  ];

  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8">
      <div>
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#0B3B3C] transition">
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-2 flex items-center gap-2.5">
          <Truck className="w-7 h-7 text-[#FFA000]" /> Live Order Tracking
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Enter your Order Tracking ID (e.g. <code>ORD-123456</code>) or contact phone to check live status.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-xs flex gap-3">
        <div className="relative flex-1">
          <Input
            required
            placeholder="Enter Order ID (ORD-XXXXXX) or Phone"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-11 text-xs rounded-xl"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
        </div>
        <Button
          type="submit"
          className="bg-[#0B3B3C] hover:bg-[#072828] text-white px-6 h-11 rounded-xl text-xs font-bold cursor-pointer transition shadow-xs"
        >
          Track Order
        </Button>
      </form>

      {/* Result Section */}
      {searched && (
        <>
          {orderData ? (
            <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-10 shadow-lg space-y-8 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Tracking ID</span>
                  <span className="text-xl font-mono font-black text-[#0B3B3C]">{orderData.orderNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-wider">
                    {orderData.status || "In Transit"}
                  </span>
                </div>
              </div>

              {/* Multi-step Visual Progress Tracker */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                {steps.map((st, i) => {
                  const Icon = st.icon;
                  return (
                    <div
                      key={i}
                      className={`p-4 rounded-2xl border transition ${
                        st.done
                          ? "bg-emerald-50/60 border-emerald-200 text-emerald-950"
                          : "bg-gray-50/50 border-gray-200 text-gray-400 opacity-60"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className={`w-5 h-5 ${st.done ? "text-emerald-600" : "text-gray-400"}`} />
                        <span className="text-xs font-extrabold">{st.title}</span>
                      </div>
                      <p className="text-[11px] leading-relaxed opacity-80">{st.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Delivery Details Details Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100 text-xs">
                <div className="space-y-1.5 p-4 rounded-xl bg-gray-50">
                  <span className="font-bold text-gray-700 block">Recipient</span>
                  <p className="text-gray-900 font-medium">{orderData.customerName}</p>
                  <p className="text-gray-500">{orderData.customerPhone}</p>
                  <p className="text-gray-600 mt-1">{orderData.shippingAddress}</p>
                </div>
                <div className="space-y-1.5 p-4 rounded-xl bg-gray-50">
                  <span className="font-bold text-gray-700 block">Estimated Delivery</span>
                  <p className="text-emerald-700 font-bold flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> Today by 6:00 PM (VIP Slot)
                  </p>
                  <p className="text-gray-500 text-[11px]">Courier: NexaMart Express Logistics (Driver #42)</p>
                  <p className="text-gray-500 text-[11px] pt-1">Total Paid: ${Number(orderData.totalAmount || 0).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center max-w-md mx-auto space-y-3">
              <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
              <h3 className="text-base font-bold text-gray-900">Order Not Found</h3>
              <p className="text-xs text-gray-500">
                We couldn&apos;t find an order matching &ldquo;<span className="font-mono font-bold text-gray-700">{searchQuery}</span>&rdquo;. Please verify your ID or contact support.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFB] selection:bg-[#FFA000] selection:text-white">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="p-12 text-center text-xs text-gray-500">Loading tracking portal...</div>}>
          <OrderTrackingContent />
        </Suspense>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
