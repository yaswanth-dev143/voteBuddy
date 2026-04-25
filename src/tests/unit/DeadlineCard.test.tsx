import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, test, expect } from "@jest/globals";
import { DeadlineCard } from "@/components/features/DeadlineCard";

describe("DeadlineCard Component", () => {
  const mockProps = {
    title: "Election Day",
    date: "2026-11-03",
    description: "Go vote at your polling place.",
    isUrgent: true,
  };

  test("renders title and description", () => {
    render(<DeadlineCard {...mockProps} />);
    expect(screen.getByText("Election Day")).toBeInTheDocument();
    expect(screen.getByText(/Go vote at your polling place/i)).toBeInTheDocument();
  });

  test("formats the date correctly", () => {
    render(<DeadlineCard {...mockProps} />);
    // Depends on locale, but should contain at least November and 3
    expect(screen.getByText(/November/i)).toBeInTheDocument();
    expect(screen.getByText(/3/i)).toBeInTheDocument();
  });

  test("applies urgent styling when isUrgent is true", () => {
    const { container } = render(<DeadlineCard {...mockProps} />);
    // Check for the red background class I added in my previous cleanup
    expect(container.firstChild).toHaveClass("bg-red-50");
  });
});
