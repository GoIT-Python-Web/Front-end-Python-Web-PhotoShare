import { Formik, Form } from "formik";
import LabeledField from "../../common/labeledField/LabeledField.jsx";
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
            <LabeledField
              name="name"
              label="Імʼя"
              type="text"
              placeholder="Введіть Ім’я"
            />

            <LabeledField
              name="username"
              label="UserName"
              type="text"
              placeholder="Введіть UserName"
            />

            <LabeledField
              name="email"
              label="Електронна пошта"
              type="email"
              placeholder="Введіть Пошту"
            />

            <LabeledField
              name="password"
              label="Пароль"
              type="password"
              placeholder="Введіть Пароль"
            />

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
