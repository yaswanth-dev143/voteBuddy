"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, ClipboardList, MapPin, BookOpen, Vote } from "lucide-react";
import Link from "next/link";

const JOURNEY_STEPS = [
  {
    id: "registered",
    title: "Registered to Vote",
    description: "Check your registration status before the deadline.",
    icon: <ClipboardList className="h-6 w-6" />,
    action: { label: "Check deadlines", href: "/deadline-tracker" },
  },
  {
    id: "location",
    title: "Location Found",
    description: "Know exactly where to go on Election Day.",
    icon: <MapPin className="h-6 w-6" />,
    action: { label: "Find polling place", href: "/locator" },
  },
  {
    id: "ballot",
    title: "Ballot Researched",
    description: "Understand the measures and candidates on your ballot.",
    icon: <BookOpen className="h-6 w-6" />,
    action: { label: "Decode your ballot", href: "/translator" },
  },
  {
    id: "validated",
    title: "Ballot Validated",
    description: "Avoid common mistakes and ensure your vote counts.",
    icon: <ClipboardList className="h-6 w-6" />,
    action: { label: "Check my ballot", href: "/ballot-validator" },
  },
  {
    id: "voted",
    title: "Voted!",
    description: "Cast your ballot and make your voice heard.",
    icon: <Vote className="h-6 w-6" />,
    action: { label: "Make a plan", href: "/plan" },
  },
];

export default function TrackerPage() {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set(["registered"]));

  const toggleStep = (id: string) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedSteps(newCompleted);
  };

  const progress = (completedSteps.size / JOURNEY_STEPS.length) * 100;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Your Voter Journey
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Track your progress towards Election Day.
        </p>
      </div>

      <div className="mb-12 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
        <div className="mb-8 flex items-center justify-between text-sm font-medium">
          <span className="text-slate-600 dark:text-slate-400">Overall Progress</span>
          <span className="text-emerald-600 dark:text-emerald-400">{Math.round(progress)}% Ready</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full bg-emerald-500 transition-all duration-500 ease-in-out dark:bg-emerald-400"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="relative border-l-2 border-slate-200 pl-6 pr-2 dark:border-slate-800 md:pl-8">
        <div className="space-y-12">
          {JOURNEY_STEPS.map((step, index) => {
            const isCompleted = completedSteps.has(step.id);
            const isNext = !isCompleted && (index === 0 || completedSteps.has(JOURNEY_STEPS[index - 1].id));

            return (
              <div key={step.id} className="relative">
                {/* Timeline Dot */}
                <button
                  onClick={() => toggleStep(step.id)}
                  className={cn(
                    "absolute -left-[35px] flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors md:-left-[43px]",
                    isCompleted
                      ? "border-emerald-500 bg-emerald-500 text-white dark:border-emerald-400 dark:bg-emerald-400"
                      : isNext
                      ? "border-emerald-500 bg-white dark:bg-slate-900"
                      : "border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900"
                  )}
                >
                  {isCompleted ? (
                    <Check strokeWidth={3} className="h-4 w-4" />
                  ) : (
                    <div
                      className={cn(
                        "h-2.5 w-2.5 rounded-full transition-colors",
                        isNext ? "bg-emerald-500 dark:bg-emerald-400" : "bg-transparent"
                      )}
                    />
                  )}
                </button>

                {/* Content */}
                <div
                  className={cn(
                    "rounded-xl border p-5 transition-colors",
                    isCompleted
                      ? "border-emerald-100 bg-emerald-50/30 dark:border-emerald-900/30 dark:bg-emerald-900/10"
                      : isNext
                      ? "border-slate-300 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900"
                      : "border-slate-200 bg-white/50 opacity-70 dark:border-slate-800 dark:bg-slate-900/50"
                  )}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          "flex rounded-lg p-3",
                          isCompleted
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400"
                            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                        )}
                      >
                        {step.icon}
                      </div>
                      <div>
                        <h3 className={cn(
                          "font-semibold",
                          isCompleted ? "text-slate-900 dark:text-slate-100" : "text-slate-700 dark:text-slate-300"
                        )}>
                          {step.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    {!isCompleted && isNext && (
                      <Link
                        href={step.action.href}
                        className="inline-flex flex-shrink-0 items-center justify-center rounded-lg bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300 dark:hover:bg-emerald-800/50"
                      >
                        {step.action.label}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
