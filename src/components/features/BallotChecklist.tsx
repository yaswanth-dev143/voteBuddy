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
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="card-clean bg-slate-50">
        <div className="flex items-center justify-between mb-2 text-sm font-bold text-slate-500 uppercase tracking-tight">
          <span>Your Progress</span>
          <span className="text-blue-600">
            {checkedItems.size} / {items.length} completed
          </span>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full bg-blue-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => {
          const isChecked = checkedItems.has(item.id);
          return (
            <div
              key={item.id}
              className={cn(
                "card-clean transition-colors cursor-pointer",
                isChecked ? "bg-slate-50 border-slate-200" : "hover:border-blue-400"
              )}
              onClick={() => toggleItem(item.id)}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                    isChecked
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-300"
                  )}
                >
                  {isChecked && <Check size={14} strokeWidth={3} />}
                </div>
                
                <div className="flex-1">
                  <h4
                    className={cn(
                      "font-bold transition-colors",
                      isChecked
                        ? "text-slate-400 line-through"
                        : "text-slate-900"
                    )}
                  >
                    {item.title}
                  </h4>
                  {item.subtitle && (
                    <p className="text-sm text-slate-500">
                      {item.subtitle}
                    </p>
                  )}
                  {item.description && !isChecked && (
                    <div className="mt-3 flex items-start gap-2 rounded-lg bg-blue-50 p-3 text-sm text-slate-600 border border-blue-100">
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
