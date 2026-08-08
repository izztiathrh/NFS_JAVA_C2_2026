import { describe, it, expect } from "vitest";

const sampleTickets = [
  {
    id: "T001",
    title: "Cannot access email",
    category: "Email",
    status: "OPEN",
    priority: "HIGH",
  },
  {
    id: "T002",
    title: "Laptop running slowly",
    category: "Hardware",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
  },
  {
    id: "T003",
    title: "Password reset request",
    category: "Account",
    status: "CLOSED",
    priority: "LOW",
  },
];

describe("sample ticket fixture", () => {
  it("provides three sample tickets", () => {
    expect(sampleTickets).toHaveLength(3);
  });
});
