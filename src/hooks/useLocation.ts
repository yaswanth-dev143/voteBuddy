"use client";

import { useState, useEffect } from "react";
import type { UserLocation } from "@/types/user";

interface UseLocationReturn {
  location: UserLocation | null;
  error: string | null;
  isLoading: boolean;
  requestLocation: () => void;
}

export function useLocation(): UseLocationReturn {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setError(null);
        setIsLoading(false);
      },
      (err) => {
        setError(err.message);
        setIsLoading(false);
      }
    );
  };

  useEffect(() => {
    // Attempt to get location on mount if permitted, or just finish loading
    setIsLoading(false);
  }, []);

  return { location, error, isLoading, requestLocation };
}
