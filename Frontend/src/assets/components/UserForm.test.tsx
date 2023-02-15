import UserForm from "./UserForm";
import {
  getByPlaceholderText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
// @vitest-environment jsdom

describe("#Form", () => {
  const onSubmit = vi.fn();

  beforeEach(() => {
    onSubmit.mockClear();
    render(<UserForm onSubmit={onSubmit} />);
  });

  it("onSubmit is called when all fields pass validation", async () => {
    screen.debug();

    userEvent.type(getName(), "Johnny Test");
    userEvent.type(getEmail(), "johnny.test@domain.com");
    userEvent.type(
      getLog(),
      "I 233 this is the life of a boy named Johnny Test"
    );

    userEvent.click(getSubmitBtn());

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    expect(onSubmit).toHaveBeenCalledWith({ lazy: true });
  });
});

const getName = () => {
  return screen.getByPlaceholderText("Name");
};

const getEmail = () => {
  return screen.getByPlaceholderText("address@domain.com");
};

const getLog = () => {
  return screen.getByPlaceholderText("Log");
};

const getSubmitBtn = () => {
  return screen.getByRole("button", { name: /submit/i });
};
