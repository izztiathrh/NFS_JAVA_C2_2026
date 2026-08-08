import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import TicketFormWizard from "./TicketFormWizard";
import { useAuth } from "../contexts/AuthContext";
import { createTicket } from "../api/tickets";

vi.mock("../contexts/AuthContext", () => ({
  useAuth: vi.fn(),
}));

vi.mock("../api/tickets", () => ({
  createTicket: vi.fn(),
  updateTicket: vi.fn(),
}));

describe("TicketFormWizard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuth.mockReturnValue({ token: "fake-token" });
  });

  it("shows inline errors when required fields are empty", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <TicketFormWizard />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: /create ticket/i }));

    expect(screen.getByText("Title is required")).toBeInTheDocument();
    expect(screen.getByText("Description is required")).toBeInTheDocument();
    expect(screen.getByText("Category is required")).toBeInTheDocument();
  });

  it("calls submit handler with a clean payload when the form is valid", async () => {
    const user = userEvent.setup();
    createTicket.mockResolvedValue({ id: "T-100" });

    render(
      <MemoryRouter>
        <TicketFormWizard />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(/title/i), "Printer issue");
    await user.type(
      screen.getByLabelText(/description/i),
      "The printer is offline",
    );
    await user.type(screen.getByLabelText(/category/i), "Hardware");
    await user.selectOptions(screen.getByLabelText(/priority/i), "HIGH");
    await user.selectOptions(screen.getByLabelText(/status/i), "OPEN");
    await user.click(screen.getByRole("button", { name: /create ticket/i }));

    await waitFor(() => {
      expect(createTicket).toHaveBeenCalledWith({
        title: "Printer issue",
        description: "The printer is offline",
        category: "Hardware",
        priority: "HIGH",
        status: "OPEN",
      });
    });
  });

  it("shows a saving state while submitting", async () => {
    const user = userEvent.setup();
    createTicket.mockImplementation(() => new Promise(() => {}));

    render(
      <MemoryRouter>
        <TicketFormWizard />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(/title/i), "Printer issue");
    await user.type(
      screen.getByLabelText(/description/i),
      "The printer is offline",
    );
    await user.type(screen.getByLabelText(/category/i), "Hardware");
    await user.selectOptions(screen.getByLabelText(/priority/i), "HIGH");
    await user.selectOptions(screen.getByLabelText(/status/i), "OPEN");
    await user.click(screen.getByRole("button", { name: /create ticket/i }));

    expect(
      await screen.findByRole("button", { name: /saving/i }),
    ).toBeInTheDocument();
  });
});
