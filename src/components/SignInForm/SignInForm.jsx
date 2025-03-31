import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import css from "./SignInForm.module.css";
import clsx from "clsx";

const LoginValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name is too short!")
    .max(30, "Name is too long!")
    .required("Name is required!"),
  password: Yup.string()
    .min(8, "Must be at least 8 characters!")
    .max(20, "Must be less than 20 characters!")
    .required("Password is required!"),
});

const SignInForm = () => {
  const [eyeIsOpen, setEyeIsOpen] = useState(false);

  const INITIALS_VALUES = {
    name: "",
    password: "",
  };

  const handleOpenEye = () => {
    setEyeIsOpen(!eyeIsOpen);
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Вхід</h2>
      <Formik
        initialValues={INITIALS_VALUES}
        validationSchema={LoginValidationSchema}
      >
        {({ touched, errors }) => (
          <Form className={css.form}>
            <div className={css.nameContainer}>
              <Field
                type="text"
                name="name"
                id="name"
                placeholder="UserName"
                className={clsx(css.inputForm, {
                  [css.inputFormError]: touched.name && errors.name,
                })}
                autoComplete="off"
              />
              <ErrorMessage
                name="name"
                component="label"
                className={`${css.error} ${css.errorUserName}`}
              />
            </div>

            <div className={css.passwordContainer}>
              <Field
                type={!eyeIsOpen ? "password" : "text"}
                name="password"
                id="password"
                placeholder="Пароль"
                className={clsx(css.inputForm, {
                  [css.inputFormError]: touched.password && errors.password,
                })}
              />
              {
                <button
                  type="button"
                  className={css.closeEyeBtn}
                  onClick={handleOpenEye}
                >
                  {!eyeIsOpen ? (
                    <svg width="23" height="18" className={css.closeEye}>
                      <use href="/public/sprite.svg#eye-close"></use>
                    </svg>
                  ) : (
                    <svg width="23" height="18" className={css.openEye}>
                      <use href="/public/sprite.svg#eye"></use>
                    </svg>
                  )}
                </button>
              }
              <ErrorMessage
                name="password"
                component="label"
                className={`${css.error} ${css.errorPassword}`}
              />
            </div>
            <button type="submit" className={css.submitBtn}>
              Увійти
            </button>
            <p className={css.dscr}>
              Немає облікового запису?{" "}
              <span className={css.dscrLink}>Зареєструватися</span>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;
