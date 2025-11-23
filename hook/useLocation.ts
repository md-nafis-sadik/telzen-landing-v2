"use client";

import { useState, useEffect } from 'react';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
  city?: string;
  country?: string;
  countryCode?: string;
  region?: string;
  timezone?: string;
}

interface LocationError {
  code: number;
  message: string;
}

interface UseLocationReturn {
  location: LocationData | null;
  error: LocationError | null;
  loading: boolean;
  requestLocation: () => void;
  clearLocation: () => void;
}

const LOCATION_STORAGE_KEY = 'telzen_user_location';
const LOCATION_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const useLocation = (): UseLocationReturn => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<LocationError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Load cached location from localStorage on mount
  useEffect(() => {
    const cachedLocation = getStoredLocation();
    if (cachedLocation) {
      setLocation(cachedLocation);
    }
  }, []);

  const getStoredLocation = (): LocationData | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      const stored = localStorage.getItem(LOCATION_STORAGE_KEY);
      if (stored) {
        const locationData: LocationData = JSON.parse(stored);
        
        // Check if cached location is still valid (not expired)
        const now = Date.now();
        if (now - locationData.timestamp < LOCATION_CACHE_DURATION) {
          return locationData;
        } else {
          // Remove expired location
          localStorage.removeItem(LOCATION_STORAGE_KEY);
        }
      }
    } catch (err) {
      console.error('Error reading location from localStorage:', err);
      localStorage.removeItem(LOCATION_STORAGE_KEY);
    }
    return null;
  };

  const saveLocationToStorage = (locationData: LocationData): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(locationData));
    } catch (err) {
      console.error('Error saving location to localStorage:', err);
    }
  };

  const getLocationDetails = async (lat: number, lon: number): Promise<Partial<LocationData>> => {
    try {
      // Using a free geocoding service (you can replace with your preferred service)
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      );
      
      if (response.ok) {
        const data = await response.json();
        const locationDetails = {
          city: data.city || data.locality,
          country: data.countryName,
          countryCode: data.countryCode,
          region: data.principalSubdivision,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
        
        // Also save country code separately for easy access
        if (data.countryCode) {
          localStorage.setItem('telzen_country_code', data.countryCode);
        }
        
        return locationDetails;
      }
    } catch (err) {
      console.warn('Could not fetch location details:', err);
    }
    
    return {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  };

  const requestLocation = (): void => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setError({
        code: 0,
        message: 'Geolocation is not supported by this browser.'
      });
      return;
    }

    setLoading(true);
    setError(null);

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000, // 10 seconds
      maximumAge: 5 * 60 * 1000, // 5 minutes
    };

    navigator.geolocation.getCurrentPosition(
      async (position: GeolocationPosition) => {
        try {
          const { latitude, longitude, accuracy } = position.coords;
          
          // Get additional location details
          const locationDetails = await getLocationDetails(latitude, longitude);
          
          const locationData: LocationData = {
            latitude,
            longitude,
            accuracy,
            timestamp: Date.now(),
            ...locationDetails,
          };

          setLocation(locationData);
          saveLocationToStorage(locationData);
          setError(null);
        } catch (err) {
          console.error('Error processing location:', err);
          setError({
            code: 0,
            message: 'Error processing location data.'
          });
        } finally {
          setLoading(false);
        }
      },
      (err: GeolocationPositionError) => {
        setLoading(false);
        
        let message = 'Unable to retrieve location.';
        switch (err.code) {
          case err.PERMISSION_DENIED:
            message = 'Location access denied by user.';
            break;
          case err.POSITION_UNAVAILABLE:
            message = 'Location information is unavailable.';
            break;
          case err.TIMEOUT:
            message = 'Location request timed out.';
            break;
        }
        
        setError({
          code: err.code,
          message,
        });
      },
      options
    );
  };

  const clearLocation = (): void => {
    setLocation(null);
    setError(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(LOCATION_STORAGE_KEY);
      localStorage.removeItem('telzen_country_code');
    }
  };

  return {
    location,
    error,
    loading,
    requestLocation,
    clearLocation,
  };
};

// Utility function to get location from localStorage without the hook
export const getStoredLocationData = (): LocationData | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(LOCATION_STORAGE_KEY);
    if (stored) {
      const locationData: LocationData = JSON.parse(stored);
      
      // Check if cached location is still valid
      const now = Date.now();
      if (now - locationData.timestamp < LOCATION_CACHE_DURATION) {
        return locationData;
      } else {
        localStorage.removeItem(LOCATION_STORAGE_KEY);
        localStorage.removeItem('telzen_country_code');
      }
    }
  } catch (err) {
    console.error('Error reading location from localStorage:', err);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(LOCATION_STORAGE_KEY);
      localStorage.removeItem('telzen_country_code');
    }
  }
  return null;
};

// Utility function to get country code from various sources
export const getCountryCode = (): string => {
  if (typeof window === 'undefined') return 'BD'; // Default fallback
  
  // First, try to get from stored location
  const storedCountryCode = localStorage.getItem('telzen_country_code');
  if (storedCountryCode) {
    return storedCountryCode;
  }
  
  // If no stored country code, return default
  return 'BD'; // Default to Bangladesh
};