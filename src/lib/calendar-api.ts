/**
 * @fileoverview Google Calendar Integration Utilities
 */

import { Deadline as ElectionDeadline } from '@/types/election';

/**
 * Generates a URL for adding an event to Google Calendar via the web interface.
 */
export function generateGoogleCalendarUrl(deadline: ElectionDeadline, location: string = '') {
  const baseUrl = 'https://calendar.google.com/calendar/render';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${deadline.name || deadline.type} Deadline - Election`,
    details: `Don't forget the ${deadline.name || deadline.type} deadline for the upcoming election.`,
    location: location,
  });

  // Handle Dates. Google Calendar expects dates in format YYYYMMDDTHHmmssZ
  // For full day events, it expects YYYYMMDD/YYYYMMDD
  try {
    const startDate = new Date(deadline.date);
    // If we only have a date, make it an all-day event
    const formattedDate = startDate.toISOString().split('T')[0].replace(/-/g, '');
    
    // For all day event, end date is the next day
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);
    const formattedEndDate = endDate.toISOString().split('T')[0].replace(/-/g, '');

    params.append('dates', `${formattedDate}/${formattedEndDate}`);
  } catch (e) {
    console.error('Invalid date for calendar generation', e);
    // Fallback or handle error
  }

  return `${baseUrl}?${params.toString()}`;
}

/**
 * Generates an .ics file string for general calendar import (Apple Calendar, Outlook, etc.)
 */
export function generateIcsContent(deadline: ElectionDeadline, location: string = '') {
  const startDate = new Date(deadline.date);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 1);

  const formatIcsDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//VoterJourney//Election Reminders//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${deadline.type} Deadline
DTSTART:${formatIcsDate(startDate)}
DTEND:${formatIcsDate(endDate)}
LOCATION:${location}
DESCRIPTION:Voting deadline reminder.
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT24H
DESCRIPTION:Reminder
ACTION:DISPLAY
END:VALARM
END:VEVENT
END:VCALENDAR`;

  return icsContent;
}

/**
 * Utility to trigger a download of the .ics file in the browser
 */
export function downloadIcsFile(deadline: ElectionDeadline, filename: string = 'election-deadline.ics') {
  const content = generateIcsContent(deadline);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
