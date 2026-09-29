"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  CheckCircle,
  Truck,
  ArrowLeft,
  ShieldCheck,
  PackageCheck,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";
import { createDeliveryBooking } from "@/services/product-service";

export default function DeliveryBookingPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(new Date());
  const [deliverySlot, setDeliverySlot] = useState("09:00 AM - 12:00 PM (Morning)");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address || !deliveryDate) {
      alert("Please fill in your name, contact phone, delivery address, and date.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createDeliveryBooking({
        fullName,
        phone,
        deliveryDate,
        deliveryTimeSlot: deliverySlot,
        deliveryAddress: address,
      });
      if (res.success) {
        setBookingConfirmed(res.bookingId);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFB] selection:bg-[#FFA000] selection:text-white">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#0B3B3C] transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-100 gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0B3B3C] flex items-center justify-center shadow-xs">
                <Truck className="w-6 h-6 text-[#FFA000]" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight font-sans">
                  Book NexaMart VIP Express Delivery
                </h1>
                <p className="text-xs text-gray-500">
                  Pick your preferred date and exact time slot. Same-day &amp; scheduled priority delivery.
                </p>
              </div>
            </div>
            <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200 self-start md:self-auto shadow-xs flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#FFA000]" /> 100% On-Time Guarantee
            </span>
          </div>

          {bookingConfirmed ? (
            <div className="py-12 text-center space-y-4 max-w-md mx-auto">
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
              <h2 className="text-2xl font-bold text-gray-900">
                Delivery Scheduled Successfully!
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed">
                Your Booking ID is{" "}
                <span className="font-mono font-bold text-[#0B3B3C]">
                  {bookingConfirmed}
                </span>
                . Our courier team will contact{" "}
                <span className="font-bold">{phone}</span> during your selected time window:{" "}
                <span className="font-semibold text-emerald-700">{deliverySlot}</span>.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => setBookingConfirmed(null)}
                  variant="outline"
                  className="text-xs cursor-pointer"
                >
                  Book Another Slot
                </Button>
                <Link href="/">
                  <Button className="bg-[#0B3B3C] hover:bg-[#082928] text-white text-xs cursor-pointer w-full sm:w-auto">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">
                  Recipient Full Name *
                </label>
                <Input
                  type="text"
                  required
                  placeholder="e.g. Adnan Rahman"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="text-xs rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">
                  Contact Phone / WhatsApp *
                </label>
                <Input
                  type="tel"
                  required
                  placeholder="e.g. +880 1712 345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="text-xs rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 text-emerald-700" />
                  Select Preferred Date *
                </label>
                <DatePicker
                  date={deliveryDate}
                  setDate={(d) => setDeliveryDate(d)}
                  placeholder="Pick delivery date"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-700" />
                  Delivery Time Window *
                </label>
                <TimePicker
                  value={deliverySlot}
                  onChange={(val) => setDeliverySlot(val)}
                />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  Full Delivery Street Address *
                </label>
                <Input
                  type="text"
                  required
                  placeholder="House #, Road #, Area, City, Post Code"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="text-xs rounded-xl"
                />
              </div>

              {/* Guarantees */}
              <div className="md:col-span-2 bg-[#F0FDF4] border border-emerald-100 rounded-xl p-4 flex flex-wrap gap-4 items-center justify-between text-xs text-emerald-800">
                <div className="flex items-center gap-2">
                  <PackageCheck className="w-4 h-4 text-emerald-600" />
                  <span>Contactless sanitised handling available</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Real-time GPS delivery tracking link via SMS</span>
                </div>
              </div>

              <div className="md:col-span-2 pt-2 flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#0B3B3C] hover:bg-[#072828] text-white px-8 py-2.5 font-bold text-xs rounded-xl shadow-md transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 cursor-pointer"
                >
                  {isSubmitting ? "Reserving Slot..." : "Confirm Delivery Slot"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}

