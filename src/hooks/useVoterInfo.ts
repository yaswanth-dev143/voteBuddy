import useSWR from 'swr';
import { VoterInfo } from '@/types/election';

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) {throw new Error('Failed to fetch data');}
  return res.json();
});

export function useVoterInfo(address: string) {
  const { data, error, isLoading } = useSWR<{ voterInfo: VoterInfo; error?: any }>(
    address ? `/api/voter-info?address=${encodeURIComponent(address)}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    voterInfo: data?.voterInfo,
    isLoading,
    error: error || data?.error,
  };
}
