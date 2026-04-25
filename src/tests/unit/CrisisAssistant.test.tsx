import { render, screen, fireEvent } from "@testing-library/react";
import { CrisisAssistant } from "@/components/features/CrisisAssistant";

describe("CrisisAssistant Component", () => {
  test("renders the component title", () => {
    render(<CrisisAssistant />);
    expect(screen.getByText(/Crisis Navigator/i)).toBeInTheDocument();
  });

  test("displays topics", () => {
    render(<CrisisAssistant />);
    expect(screen.getByText(/I'm not on the voter list/i)).toBeInTheDocument();
    expect(screen.getByText(/Voter Intimidation/i)).toBeInTheDocument();
  });

  test("toggles content when a topic is clicked", () => {
    render(<CrisisAssistant />);
    
    // Initially content is not visible
    expect(screen.queryAllByText(/Provisional Ballot/i)).toHaveLength(0);
    
    // Click the topic
    const topicButton = screen.getByText(/I'm not on the voter list/i);
    fireEvent.click(topicButton);
    
    // Now content should be visible (there are multiple matches in the text)
    expect(screen.getAllByText(/Provisional Ballot/i).length).toBeGreaterThan(0);
  });
});
