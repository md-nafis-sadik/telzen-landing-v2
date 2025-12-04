"use client";

import React, { useEffect } from 'react';
import { useLocation } from '@/hook/useLocation';

const LocationTracker: React.FC = () => {
  const { location, error, loading, requestLocation } = useLocation();

  useEffect(() => {
    // Check if we should automatically request location
    const shouldRequestLocation = () => {
      // Don't request if we already have location data
      if (location) return false;
      
      // Don't request if user already denied in this session
      const hasDeferred = sessionStorage.getItem('telzen_location_deferred');
      if (hasDeferred) return false;
      
      return true;
    };

    // Automatically request location silently after a short delay
    if (shouldRequestLocation()) {
      const timer = setTimeout(() => {
        requestLocation();
      }, 1000); // Wait 1 second after page load
      
      return () => clearTimeout(timer);
    }
  }, [location, requestLocation]);

  // Handle location request errors silently
  useEffect(() => {
    if (error) {
      // Mark that location was denied/failed for this session
      sessionStorage.setItem('telzen_location_deferred', 'true');
      
      // Optional: Log error for debugging (remove in production)
      if (process.env.NODE_ENV === 'development') {
        console.log('Location request failed:', error.message);
      }
    }
  }, [error]);

  // Optional: Log successful location retrieval for debugging
  // useEffect(() => {
  //   if (location && process.env.NODE_ENV === 'development') {
  //     console.log('Location detected:', {
  //       city: location.city,
  //       country: location.country,
  //       coordinates: `${location.latitude}, ${location.longitude}`
  //     });
  //   }
  // }, [location]);

  // Completely invisible - no UI elements
  return null;
};

export default LocationTracker;