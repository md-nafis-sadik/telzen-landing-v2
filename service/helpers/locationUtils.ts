import { getStoredLocationData } from '@/hook/useLocation';

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
  city?: string;
  country?: string;
  region?: string;
  timezone?: string;
}

/**
 * Location utility functions for accessing user location data
 */
export class LocationUtils {
  /**
   * Get the current stored location data
   */
  static getLocation(): LocationData | null {
    return getStoredLocationData();
  }

  /**
   * Check if location data is available
   */
  static hasLocation(): boolean {
    return getStoredLocationData() !== null;
  }

  /**
   * Get user's country code (if available)
   */
  static getCountry(): string | null {
    const location = getStoredLocationData();
    return location?.country || null;
  }

  /**
   * Get user's city (if available)
   */
  static getCity(): string | null {
    const location = getStoredLocationData();
    return location?.city || null;
  }

  /**
   * Get user's timezone (if available)
   */
  static getTimezone(): string | null {
    const location = getStoredLocationData();
    return location?.timezone || null;
  }

  /**
   * Get coordinates as an object
   */
  static getCoordinates(): { lat: number; lng: number } | null {
    const location = getStoredLocationData();
    if (!location) return null;
    
    return {
      lat: location.latitude,
      lng: location.longitude,
    };
  }

  /**
   * Calculate distance between user's location and a target location (in kilometers)
   */
  static calculateDistance(targetLat: number, targetLng: number): number | null {
    const userLocation = getStoredLocationData();
    if (!userLocation) return null;

    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(targetLat - userLocation.latitude);
    const dLng = this.toRadians(targetLng - userLocation.longitude);
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(userLocation.latitude)) * 
      Math.cos(this.toRadians(targetLat)) * 
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return Math.round(distance * 100) / 100; // Round to 2 decimal places
  }

  /**
   * Check if user is within a certain radius of a target location (in kilometers)
   */
  static isWithinRadius(targetLat: number, targetLng: number, radiusKm: number): boolean {
    const distance = this.calculateDistance(targetLat, targetLng);
    return distance !== null && distance <= radiusKm;
  }

  /**
   * Format location for display
   */
  static formatLocationString(): string | null {
    const location = getStoredLocationData();
    if (!location) return null;

    const parts: string[] = [];
    
    if (location.city) parts.push(location.city);
    if (location.region && location.region !== location.city) parts.push(location.region);
    if (location.country) parts.push(location.country);
    
    return parts.length > 0 ? parts.join(', ') : 
      `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`;
  }

  /**
   * Get location age in milliseconds
   */
  static getLocationAge(): number | null {
    const location = getStoredLocationData();
    if (!location) return null;
    
    return Date.now() - location.timestamp;
  }

  /**
   * Check if location data is fresh (less than specified minutes old)
   */
  static isLocationFresh(maxAgeMinutes: number = 60): boolean {
    const age = this.getLocationAge();
    if (age === null) return false;
    
    return age < (maxAgeMinutes * 60 * 1000);
  }

  /**
   * Clear stored location data
   */
  static clearLocation(): void {
    localStorage.removeItem('telzen_user_location');
  }

  /**
   * Convert degrees to radians (helper function)
   */
  private static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}

/**
 * Hook-like function for use in React components
 * Returns location data and utility functions
 */
export const useLocationUtils = () => {
  return {
    location: LocationUtils.getLocation(),
    hasLocation: LocationUtils.hasLocation(),
    getCountry: LocationUtils.getCountry,
    getCity: LocationUtils.getCity,
    getTimezone: LocationUtils.getTimezone,
    getCoordinates: LocationUtils.getCoordinates,
    calculateDistance: LocationUtils.calculateDistance,
    isWithinRadius: LocationUtils.isWithinRadius,
    formatLocationString: LocationUtils.formatLocationString,
    getLocationAge: LocationUtils.getLocationAge,
    isLocationFresh: LocationUtils.isLocationFresh,
    clearLocation: LocationUtils.clearLocation,
  };
};