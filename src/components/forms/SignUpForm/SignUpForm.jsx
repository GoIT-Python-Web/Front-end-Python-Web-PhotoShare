import { Formik, Form, Field } from "formik";
import Input from "../../common/inputs/Input.jsx";
import Button from "../../common/buttons/Button.jsx";

import css from "./SignUpForm.module.css";
import { registerValidationSchema } from "../../../validation/authSchemas.js";
import { Link } from "react-router-dom";

const INITIAL_VALUES = {
  name: "",
  userName: "",
  email: "",
  password: "",
};

const SignUpForm = ({ onSwitch }) => {
  return (
    <div className={css.container}>
      <h2 className={css.title}>Реєстрація</h2>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={registerValidationSchema}
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
                  error={meta.touched && meta.error}
                  errorMessage={meta.touched && meta.error ? meta.error : ""}
                />
              )}
            </Field>

            <Button
              size="fs"
              variant="primary"
              type="submit"
              onClick={onSwitch}
              disabled={isSubmitting}
            >
              Зареєструватись
            </Button>

            <p className={css.terms}>
              Натискаючи кнопку реєстрації, ви погоджуєтесь з умовами
              використання сервісу.
            </p>

            <p className={css.loginText}>
              Вже є обліковий запис?{" "}
              <Link to="/login" className={css.loginLink}>
                Увійти
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
