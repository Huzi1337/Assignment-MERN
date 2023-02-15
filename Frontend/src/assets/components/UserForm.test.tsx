import UserForm from "./UserForm";
import {
  cleanup,
  getByPlaceholderText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("UserForm receives and submits valid data", () => {
  const onSubmit = vi.fn();

  beforeEach(() => {
    onSubmit.mockClear();
    render(<UserForm onSubmit={onSubmit} />);
  });

  afterEach(() => {
    cleanup();
  });

  it("onSubmit is called when all fields pass validation", async () => {
    await setFieldValues(
      "Johnny Test",
      "johnny.test@domain.com",
      "I 233 this is the life of a boy named Johnny Test"
    );

    clickSubmitBtn();

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    expect(onSubmit).toHaveBeenCalledWith({
      email: "johnny.test@domain.com",
      log: "I 233 this is the life of a boy named Johnny Test",
      name: "Johnny Test",
    });
  });

  it("Form has 3 required fields", async () => {
    clickSubmitBtn();

    await waitFor(() => {
      expect(getNameError()).toBeInTheDocument();
      expect(getEmailError()).toBeInTheDocument();
      expect(getLogError()).toBeInTheDocument();
    });
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it("Form does not submit with an invalid email input", async () => {
    await setFieldValues(
      "Johnny Test",
      "johnnyscamemail",
      "E 51 230 johnny escaped from the lab!"
    );
    clickSubmitBtn();
    expect(getEmailError()).toBeInTheDocument();
  });
});

const setFieldValues = async (name: string, email: string, log: string) => {
  await userEvent.type(getName(), name);
  await userEvent.type(getEmail(), email);
  await userEvent.type(getLog(), log);
};

const getName = () => {
  return screen.getByPlaceholderText("Name");
};

const getEmail = () => {
  return screen.getByPlaceholderText("address@domain.com");
};

const getLog = () => {
  return screen.getByPlaceholderText("Log");
};

const clickSubmitBtn = () => {
  return userEvent.click(screen.getByRole("button", { name: /submit/i }));
};

const getNameError = () => {
  return screen.queryByTestId(/nameError/i);
};

const getEmailError = () => {
  return screen.queryByTestId(/emailError/i);
};

const getLogError = () => {
  return screen.queryByTestId(/logError/i);
};
