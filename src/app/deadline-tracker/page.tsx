import type { Metadata } from 'next';
import { DeadlineCard } from '@/components/features/DeadlineCard';

export const metadata: Metadata = {
  title: 'Election Deadlines',
  description: 'Track registration and mail-in ballot deadlines for your state.',
};

export default function DeadlineTrackerPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          ⏰ Election Deadline Tracker
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Never miss a critical deadline. Track voter registration, mail-in ballot requests, and more.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <DeadlineCard
          title="Voter Registration"
          date={new Date("2024-10-07")}
          description="Last day to register to vote online or by mail."
          isUrgent={true}
        />
        <DeadlineCard
          title="Mail-in Ballot Request"
          date={new Date("2024-10-25")}
          description="Last day to request a mail-in ballot."
        />
        <DeadlineCard
          title="Early Voting Begins"
          date={new Date("2024-10-21")}
          description="In-person early voting starts at select locations."
        />
        <DeadlineCard
          title="Election Day"
          date={new Date("2024-11-05")}
          description="Polls open from 7:00 AM to 8:00 PM."
          isUrgent={true}
        />
      </div>
    </div>
  );
}
