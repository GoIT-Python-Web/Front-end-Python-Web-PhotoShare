import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Input from "../UI/inputs/Input.jsx";
import Button from "../UI/buttons/Button.jsx";
import css from "./SignUpForm.module.css";
import { RegistrationSchema } from "/src/validation/schemas.js";

const INITIAL_VALUES = {
  name: "",
  userName: "",
  email: "",
  password: "",
};

const SignUpForm = () => {
  return (
    <div className={css.container}>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={RegistrationSchema}
        onSubmit={(values) => {
          console.log("Форма відправлена:", values);
        }}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <Field name="name">
              {({ field, meta }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Імʼя"
                  error={meta.touched && meta.error}
                  errorMessage={meta.touched && meta.error ? meta.error : ""}
                />
              )}
            </Field>

            <Field name="userName">
              {({ field, meta }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="UserName"
                  error={meta.touched && meta.error}
                  errorMessage={meta.touched && meta.error ? meta.error : ""}
                />
              )}
            </Field>

            <Field name="email">
              {({ field, meta }) => (
                <Input
                  {...field}
                  type="email"
                  placeholder="Email"
                  error={meta.touched && meta.error}
                  errorMessage={meta.touched && meta.error ? meta.error : ""}
                />
              )}
            </Field>

            <Field name="password">
              {({ field, meta }) => (
                <Input
                  {...field}
                  type="password"
                  placeholder="Пароль"
                  showPassword
                  error={meta.touched && meta.error}
                  errorMessage={meta.touched && meta.error ? meta.error : ""}
                />
              )}
            </Field>

            <a href="/forgot-password" className={css.forgotPassword}>
              Забули пароль?
            </a>

            <Button
              size="fs"
              variant="primary"
              type="submit"
              disabled={isSubmitting}
            >
              Зареєструватись
            </Button>

            <p className={css.terms}>
              Натискаючи кнопку реєстрації, ви погоджуєтесь з умовами
              використання сервісу.
            </p>

            <p className={css.loginText}>
              Вже є обліковий запис? <a href="/login">Увійти</a>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
