import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, test, expect } from "@jest/globals";
import { BallotChecklist, BallotItem } from "@/components/features/BallotChecklist";

describe("BallotChecklist Component", () => {
  const mockItems: BallotItem[] = [
    { id: "1", title: "Proposition 1", description: "Tax increase for schools" },
    { id: "2", title: "Proposition 2", description: "Environmental regulation" },
  ];

  test("renders all items", () => {
    render(<BallotChecklist items={mockItems} />);
    expect(screen.getByText("Proposition 1")).toBeInTheDocument();
    expect(screen.getByText("Proposition 2")).toBeInTheDocument();
  });

  test("updates progress when items are checked", () => {
    render(<BallotChecklist items={mockItems} />);
    
    // Initially 0 of 2
    expect(screen.getByText(/0 \/ 2/i)).toBeInTheDocument();
    
    // Click the first item
    fireEvent.click(screen.getByText("Proposition 1"));
    
    // Now 1 of 2
    expect(screen.getByText(/1 \/ 2/i)).toBeInTheDocument();
  });

  test("toggles description visibility when checked", () => {
    render(<BallotChecklist items={mockItems} />);
    
    // Initially description is visible
    expect(screen.getByText("Tax increase for schools")).toBeInTheDocument();
    
    // Click the item to check it
    fireEvent.click(screen.getByText("Proposition 1"));
    
    // Description should be hidden when checked (according to my recent UI changes)
    expect(screen.queryByText("Tax increase for schools")).not.toBeInTheDocument();
  });
});
