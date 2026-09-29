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
    <section id="delivery-slot" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="rounded-3xl bg-[#093537] text-white p-8 sm:p-12 mb-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div className="space-y-4 max-w-lg z-10 text-center md:text-left">
          <span className="text-xs font-bold text-[#FF9900] uppercase tracking-wider">
            Mobile Commerce App
          </span>
          <h2 className="text-2xl sm:text-4xl font-black leading-tight">
            NexaMart User Friendly App Available
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200">
            Enjoy exclusive mobile discounts, instant live courier tracking, and priority same-day dispatch right from your pocket.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
            <button className="bg-black hover:bg-gray-900 text-white px-5 py-2.5 rounded-xl flex items-center gap-3 border border-emerald-900/60 shadow-md transition cursor-pointer">
              <span className="text-2xl">🍏</span>
              <div className="text-left leading-none">
                <span className="text-[10px] text-gray-400 block">Download on the</span>
                <span className="text-xs font-bold">App Store</span>
              </div>
            </button>
            <button className="bg-[#FF9900] hover:bg-[#e68a00] text-white px-5 py-2.5 rounded-xl flex items-center gap-3 shadow-md transition cursor-pointer">
              <span className="text-2xl">🤖</span>
              <div className="text-left leading-none">
                <span className="text-[10px] text-amber-100 block">Get it on</span>
                <span className="text-xs font-bold">Google Play</span>
              </div>
            </button>
          </div>
        </div>

        <div className="w-64 sm:w-80 pointer-events-none z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&auto=format&fit=crop&q=80"
            alt="Mobile App Preview"
            className="w-full h-auto drop-shadow-2xl rounded-3xl"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-100 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0B3B3C] flex items-center justify-center shadow-xs">
              <Truck className="w-6 h-6 text-[#FF9900]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900">
                Book NexaMart VIP Express Delivery
              </h3>
              <p className="text-xs text-gray-500">
                Pick your preferred date and exact time slot. Powered by Next.js & PostgreSQL ready API.
              </p>
            </div>
          </div>
          <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 self-start md:self-auto">
            ⚡ 100% On-Time Guarantee
          </span>
        </div>

        {bookingConfirmed ? (
          <div className="py-12 text-center space-y-4 max-w-md mx-auto">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto" />
            <h4 className="text-xl font-bold text-gray-900">
              Delivery Scheduled Successfully!
            </h4>
            <p className="text-xs text-gray-600">
              Your Booking ID is <span className="font-mono font-bold text-[#0B3B3C]">{bookingConfirmed}</span>. Our courier team will contact <span className="font-bold">{phone}</span> during your selected time window: <span className="font-semibold text-emerald-700">{deliverySlot}</span>.
            </p>
            <Button
              onClick={() => setBookingConfirmed(null)}
              variant="outline"
              className="mt-4 cursor-pointer"
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
                className="bg-[#0B3B3C] hover:bg-[#072828] text-white px-8 py-2.5 font-bold text-xs rounded-xl shadow-md cursor-pointer"
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
