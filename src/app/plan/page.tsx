"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock, Car, CheckCircle2, ChevronRight, Download } from "lucide-react";
import { cn } from "@/lib/utils";

type VotingMethod = "in-person" | "mail";

export default function MakePlanPage() {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState<VotingMethod | null>(null);
  const [time, setTime] = useState("");
  const [transport, setTransport] = useState("");

  const generatePlan = () => {
    // In a real app, this would use the calendar API to generate an ICS file
    alert("Voting plan downloaded!");
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
          <CalendarIcon size={32} />
        </div>
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Make a Voting Plan
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Voters who make a plan are 50% more likely to cast their ballot. Let's make yours.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex border-b border-slate-200 dark:border-slate-800">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={cn(
                "h-1 flex-1 transition-colors",
                step >= i ? "bg-indigo-600" : "bg-slate-100 dark:bg-slate-800"
              )}
            />
          ))}
        </div>

        <div className="p-6 sm:p-8">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4">
              <h2 className="mb-4 text-xl font-semibold">How do you plan to vote?</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  onClick={() => setMethod("in-person")}
                  className={cn(
                    "flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all",
                    method === "in-person"
                      ? "border-indigo-600 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-900/20"
                      : "border-slate-200 hover:border-indigo-300 dark:border-slate-700 dark:hover:border-indigo-700"
                  )}
                >
                  <span className="text-4xl">🗳️</span>
                  <span className="font-medium">In Person</span>
                </button>
                <button
                  onClick={() => setMethod("mail")}
                  className={cn(
                    "flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all",
                    method === "mail"
                      ? "border-indigo-600 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-900/20"
                      : "border-slate-200 hover:border-indigo-300 dark:border-slate-700 dark:hover:border-indigo-700"
                  )}
                >
                  <span className="text-4xl">✉️</span>
                  <span className="font-medium">By Mail</span>
                </button>
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!method}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 font-medium text-white disabled:opacity-50 dark:bg-indigo-500"
              >
                Next <ChevronRight size={18} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4">
              <h2 className="mb-4 text-xl font-semibold">When will you vote?</h2>
              <p className="mb-6 text-sm text-slate-500">
                {method === "in-person" 
                  ? "Lines are usually shortest mid-morning or early afternoon." 
                  : "We recommend dropping off your ballot at least a week before Election Day."}
              </p>
              
              <div className="space-y-4">
                <label className="flex flex-col gap-2">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Time of day</span>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <select 
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-slate-300 bg-white p-3 pl-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
                    >
                      <option value="">Select a time</option>
                      <option value="Morning (Before work)">Morning (Before work)</option>
                      <option value="Lunch break">Lunch break</option>
                      <option value="Afternoon">Afternoon</option>
                      <option value="Evening (After work)">Evening (After work)</option>
                    </select>
                  </div>
                </label>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 rounded-lg border border-slate-300 py-3 font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!time}
                  className="flex flex-[2] items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 font-medium text-white disabled:opacity-50 dark:bg-indigo-500"
                >
                  Next <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4">
              <h2 className="mb-4 text-xl font-semibold">How will you get there?</h2>
              
              <div className="space-y-3">
                {["Drive myself", "Walk / Bike", "Public Transit", "Get a ride from a friend"].map((opt) => (
                  <label key={opt} className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-4 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50">
                    <input 
                      type="radio" 
                      name="transport" 
                      value={opt}
                      checked={transport === opt}
                      onChange={(e) => setTransport(e.target.value)}
                      className="h-4 w-4 text-indigo-600"
                    />
                    <span className="font-medium">{opt}</span>
                  </label>
                ))}
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 rounded-lg border border-slate-300 py-3 font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!transport}
                  className="flex flex-[2] items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 font-medium text-white disabled:opacity-50 dark:bg-indigo-500"
                >
                  Review Plan <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-in fade-in zoom-in-95">
              <div className="mb-6 flex items-center justify-center">
                <div className="rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  <CheckCircle2 size={48} />
                </div>
              </div>
              <h2 className="mb-6 text-center text-2xl font-bold">Your Voting Plan is Ready!</h2>
              
              <div className="mb-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
                <div className="divide-y divide-slate-200 p-4 dark:divide-slate-700">
                  <div className="flex justify-between py-3">
                    <span className="text-slate-500">Method</span>
                    <span className="font-medium capitalize">{method}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-slate-500">Time</span>
                    <span className="font-medium">{time}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-slate-500">Transport</span>
                    <span className="font-medium">{transport}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={generatePlan}
                  className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                >
                  <Download size={18} /> Add to Calendar
                </button>
                <button
                  onClick={() => {
                    setStep(1);
                    setMethod(null);
                    setTime("");
                    setTransport("");
                  }}
                  className="rounded-lg py-3 font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
