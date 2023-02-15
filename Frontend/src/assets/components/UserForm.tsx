import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as React from "react";

import "./UserForm.scss";

export interface IFormData {
  name: string;
  email: string;
  log: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Please provide your name."),
  email: Yup.string()
    .email("Invalid email address.")
    .required("Please provide your email address."),
  log: Yup.string().required("Please provide the log."),
});

const UserForm: React.FC<{
  onSubmit: (values: IFormData) => Promise<void>;
}> = ({ onSubmit }) => {
  const initialValues: IFormData = { name: "", email: "", log: "" };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => onSubmit(values)}
    >
      <Form>
        <Field name="name" placeholder="Name" />
        <ErrorMessage component="span" data-testid="nameError" name="name" />

        <Field name="email" placeholder="address@domain.com" />
        <ErrorMessage component="span" data-testid="emailError" name="email" />
        <Field as="textarea" name="log" placeholder="Log" />
        <ErrorMessage component="span" data-testid="logError" name="log" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default UserForm;
