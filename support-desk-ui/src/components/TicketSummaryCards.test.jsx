import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import SummaryCards from "./TicketSummaryCards.jsx";
import sampleTickets from "../data/sampleTickets.js";

describe("SummaryCards component", () => {
  it("renders summary cards with correct values", () => {
    render(<SummaryCards tickets={sampleTickets} />);

    const summary = screen.getByLabelText("Ticket summary");

    expect(within(summary).getByText("Total Tickets")).toBeInTheDocument();
    expect(within(summary).getByText("Open")).toBeInTheDocument();
    expect(within(summary).getByText("In Progress")).toBeInTheDocument();
    expect(within(summary).getByText("Closed")).toBeInTheDocument();

    expect(within(summary).getByText("6")).toBeInTheDocument();
    expect(within(summary).getByText("3")).toBeInTheDocument();

    const inProgressCard = within(summary)
      .getByText("In Progress")
      .closest("article");
    const closedCard = within(summary).getByText("Closed").closest("article");

    expect(inProgressCard).toHaveTextContent("1");
    expect(closedCard).toHaveTextContent("1");
  });
});
