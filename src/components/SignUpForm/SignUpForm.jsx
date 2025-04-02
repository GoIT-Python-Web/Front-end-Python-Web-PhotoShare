import { ErrorMessage, Field, Form, Formik } from "formik";
// import { useState } from "react";
// import clsx from "clsx";
import css from "./SignUpForm.module.css";
import { RegistrationSchema } from "../../validation/schemas.js";
import Input from "../UI/inputs/Input.jsx";

const INITIAL_VALUES = { name: "", userName: "", email: "", password: "" };

const SignUpForm = () => {
  return (
    <div className={css.container}>
      <h2 className={css.title}>Реєстрація</h2>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={RegistrationSchema}
      >
        {({ touched, errors, values, handleChange }) => (
          <Form className={css.form}>
            <div className={css.nameContainer}>
              <Input
                type="text"
                name="name"
                placeholder="Імʼя"
                value={values.name}
                onChange={handleChange}
                error={touched.name && errors.name}
                errorMessage={errors.name}
              />
            </div>

            <div className={css.nameContainer}>
              <Input
                type="text"
                name="userName"
                placeholder="UserName"
                value={values.userName}
                onChange={handleChange}
                error={touched.userName && errors.userName}
                errorMessage={errors.userName}
              />
            </div>

            <div className={css.nameContainer}>
              <Input
                type="text"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                error={touched.email && errors.email}
                errorMessage={errors.email}
              />
            </div>

            <div className={css.passwordContainer}>
              <Input
                type="password"
                name="password"
                placeholder="Пароль"
                value={values.password}
                onChange={handleChange}
                error={touched.password && errors.password}
                errorMessage={errors.password}
                showPassword
              />
            </div>

            <a href="">Забули пароль?</a>
            <button type="submit" className={css.submitBtn}>
              Зареєструватись
            </button>
            <p>
              Натискаючи кнопку реєстрації, ви погоджуєтесь з умовами
              використання сервісу.
            </p>

            <div className={css.wrapLoginPrompt}>
              <span className={css.loginPrompt}>
                Вже є обліковий запис?&nbsp;
              </span>
              <a href="/login" className={css.loginLink}>
                Увійти
              </a>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
