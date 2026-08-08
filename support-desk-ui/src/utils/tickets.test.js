import { describe, it, expect } from "vitest";
import sampleTickets from "../data/sampleTickets.js";
import { countByStatus, filterTickets } from "./tickets.js";

describe("ticket utility functions", () => {
  it("filters tickets by search text", () => {
    const result = filterTickets(sampleTickets, "printer", "ALL");

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Printer not responding");
  });

  it("filters tickets by status", () => {
    const result = filterTickets(sampleTickets, "", "OPEN");

    expect(result).toHaveLength(3);
    expect(result.every((ticket) => ticket.status === "OPEN")).toBe(true);
  });

  it("filters tickets by both search text and status", () => {
    const result = filterTickets(sampleTickets, "email", "OPEN");

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("ticket-1");
  });

  it("counts tickets by status", () => {
    expect(countByStatus(sampleTickets, "OPEN")).toBe(3);
    expect(countByStatus(sampleTickets, "RESOLVED")).toBe(1);
    expect(countByStatus(sampleTickets, "CLOSED")).toBe(1);
  });
});
