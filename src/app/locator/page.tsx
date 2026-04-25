"use client";

import { useEffect } from "react";
import { useLocation } from "@/hooks/useLocation";
import { PollingPlaceMap } from "@/components/features/PollingPlaceMap";
import { MapPin, Navigation, Info } from "lucide-react";

export default function LocatorPage() {
  const { location, error, isLoading, requestLocation } = useLocation();

  useEffect(() => {
    // Automatically request location when the page mounts
    requestLocation();
  }, []);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 flex items-center gap-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          <MapPin className="text-blue-600" />
          Find Your Polling Place
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Locate the nearest official polling stations and drop boxes.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          {isLoading ? (
            <div className="flex h-64 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
              <span className="animate-pulse text-slate-500">Acquiring location...</span>
            </div>
          ) : error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900/50 dark:bg-red-950/20">
              <p className="text-red-700 dark:text-red-400">{error}</p>
              <button
                onClick={requestLocation}
                className="mt-4 rounded-lg bg-red-100 px-4 py-2 font-medium text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
              >
                Try Again
              </button>
            </div>
          ) : (
            <PollingPlaceMap
              userLocation={location}
              pollingPlaces={[
                // Mock nearby locations since real civic API requires addressing
                {
                  id: "1",
                  name: "Central Library Voting Center",
                  address: "100 Main St",
                  location: location
                    ? { lat: location.lat + 0.01, lng: location.lng + 0.01 }
                    : { lat: 39.8283, lng: -98.5795 },
                },
                {
                  id: "2",
                  name: "Westside Community Center",
                  address: "450 West Ave",
                  location: location
                    ? { lat: location.lat - 0.015, lng: location.lng - 0.005 }
                    : { lat: 39.81, lng: -98.59 },
                },
              ]}
              className="h-[500px]"
            />
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900/50 dark:bg-blue-950/20">
            <h3 className="mb-2 font-semibold text-blue-900 dark:text-blue-300 flex items-center gap-2">
              <Navigation className="h-5 w-5" />
              Location Access
            </h3>
            <p className="text-sm text-blue-800 dark:text-blue-400">
              We use your device's location to securely find nearby polling stations. Your location data is never stored on our servers.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-2 font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Info className="h-5 w-5 text-slate-500" />
              What to bring
            </h3>
            <ul className="list-inside list-disc space-y-1 text-sm text-slate-600 dark:text-slate-400">
              <li>Valid Photo ID (if required by your state)</li>
              <li>Sample ballot or notes</li>
              <li>Water and a snack</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
