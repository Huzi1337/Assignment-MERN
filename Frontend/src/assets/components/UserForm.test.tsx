import UserForm from "./UserForm";
import { getByPlaceholderText, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
// @vitest-environment jsdom

describe("#Form", () => {
  render(<UserForm />);
  it("display invalid email", () => {
    screen.debug();

    userEvent.type(screen.getByPlaceholderText(/email/i), "Buraktesting");
    expect(screen.getByText(/please provide your name\./i)).not.toBe(null);
  });
});
