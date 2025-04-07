import { Field, Form, Formik } from "formik";
import css from "./SignInForm.module.css";
import { loginValidationSchema } from "../../../validation/authSchemas.js";

import Input from "../../common/inputs/Input.jsx";
import Button from "../../common/buttons/Button.jsx";

const SignInForm = () => {
  const INITIALS_VALUES = {
    name: "",
    password: "",
  };

  return (
    <div className={css.container}>
      <Formik
        initialValues={INITIALS_VALUES}
        validationSchema={loginValidationSchema}
        onSubmit={(values) => {
          console.log("Login as:", values);
        }}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <Field name="name">
              {({ field, meta }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="UserName"
                  autoComplete="off"
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
              disabled={isSubmitting}
              style={{ marginBottom: "24px", marginTop: "16px" }}
            >
              Увійти
            </Button>
            <div className={css.bottomTxt}>
              <p className={css.dscr}>Немає облікового запису?</p>
              <a href="/register" className={css.dscrLink}>
                Зареєструватися
              </a>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default SignInForm;
