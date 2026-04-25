/**
 * @fileoverview Google Maps Integration Utilities.
 */

import { Loader } from '@googlemaps/js-api-loader';

let mapInstance: google.maps.Map | null = null;
let googleMapsLib: typeof google.maps | null = null;

export async function initializeMap(container: HTMLElement, options?: google.maps.MapOptions) {
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    throw new Error('Google Maps API key is missing');
  }

  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    version: 'weekly',
    libraries: ['places', 'geometry'],
  });

  await (loader as any).importLibrary('maps');
  googleMapsLib = window.google.maps;

  if (!googleMapsLib) {
    throw new Error('Google Maps library failed to load');
  }

  mapInstance = new googleMapsLib.Map(container, {
    center: { lat: 39.8283, lng: -98.5795 }, // Center of US
    zoom: 4,
    disableDefaultUI: true,
    zoomControl: true,
    ...options,
  });

  return { map: mapInstance, google: googleMapsLib };
}

export async function geocodeAddress(address: string): Promise<google.maps.LatLngLiteral | null> {
  if (!googleMapsLib) throw new Error('Maps library not loaded');

  const geocoder = new googleMapsLib.Geocoder();
  
  try {
    const response = await geocoder.geocode({ address });
    if (response.results && response.results.length > 0) {
      const location = response.results[0].geometry.location;
      return { lat: location.lat(), lng: location.lng() };
    }
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}

export async function calculateDistance(
  origin: google.maps.LatLngLiteral | string,
  destination: google.maps.LatLngLiteral | string
) {
  if (!googleMapsLib) throw new Error('Maps library not loaded');

  const service = new googleMapsLib.DistanceMatrixService();
  
  try {
    const response = await service.getDistanceMatrix({
      origins: [origin],
      destinations: [destination],
      travelMode: googleMapsLib.TravelMode.DRIVING,
    });

    if (response.rows[0].elements[0].status === 'OK') {
      return {
        distance: response.rows[0].elements[0].distance.text,
        duration: response.rows[0].elements[0].duration.text,
      };
    }
    return null;
  } catch (error) {
    console.error('Distance matrix error:', error);
    return null;
  }
}

export async function findNearbyPollingPlaces(location: google.maps.LatLngLiteral) {
  if (!googleMapsLib || !mapInstance) throw new Error('Maps library not loaded');

  const service = new googleMapsLib.places.PlacesService(mapInstance);
  
  return new Promise((resolve, reject) => {
    service.nearbySearch(
      {
        location,
        radius: 5000,
        keyword: 'polling place OR voting center OR community center',
      },
      (results, status) => {
        if (status === googleMapsLib!.places.PlacesServiceStatus.OK && results) {
          resolve(results);
        } else {
          resolve([]);
        }
      }
    );
  });
}

export function addPollingPlaceMarkers(
  map: google.maps.Map,
  locations: Array<{ lat: number; lng: number; title: string }>
) {
  if (!googleMapsLib) return;

  return locations.map((loc) => {
    return new googleMapsLib!.Marker({
      position: { lat: loc.lat, lng: loc.lng },
      map,
      title: loc.title,
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      },
    });
  });
}
