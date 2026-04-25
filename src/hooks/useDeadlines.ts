import { useState, useEffect } from 'react';
import { Deadline } from '@/types/election';

export function useDeadlines(state: string) {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!state) return;

    setIsLoading(true);
    fetch(`/api/deadlines?state=${state}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch deadlines');
        return res.json();
      })
      .then((data) => {
        // Calculate days remaining dynamically
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        const calculated = data.deadlines.map((d: any) => {
          const target = new Date(d.date);
          target.setHours(0, 0, 0, 0);
          const diffDays = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
          
          return {
            ...d,
            daysRemaining: diffDays,
            urgent: diffDays >= 0 && diffDays <= 7,
          };
        });

        // Sort by urgency (soonest first, then past deadlines at the bottom)
        calculated.sort((a: Deadline, b: Deadline) => {
          if (a.daysRemaining < 0 && b.daysRemaining >= 0) return 1;
          if (b.daysRemaining < 0 && a.daysRemaining >= 0) return -1;
          return a.daysRemaining - b.daysRemaining;
        });

        setDeadlines(calculated);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [state]);

  return { deadlines, isLoading, error };
}
