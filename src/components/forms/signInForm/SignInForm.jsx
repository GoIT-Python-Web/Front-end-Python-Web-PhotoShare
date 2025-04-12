import { Field, Form, Formik } from "formik";
import css from "./SignInForm.module.css";
import { loginValidationSchema } from "../../../validation/authSchemas.js";

import Input from "../../common/inputs/Input.jsx";
import Button from "../../common/buttons/Button.jsx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, loginUser } from "../../../store/auth/operations.js";
import { selectError } from "../../../store/auth/selectors.js";

const INITIALS_VALUES = {
  username: "",
  password: "",
};

const SignInForm = ({ onSwitch }) => {
  const error = useSelector(selectError);

  const dispatch = useDispatch();
  return (
    <div className={css.container}>
      <h2 className={css.title}>Вхід</h2>
      <Formik
        initialValues={INITIALS_VALUES}
        validationSchema={loginValidationSchema}
        onSubmit={(values) => {
          dispatch(loginUser(values));
          dispatch(getUser());
        }}
      >
        {() => (
          <Form className={css.form}>
            <Field name="username">
              {({ field, meta }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Username"
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
            {error?.includes("400") && (
              <p className={css.error}>Юзернейм або пароль невірний</p>
            )}
            <Button
              size="fs"
              variant="primary"
              type="submit"
              onClick={onSwitch}
              style={{ marginBottom: "24px", marginTop: "16px" }}
            >
              Увійти
            </Button>
            <div className={css.bottomTxt}>
              <p className={css.dscr}>Немає облікового запису?</p>
              <Link to="/register" className={css.dscrLink}>
                Зареєструватися
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default SignInForm;
