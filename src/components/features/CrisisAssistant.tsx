"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { AlertOctagon, Phone, FileText, ChevronRight } from "lucide-react";

interface CrisisTopic {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const CRISIS_TOPICS: CrisisTopic[] = [
  {
    id: "not-on-list",
    title: "I'm not on the voter list",
    icon: <FileText className="h-5 w-5" />,
    content: (
      <div className="space-y-3 text-sm">
        <p>If you are told you are not on the voter list, do not leave the polling place immediately. You have rights.</p>
        <ul className="ml-5 list-disc space-y-1">
          <li>Ask the poll worker to check the supplemental list.</li>
          <li>Ensure they spell your name correctly and check variations.</li>
          <li>If you are still not found, request a <strong>Provisional Ballot</strong>. It is your federal right to cast a provisional ballot.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "intimidation",
    title: "Voter Intimidation",
    icon: <AlertOctagon className="h-5 w-5" />,
    content: (
      <div className="space-y-3 text-sm">
        <p>Voter intimidation is illegal. This includes aggressive questioning, false information about requirements, or harassment.</p>
        <div className="rounded-lg bg-red-50 p-3 text-red-900 dark:bg-red-900/30 dark:text-red-200">
          <p className="font-semibold flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Election Protection Hotline
          </p>
          <p className="mt-1 text-lg font-bold">866-OUR-VOTE</p>
          <p className="text-xs mt-1">Report intimidation immediately to this nonpartisan hotline.</p>
        </div>
      </div>
    ),
  },
];

export function CrisisAssistant({ className }: { className?: string }) {
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);

  return (
    <div className={cn("overflow-hidden rounded-xl border border-red-200 bg-white shadow-sm dark:border-red-900/50 dark:bg-slate-900", className)}>
      <div className="bg-red-50 p-4 border-b border-red-100 dark:bg-red-950/20 dark:border-red-900/50">
        <h2 className="flex items-center gap-2 text-lg font-bold text-red-700 dark:text-red-400">
          <AlertOctagon className="h-5 w-5" />
          Election Day Crisis Navigator
        </h2>
        <p className="text-sm text-red-600 mt-1 dark:text-red-300">
          Know your rights and what to do if you encounter issues while voting.
        </p>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {CRISIS_TOPICS.map((topic) => {
          const isActive = activeTopicId === topic.id;
          return (
            <div key={topic.id} className="group">
              <button
                onClick={() => setActiveTopicId(isActive ? null : topic.id)}
                className="flex w-full items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200 font-medium">
                  <div className="text-red-500 dark:text-red-400">{topic.icon}</div>
                  {topic.title}
                </div>
                <ChevronRight
                  className={cn(
                    "h-5 w-5 text-slate-400 transition-transform",
                    isActive && "rotate-90"
                  )}
                />
              </button>
              {isActive && (
                <div className="px-4 pb-4 pt-1 animate-in slide-in-from-top-2 text-slate-600 dark:text-slate-300">
                  <div className="pl-8">{topic.content}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
