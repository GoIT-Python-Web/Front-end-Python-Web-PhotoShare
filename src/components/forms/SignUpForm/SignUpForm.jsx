import { Formik, Form, Field } from "formik";
import Input from "../../common/inputs/Input.jsx";
import Button from "../../common/buttons/Button.jsx";

import css from "./SignUpForm.module.css";
import { registerValidationSchema } from "../../../validation/authSchemas.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../store/auth/operations.js";

const INITIAL_VALUES = {
  name: "",
  username: "",
  email: "",
  password: "",
};

const SignUpForm = ({ onSwitch }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className={css.container}>
      <h2 className={css.title}>Реєстрація</h2>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={registerValidationSchema}
        onSubmit={async (values) => {
          dispatch(registerUser(values));
          navigate("/login");
        }}
      >
        {() => (
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

            <Field name="username">
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
