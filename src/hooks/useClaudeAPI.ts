import { useState } from 'react';
import { DecodedBallotMeasure } from '@/types/election';

export function useBallotDecoder() {
  const [isDecoding, setIsDecoding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const decodeMeasure = async (measureText: string): Promise<DecodedBallotMeasure | null> => {
    setIsDecoding(true);
    setError(null);

    try {
      const res = await fetch('/api/ballot-decoder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ measureText }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to decode ballot measure');
      }

      const data = await res.json();
      return data.decodedMeasure;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsDecoding(false);
    }
  };

  return { decodeMeasure, isDecoding, error };
}
