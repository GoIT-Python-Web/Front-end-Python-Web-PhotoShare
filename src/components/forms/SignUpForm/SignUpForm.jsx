import { Formik, Form } from "formik";
import LabeledField from "../../common/labeledField/LabeledField.jsx";
import Button from "../../common/buttons/Button.jsx";
import css from "./SignUpForm.module.css";
import { registerValidationSchema } from "../../../validation/authSchemas.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../store/auth/operations.js";
import { selectIsLoading } from "../../../store/auth/selectors.js";
import Loader from "../../common/loader/Loader.jsx";
import { toast } from "sonner";

const INITIAL_VALUES = {
  name: "",
  username: "",
  email: "",
  password: "",
};

const SignUpForm = ({ onSwitch }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  return (
    <div className={css.container}>
      <h2 className={css.title}>Реєстрація</h2>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={registerValidationSchema}
        onSubmit={async (values, { setStatus }) => {
          try {
            await dispatch(registerUser(values)).unwrap();

            navigate("/login");
          } catch (error) {
            toast.error(error);
            setStatus("Помилка при реєстрації. Спробуйте пізніше.");
          }
        }}
      >
        {({ status }) => (
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
              {isLoading ? <Loader location="auth" /> : "Зареєструватись"}
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
            {status && <p className={css.error}>{status}</p>}{" "}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
