import { generateGoogleCalendarUrl, generateIcsContent } from "@/lib/calendar-api";
import { Deadline } from "@/types/election";

describe("Calendar API", () => {
  const mockDeadline: Deadline = {
    id: "test-id",
    name: "Registration Deadline",
    date: "2026-11-03T00:00:00Z",
    type: "registration",
    daysRemaining: 10,
    urgent: true,
  };

  test("generateGoogleCalendarUrl creates a valid URL", () => {
    const url = generateGoogleCalendarUrl(mockDeadline);
    expect(url).toContain("https://calendar.google.com/calendar/render");
    expect(url).toContain("action=TEMPLATE");
    expect(url).toContain("Registration+Deadline");
    // Dates should be in YYYYMMDD/YYYYMMDD+1 format for all-day events (encoded)
    expect(url).toContain("dates=20261103%2F20261104");
  });

  test("generateIcsContent creates valid ICS content", () => {
    const content = generateIcsContent(mockDeadline);
    expect(content).toContain("BEGIN:VCALENDAR");
    expect(content).toContain("SUMMARY:Registration Deadline");
    expect(content).toContain("DTSTART:20261103T000000Z");
    expect(content).toContain("END:VEVENT");
  });
});
