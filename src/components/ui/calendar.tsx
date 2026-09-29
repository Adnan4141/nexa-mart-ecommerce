"use client";

import * as React from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalendarProps {
  selected?: Date | null;
  onSelect?: (date: Date) => void;
  className?: string;
  minDate?: Date;
}

export function Calendar({ selected, onSelect, className, minDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState<Date>(selected || new Date());

  const days = React.useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const startDayOfWeek = startOfMonth(currentMonth).getDay();

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const weekDayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className={cn("p-3 bg-white rounded-lg select-none", className)}>
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-gray-100">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="p-1 hover:bg-gray-100 rounded text-gray-600 transition cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-semibold text-gray-900">
          {format(currentMonth, "MMMM yyyy")}
        </span>
        <button
          type="button"
          onClick={handleNextMonth}
          className="p-1 hover:bg-gray-100 rounded text-gray-600 transition cursor-pointer"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-400 mb-2">
        {weekDayNames.map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startDayOfWeek }).map((_, index) => (
          <div key={"empty-" + index} className="h-8" />
        ))}

        {days.map((day) => {
          const isSelected = selected && isSameDay(day, selected);
          const isCurrentDay = isToday(day);
          const isDisabled = minDate && day < new Date(minDate.setHours(0, 0, 0, 0));

          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelect && onSelect(day)}
              className={cn(
                "h-8 w-8 mx-auto flex items-center justify-center rounded-full text-xs font-medium transition-colors cursor-pointer",
                isSelected
                  ? "bg-[#0B3B3C] text-white font-bold"
                  : isCurrentDay
                  ? "border border-[#FF9900] text-[#0B3B3C] font-semibold"
                  : "text-gray-700 hover:bg-gray-100",
                isDisabled && "text-gray-300 opacity-40 cursor-not-allowed hover:bg-transparent"
              )}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
