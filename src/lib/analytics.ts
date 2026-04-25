/**
 * @fileoverview Google Analytics Privacy-First Utilities
 */

import { sendGAEvent } from '@next/third-parties/google';

/**
 * Custom wrapper for tracking specific events safely.
 * Only tracks if user consent is assumed/given (can be expanded later for strict GDPR compliance).
 */
export function trackFeatureUsage(featureName: string, additionalParams?: Record<string, string | number>) {
  // Check if GA is configured
  if (!process.env.NEXT_PUBLIC_GA_ID) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Analytics Mock] Event: feature_usage | Feature: ${featureName}`, additionalParams);
    }
    return;
  }

  sendGAEvent('event', 'feature_usage', {
    feature: featureName,
    ...additionalParams
  });
}

/**
 * Track specific button clicks or interactions
 */
export function trackInteraction(elementName: string, action: string = 'click') {
    if (!process.env.NEXT_PUBLIC_GA_ID) {return;}
    
    sendGAEvent('event', 'user_interaction', {
        element: elementName,
        action: action
    });
}
