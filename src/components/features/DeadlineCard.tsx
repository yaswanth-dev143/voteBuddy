"use client";

import { cn } from "@/lib/utils";
import { CalendarDays, AlertCircle } from "lucide-react";

interface DeadlineCardProps {
  title: string;
  date: Date | string;
  description?: string;
  isUrgent?: boolean;
  className?: string;
}

export function DeadlineCard({
  title,
  date,
  description,
  isUrgent = false,
  className,
}: DeadlineCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className={cn(
        "rounded-xl border p-5 shadow-sm transition-all hover:shadow-md",
        isUrgent
          ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/20"
          : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full",
              isUrgent
                ? "bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400"
                : "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
            )}
          >
            {isUrgent ? <AlertCircle size={20} /> : <CalendarDays size={20} />}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">
              {title}
            </h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {formattedDate}
            </p>
          </div>
        </div>
      </div>
      {description && (
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
}
