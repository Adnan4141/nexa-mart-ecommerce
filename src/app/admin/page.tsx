"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Package,
  TrendingUp,
  Users,
  DollarSign,
  Plus,
  Trash2,
  Tag,
  Truck,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  LayoutDashboard,
  ShoppingBag,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WEEKLY_DEALS, POPULAR_PRODUCTS, BEST_SELLERS } from "@/data/mock-data";
import { Product } from "@/types";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders">("overview");

  // Simulated product inventory
  const [products, setProducts] = useState<Product[]>([
    ...WEEKLY_DEALS.slice(0, 4),
    ...POPULAR_PRODUCTS.slice(0, 4),
  ]);

  // Form for new product
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState("Audio & Headphones");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [isSuccessMsg, setIsSuccessMsg] = useState<string | null>(null);

  // Simulated orders
  const [orders, setOrders] = useState<any[]>([
    {
      id: "ORD-928174",
      customer: "Adnan Rahman",
      itemsCount: 2,
      total: 198.0,
      payment: "STRIPE (PAID)",
      status: "PROCESSING",
      timeSlot: "09:00 AM - 12:00 PM",
    },
    {
      id: "ORD-847291",
      customer: "Sara Khan",
      itemsCount: 1,
      total: 45.0,
      payment: "COD (UNPAID)",
      status: "SHIPPED",
      timeSlot: "02:00 PM - 05:00 PM",
    },
    {
      id: "ORD-739102",
      customer: "Tanvir Ahmed",
      itemsCount: 3,
      total: 240.0,
      payment: "BKASH (PAID)",
      status: "DELIVERED",
      timeSlot: "VIP Priority 2-Hour",
    },
  ]);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;

    const newProd: Product = {
      id: "prod-" + Date.now(),
      name: newTitle,
      price: parseFloat(newPrice) || 29.99,
      category: newCategory,
      image: newImageUrl.trim() || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=350&auto=format&fit=crop&q=80",
      rating: 5.0,
      reviewCount: 1,
      inStock: true,
      totalStock: 50,
    };

    setProducts([newProd, ...products]);
    setNewTitle("");
    setNewPrice("");
    setNewImageUrl("");
    setIsSuccessMsg("New product published to storefront successfully!");
    setTimeout(() => setIsSuccessMsg(null), 3000);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFB] selection:bg-[#FFA000] selection:text-white">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
          <div>
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#0B3B3C] transition">
              <ArrowLeft className="w-4 h-4" /> Exit to Storefront
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-1 flex items-center gap-2">
              <LayoutDashboard className="w-7 h-7 text-[#0B3B3C]" /> NexaMart Control Center
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">Admin dashboard, inventory &amp; order dispatch manager</p>
          </div>

          <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl select-none">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition ${
                activeTab === "overview" ? "bg-white text-gray-900 shadow-xs" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition ${
                activeTab === "products" ? "bg-white text-gray-900 shadow-xs" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Inventory ({products.length})
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition ${
                activeTab === "orders" ? "bg-white text-gray-900 shadow-xs" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Orders ({orders.length})
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Total Sales</span>
                  <span className="text-2xl font-black text-[#0B3B3C]">$48,290.00</span>
                  <span className="text-[10px] text-emerald-600 font-bold block mt-1">+18.2% from last month</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Total Orders</span>
                  <span className="text-2xl font-black text-gray-900">1,248</span>
                  <span className="text-[10px] text-emerald-600 font-bold block mt-1">+42 new today</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#FFA000] flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Active Users</span>
                  <span className="text-2xl font-black text-gray-900">3,890</span>
                  <span className="text-[10px] text-emerald-600 font-bold block mt-1">99.4% satisfaction</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Dispatched Today</span>
                  <span className="text-2xl font-black text-emerald-700">98.6%</span>
                  <span className="text-[10px] text-gray-500 font-semibold block mt-1">Average delivery: 1.8 hrs</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Truck className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Quick action cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-gray-900">Recent VIP Delivery Schedules</h3>
                <div className="divide-y divide-gray-100">
                  {orders.map((o) => (
                    <div key={o.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-gray-900 block">{o.customer}</span>
                        <span className="text-[11px] text-gray-400">{o.id} • {o.timeSlot}</span>
                      </div>
                      <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full text-[11px]">
                        {o.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-gray-900">Database &amp; Platform Status</h3>
                <div className="space-y-2.5 text-xs text-gray-600">
                  <div className="flex justify-between p-2.5 rounded-xl bg-gray-50">
                    <span>ORM &amp; Schema:</span>
                    <strong className="text-emerald-700">Prisma Client v6.19 (PostgreSQL)</strong>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-gray-50">
                    <span>Hosting Environment:</span>
                    <strong className="text-emerald-700">AWS EC2 + PM2 Process Cluster</strong>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-gray-50">
                    <span>Edge CDN:</span>
                    <strong className="text-emerald-700">Vercel Production Active</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INVENTORY & PRODUCT MANAGEMENT */}
        {activeTab === "products" && (
          <div className="space-y-8 animate-in fade-in">
            {/* Add Product Form */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-[#FFA000]" /> Add New Product to Catalog
              </h2>
              {isSuccessMsg && (
                <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl flex items-center gap-2 border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> {isSuccessMsg}
                </div>
              )}
              <form onSubmit={handleCreateProduct} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-gray-700">Product Title *</label>
                  <Input
                    required
                    placeholder="e.g. Sony WH-1000XM5 ANC Headphones"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="text-xs rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Price ($) *</label>
                  <Input
                    required
                    type="number"
                    step="0.01"
                    placeholder="299.00"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="text-xs rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full h-9 rounded-xl border border-gray-200 text-xs px-3 bg-white"
                  >
                    <option value="Audio & Headphones">Audio &amp; Headphones</option>
                    <option value="Smartphones">Smartphones</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Fashion">Fashion</option>
                  </select>
                </div>
                <div className="sm:col-span-3 space-y-1">
                  <label className="text-xs font-bold text-gray-700">Image URL (Optional)</label>
                  <Input
                    placeholder="https://images.unsplash.com/photo-..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="text-xs rounded-xl"
                  />
                </div>
                <div className="flex items-end">
                  <Button type="submit" className="w-full bg-[#0B3B3C] hover:bg-[#072828] text-white text-xs font-bold h-9 rounded-xl cursor-pointer">
                    Publish Product
                  </Button>
                </div>
              </form>
            </div>

            {/* Existing Products List */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs">
              <div className="p-4 border-b border-gray-100 font-bold text-xs text-gray-900">
                Current Inventory Products ({products.length})
              </div>
              <div className="divide-y divide-gray-100">
                {products.map((p) => (
                  <div key={p.id} className="p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-50 border p-1 shrink-0 flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">{p.name}</h4>
                        <span className="text-[11px] text-gray-400">{p.category} • In Stock: {p.totalStock || 50}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-black text-[#0B3B3C]">${p.price.toFixed(2)}</span>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ORDER DISPATCH MANAGEMENT */}
        {activeTab === "orders" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs">
              <div className="p-4 border-b border-gray-100 font-bold text-xs text-gray-900">
                Order Fulfillment Queue ({orders.length})
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-600">
                  <thead className="bg-gray-50 text-gray-400 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-3.5">Order ID</th>
                      <th className="p-3.5">Customer</th>
                      <th className="p-3.5">Total Amount</th>
                      <th className="p-3.5">Delivery Slot</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Update Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-gray-50/50">
                        <td className="p-3.5 font-mono font-bold text-[#0B3B3C]">{o.id}</td>
                        <td className="p-3.5 font-bold text-gray-900">{o.customer}</td>
                        <td className="p-3.5 font-bold text-gray-900">${o.total.toFixed(2)}</td>
                        <td className="p-3.5 text-gray-500">{o.timeSlot}</td>
                        <td className="p-3.5">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              o.status === "DELIVERED"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                : o.status === "SHIPPED"
                                ? "bg-blue-50 text-blue-700 border border-blue-100"
                                : "bg-amber-50 text-amber-700 border border-amber-100"
                            }`}
                          >
                            {o.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-1">
                          <button
                            onClick={() => handleUpdateOrderStatus(o.id, "PROCESSING")}
                            className="px-2 py-1 text-[10px] rounded bg-gray-100 hover:bg-gray-200 transition"
                          >
                            Processing
                          </button>
                          <button
                            onClick={() => handleUpdateOrderStatus(o.id, "SHIPPED")}
                            className="px-2 py-1 text-[10px] rounded bg-blue-100 text-blue-800 hover:bg-blue-200 transition"
                          >
                            Shipped
                          </button>
                          <button
                            onClick={() => handleUpdateOrderStatus(o.id, "DELIVERED")}
                            className="px-2 py-1 text-[10px] rounded bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition"
                          >
                            Delivered
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
