"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimePickerProps {
  value: string;
  onChange: (val: string) => void;
  className?: string;
}

export function TimePicker({ value, onChange, className }: TimePickerProps) {
  const timeSlots = [
    "09:00 AM - 12:00 PM (Morning)",
    "12:00 PM - 03:00 PM (Afternoon)",
    "03:00 PM - 06:00 PM (Evening)",
    "06:00 PM - 09:00 PM (Night Rush)",
  ];

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pl-9 text-sm text-gray-800 shadow-sm focus:border-[#FF9900] focus:outline-none focus:ring-1 focus:ring-[#FF9900] cursor-pointer"
        >
          <option value="" disabled>Select delivery time window</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
        <Clock className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-emerald-700" />
      </div>
    </div>
  );
}
