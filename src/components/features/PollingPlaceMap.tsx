"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2, MapPin } from "lucide-react";
import { initializeMap } from "@/lib/google-maps";

interface Location {
  lat: number;
  lng: number;
}

interface PollingPlace {
  id: string;
  name: string;
  address: string;
  location: Location;
  pollingHours?: string;
}

interface PollingPlaceMapProps {
  userLocation: Location | null;
  pollingPlaces: PollingPlace[];
  className?: string;
}

export function PollingPlaceMap({
  userLocation,
  pollingPlaces,
  className,
}: PollingPlaceMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMap() {
      try {
        setIsLoading(true);
        if (mapRef.current && !map) {
          const center = userLocation || { lat: 39.8283, lng: -98.5795 };
          const zoom = userLocation ? 14 : 4;
          
          const { map: newMap } = await initializeMap(mapRef.current, {
            center,
            zoom,
            mapId: "VOTER_JOURNEY_MAP",
          });
          
          setMap(newMap);
        }
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load Google Maps");
        setIsLoading(false);
      }
    }

    loadMap();
  }, [mapRef, map, userLocation]);

  useEffect(() => {
    if (!map || !window.google) {return;}

    // Clear existing markers logic would go here if managing dynamic markers

    const bounds = new google.maps.LatLngBounds();

    if (userLocation) {
      new google.maps.Marker({
        position: userLocation,
        map,
        title: "Your Location",
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#4285F4",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
        },
      });
      bounds.extend(userLocation);
    }

    pollingPlaces.forEach((place) => {
      new google.maps.Marker({
        position: place.location,
        map,
        title: place.name,
      });
      bounds.extend(place.location);
    });

    if (pollingPlaces.length > 0 || userLocation) {
      map.fitBounds(bounds);
      // Don't zoom in too much if there's only one point
      if (map.getZoom() && map.getZoom()! > 15) {
        map.setZoom(15);
      }
    }
  }, [map, pollingPlaces, userLocation]);

  if (error) {
    return (
      <div className={cn("flex h-64 flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600 dark:border-red-900/50 dark:bg-red-950/20", className)}>
        <MapPin className="mb-2 h-8 w-8 opacity-50" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-xl border border-slate-200 shadow-sm dark:border-slate-800", className)}>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-50/80 backdrop-blur-sm dark:bg-slate-900/80">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      )}
      <div ref={mapRef} className="h-full min-h-[300px] w-full bg-slate-100 dark:bg-slate-800" />
    </div>
  );
}
