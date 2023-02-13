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

const UserForm: React.FC<{}> = () => {
  const initialValues: IFormData = { name: "", email: "", log: "" };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form>
        <Field name="name" placeholder="Name" />
        <ErrorMessage name="name" />
        <Field name="email" placeholder="address@domain.com" />
        <ErrorMessage name="email" />
        <Field as="textarea" name="log" placeholder="Log" />
        <ErrorMessage name="log" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default UserForm;
