import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as React from "react";

import { RelevantLinesHandler } from "../../App";

import "./UserForm.scss";

const URL = "http://localhost:8080/api/logs";

export interface IFormData {
  name: string;
  email: string;
  log: string;
}

export type LogResponse = { relevantLines: string[] };

export type SubmitFn = (
  url: string,
  data: IFormData
) => Promise<LogResponse | undefined>;

const submitLog: SubmitFn = async (url: string, data: IFormData) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json() as Promise<LogResponse>;
  } catch (err) {
    console.log(err);
  }
};

const validationSchema = Yup.object({
  name: Yup.string().required("Please provide your name."),
  email: Yup.string()
    .email("Invalid email address.")
    .required("Please provide your email address."),
  log: Yup.string().required("Please provide the log."),
});

const UserForm: React.FC<{ onSubmit: RelevantLinesHandler }> = ({
  onSubmit,
}) => {
  const initialValues: IFormData = { name: "", email: "", log: "" };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          console.log(values);
          const response = await submitLog(URL, values);

          return onSubmit(response?.relevantLines);
        } catch (err) {
          console.log(err);
        }
      }}
    >
      <Form>
        <label>Name*</label>
        <Field name="name" placeholder="Name" />
        <ErrorMessage name="name" />
        <label>Email address*</label>
        <Field name="email" placeholder="address@domain.com" />
        <ErrorMessage name="email" />
        <label>Log*</label>
        <Field as="textarea" name="log" placeholder="Log" />
        <ErrorMessage name="log" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default UserForm;
