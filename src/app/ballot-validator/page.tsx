import { BallotChecklist } from "@/components/features/BallotChecklist";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Ballot Validator | VoterJourney",
  description: "Ensure your ballot is filled out correctly before submission.",
};

const DUMMY_BALLOT_ITEMS = [
  {
    id: "sign-envelope",
    title: "Sign the return envelope",
    subtitle: "Your signature must match your voter registration record.",
    description: "Failure to sign the outer envelope is the #1 reason mail ballots are rejected.",
  },
  {
    id: "date-envelope",
    title: "Date the return envelope",
    subtitle: "Use today's date.",
  },
  {
    id: "secrecy-sleeve",
    title: "Use the secrecy sleeve",
    subtitle: "Place your ballot inside the inner privacy sleeve if provided.",
    description: "Some states require 'naked ballots' (without the sleeve) to be discarded.",
  },
  {
    id: "black-ink",
    title: "Use black or blue ink",
    subtitle: "Do not use red ink, pencil, or markers.",
  },
];

export default function BallotValidatorPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
          <CheckCircle2 size={32} />
        </div>
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Ballot Validator
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Make sure your vote counts. Follow this checklist to avoid common mistakes that lead to rejected ballots.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
        <BallotChecklist items={DUMMY_BALLOT_ITEMS} />
      </div>

      <div className="mt-8 rounded-xl bg-blue-50 p-6 dark:bg-blue-950/30">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300">
          Ready to submit?
        </h3>
        <p className="mt-2 text-sm text-blue-800 dark:text-blue-400">
          Once you have verified all items above, your ballot is ready to be mailed or dropped off. 
          Use our polling place locator to find your nearest official drop box.
        </p>
      </div>
    </div>
  );
}
