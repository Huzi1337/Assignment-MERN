import { vi } from "vitest";

const appURL = "http://localhost:5173";
const APIURL = "http://localhost:8000/api/logs";

describe("log submission", () => {
  beforeEach(() => {
    cy.intercept(APIURL, {
      fixture: "example.json",
    });
  });

  it("form submission with required field skipping", () => {
    cy.visit(appURL);

    //focus name
    getName().click();
    //try to skip the Name
    getEmail().click();
    getNameError().should("exist");
    //go back to the name input
    getName().type("Johnny Test");
    getEmailError().contains(/please provide your email address./i);
    //input invalid email
    getEmail().type("Prankmail");
    getEmailError().contains(/Invalid email address./i);
    //input valid email
    getEmail().clear();
    getEmail().type("johnny@test.com");
    getEmailError().should("not.exist");
    //try to submit without the log
    getSubmitBtn().click();
    getLogError().should("exist");
    //input valid log
    getLog().type(
      "I 23 asdasdas {enter}E 52 231 asdasdasdasda {enter}E 56 123 aseasdas {enter}W 52 asdasd"
    );
    //submit valid form
    getSubmitBtn().click();
  });
});

const setFieldValues = async (name: string, email: string, log: string) => {
  getName().type(name);
  getEmail().type(email);
  getLog().type(log);
};

const getName = () => {
  return cy.findByPlaceholderText("Name");
};

const getEmail = () => {
  return cy.findByPlaceholderText("address@domain.com");
};

const getLog = () => {
  return cy.findByPlaceholderText("Log");
};

const getNameError = () => {
  return cy.findByTestId(/nameError/i);
};

const getEmailError = () => {
  return cy.findByTestId(/emailError/i);
};

const getLogError = () => {
  return cy.findByTestId(/logError/i);
};

const getSubmitBtn = () => {
  return cy.findByRole("button", { name: /submit/i });
};
