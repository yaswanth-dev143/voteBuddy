"use client";

import { useState } from "react";
import { Search, BookOpen, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const DICTIONARY: Record<string, string> = {
  "bond": "A loan that the government takes out to pay for a project. You are voting on whether the government should borrow this money.",
  "millage": "A property tax rate. One mill is $1 of tax for every $1,000 of assessed property value.",
  "amendment": "A change or addition to a constitution or law.",
  "repeal": "To officially revoke or cancel a law.",
  "ordinance": "A local law or rule made by a city or town.",
  "statute": "A written law passed by a legislative body.",
  "referendum": "A direct vote by the public on a particular proposal or law.",
  "initiative": "A process that allows citizens to propose a new statute or constitutional amendment.",
  "revenue": "Money that a government collects, typically from taxes.",
  "appropriation": "Money set aside by formal action for a specific use.",
};

export default function BallotDecoderPage() {
  const [text, setText] = useState("");
  const [foundTerms, setFoundTerms] = useState<Array<{term: string, definition: string}>>([]);

  const analyzeText = () => {
    const terms: Array<{term: string, definition: string}> = [];
    const lowerText = text.toLowerCase();
    
    Object.entries(DICTIONARY).forEach(([term, definition]) => {
      if (lowerText.includes(term)) {
        terms.push({ term, definition });
      }
    });
    
    setFoundTerms(terms);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400">
          <BookOpen size={32} />
        </div>
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Ballot Decoder
        </h1>
        <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Confused by legal jargon on your ballot? Paste the text of any proposition, measure, or amendment below, and we'll translate the complicated legal terms into plain English.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <label htmlFor="ballot-text" className="font-medium text-slate-700 dark:text-slate-300">
            Paste ballot text here:
          </label>
          <textarea
            id="ballot-text"
            className="h-64 w-full resize-none rounded-xl border border-slate-300 bg-white p-4 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-slate-700 dark:bg-slate-900 dark:focus:border-amber-500"
            placeholder="e.g. Shall the city issue general obligation bonds in the principal amount of..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={analyzeText}
            disabled={!text.trim()}
            className="flex items-center justify-center gap-2 rounded-lg bg-amber-500 py-3 font-medium text-white transition-colors hover:bg-amber-600 disabled:opacity-50 dark:bg-amber-600 dark:hover:bg-amber-700"
          >
            <Search size={18} /> Decode Text
          </button>
        </div>

        <div>
          <h2 className="mb-4 font-medium text-slate-700 dark:text-slate-300">
            Translations
          </h2>
          
          {!text.trim() ? (
            <div className="flex h-64 flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 text-center dark:border-slate-800">
              <AlertCircle className="mb-2 h-8 w-8 text-slate-400" />
              <p className="text-slate-500">Paste text and click Decode to see translations here.</p>
            </div>
          ) : foundTerms.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/50">
              <p className="text-slate-600 dark:text-slate-400">
                No complex legal terms found in our dictionary for this text.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {foundTerms.map(({ term, definition }) => (
                <div key={term} className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-900/10">
                  <h3 className="mb-1 font-semibold capitalize text-amber-900 dark:text-amber-400">
                    {term}
                  </h3>
                  <p className="text-sm text-amber-800 dark:text-amber-200/80">
                    {definition}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
