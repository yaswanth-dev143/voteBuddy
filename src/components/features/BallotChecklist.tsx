"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Info } from "lucide-react";

export interface BallotItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
}

interface BallotChecklistProps {
  items: BallotItem[];
  className?: string;
}

export function BallotChecklist({ items, className }: BallotChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const progress =
    items.length > 0 ? (checkedItems.size / items.length) * 100 : 0;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-center justify-between text-sm font-medium text-slate-600 dark:text-slate-400">
        <span>Progress</span>
        <span>
          {checkedItems.size} of {items.length} completed
        </span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full bg-blue-600 transition-all duration-500 ease-in-out dark:bg-blue-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-2 space-y-3">
        {items.map((item) => {
          const isChecked = checkedItems.has(item.id);
          return (
            <div
              key={item.id}
              className={cn(
                "group relative overflow-hidden rounded-xl border p-4 transition-all hover:border-blue-200 dark:hover:border-blue-900",
                isChecked
                  ? "border-blue-100 bg-blue-50/50 dark:border-blue-900/50 dark:bg-blue-900/10"
                  : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
              )}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleItem(item.id)}
                  className={cn(
                    "mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                    isChecked
                      ? "border-blue-600 bg-blue-600 text-white dark:border-blue-500 dark:bg-blue-500"
                      : "border-slate-300 hover:border-blue-400 dark:border-slate-600 dark:hover:border-blue-500"
                  )}
                >
                  {isChecked && <Check size={14} strokeWidth={3} />}
                </button>
                
                <div className="flex-1">
                  <h4
                    className={cn(
                      "font-semibold transition-colors",
                      isChecked
                        ? "text-slate-500 line-through dark:text-slate-400"
                        : "text-slate-900 dark:text-slate-100"
                    )}
                  >
                    {item.title}
                  </h4>
                  {item.subtitle && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {item.subtitle}
                    </p>
                  )}
                  {item.description && (
                    <div className="mt-2 flex items-start gap-2 rounded-lg bg-slate-50 p-3 text-sm text-slate-600 dark:bg-slate-800/50 dark:text-slate-300">
                      <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500" />
                      <p>{item.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
