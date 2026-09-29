"use client";

import React, { useState } from "react";
import { Calendar as CalendarIcon, Clock, MapPin, CheckCircle, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";
import { createDeliveryBooking } from "@/services/product-service";

export function DeliveryBookingWidget() {
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
    <section id="delivery-slot" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* 1. NexaMart User Friendly App Available Banner (Exact Screenshot Match) */}
      <div className="rounded-3xl bg-[#082928] text-white px-8 sm:px-14 py-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl group hover:shadow-2xl transition-all duration-500 ease-in-out">
        {/* Left Typography & App Store Buttons */}
        <div className="space-y-4 max-w-lg z-10 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight font-sans">
            NexaMart User Friendly <br />
            App Available
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 font-normal leading-relaxed">
            Appropriately monetize one-to-one interfaces rather than cutting-edge. <br className="hidden sm:inline" />
            Competently disintermediate backward.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3.5 pt-3">
            {/* Google Play Button */}
            <a
              href="#download"
              className="bg-[#FFA000] hover:bg-[#e69000] text-white px-5 py-2.5 rounded-lg flex items-center gap-3 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span className="text-xl">▶</span>
              <div className="text-left leading-tight">
                <span className="text-[9px] text-amber-100 uppercase tracking-wider block font-semibold">
                  Get it on
                </span>
                <span className="text-xs font-black tracking-wide">Google Play</span>
              </div>
            </a>

            {/* Apple App Store Button */}
            <a
              href="#download"
              className="bg-white hover:bg-gray-100 text-gray-900 px-5 py-2.5 rounded-lg flex items-center gap-3 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span className="text-xl">🍏</span>
              <div className="text-left leading-tight">
                <span className="text-[9px] text-gray-500 uppercase tracking-wider block font-semibold">
                  Download on the
                </span>
                <span className="text-xs font-black tracking-wide">App Store</span>
              </div>
            </a>
          </div>
        </div>

        {/* Right 2 Overlapping Mobile Screens (Exact Screenshot Mockup) */}
        <div className="relative w-72 sm:w-96 flex items-end justify-center z-10 transition-transform duration-700 ease-out group-hover:scale-105">
          {/* Back Angled Phone */}
          <div className="w-48 sm:w-56 rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-800 bg-white transform -rotate-12 translate-x-6 translate-y-4">
            <div className="p-3 bg-white space-y-2">
              <div className="h-2 w-12 bg-gray-200 rounded-full mx-auto" />
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=350&auto=format&fit=crop&q=80"
                  alt="Product UI Preview"
                  className="max-h-24 w-auto object-contain"
                />
              </div>
              <div className="space-y-1">
                <div className="h-2 w-20 bg-gray-300 rounded" />
                <div className="h-2 w-14 bg-[#FFA000] rounded" />
              </div>
            </div>
          </div>

          {/* Front Clean App Mockup with Promo UI */}
          <div className="w-52 sm:w-60 rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-800 bg-white relative z-20">
            <div className="bg-[#E0F2F1] p-3 text-center space-y-0.5">
              <span className="bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                Weekend Discount
              </span>
              <h4 className="text-xs font-extrabold text-[#0B3B3C]">
                Flat <span className="text-emerald-700">20% Off</span> Your First Order
              </h4>
            </div>

            <div className="p-3 bg-white space-y-2">
              <div className="flex items-center gap-1 text-[9px] text-gray-500">
                <span>✔ Ergonomic Design</span>
                <span>✔ 100% Genuine</span>
              </div>
              <div className="rounded-xl overflow-hidden bg-gray-50 aspect-video flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=350&auto=format&fit=crop&q=80"
                  alt="Headphones Offer"
                  className="max-h-20 w-auto object-contain"
                />
              </div>
              <div className="w-full bg-[#0E494A] text-white text-[10px] font-bold py-1.5 rounded-md text-center">
                Shop Now
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive VIP Delivery Booking Form with Shadcn Components */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-100 gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0B3B3C] flex items-center justify-center shadow-xs">
              <Truck className="w-6 h-6 text-[#FFA000]" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-gray-900 tracking-tight font-sans">
                Book NexaMart VIP Express Delivery
              </h3>
              <p className="text-xs text-gray-500">
                Pick your preferred date and exact time slot. Powered by Next.js & PostgreSQL ready API.
              </p>
            </div>
          </div>
          <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 self-start md:self-auto shadow-xs">
            ⚡ 100% On-Time Guarantee
          </span>
        </div>

        {bookingConfirmed ? (
          <div className="py-12 text-center space-y-4 max-w-md mx-auto">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="text-xl font-bold text-gray-900">
              Delivery Scheduled Successfully!
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Your Booking ID is <span className="font-mono font-bold text-[#0B3B3C]">{bookingConfirmed}</span>. Our courier team will contact <span className="font-bold">{phone}</span> during your selected time window: <span className="font-semibold text-emerald-700">{deliverySlot}</span>.
            </p>
            <Button
              onClick={() => setBookingConfirmed(null)}
              variant="outline"
              className="mt-4 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              Book Another Slot
            </Button>
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
              />
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
    </section>
  );
}
