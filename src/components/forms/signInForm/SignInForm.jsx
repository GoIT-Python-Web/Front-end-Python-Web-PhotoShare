import { Form, Formik } from "formik";
import css from "./SignInForm.module.css";
import { loginValidationSchema } from "../../../validation/authSchemas.js";

import LabeledField from "../../common/labeledField/LabeledField.jsx";
import Button from "../../common/buttons/Button.jsx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, loginUser } from "../../../store/auth/operations.js";
import { selectIsLoading } from "../../../store/auth/selectors.js";
import Loader from "../../common/loader/Loader.jsx";
import { toast } from "sonner";

const INITIALS_VALUES = {
  username: "",
  password: "",
};

const SignInForm = ({ onSwitch }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  return (
    <div className={css.container}>
      <h2 className={css.title}>Вхід</h2>
      <Formik
        initialValues={INITIALS_VALUES}
        validationSchema={loginValidationSchema}
        onSubmit={async (values, { setStatus }) => {
          try {
            await dispatch(loginUser(values)).unwrap();
            dispatch(getUser());
            toast.success("Успішний вхід!");
          } catch (error) {
            if (error?.includes(400) || error?.response?.status === 400) {
              setStatus("Невірний юзернейм чи пароль");
            } else {
              setStatus("Сталася помилка. Спробуйте пізніше.");
            }
          }
        }}
      >
        {({ status }) => (
          <Form className={css.form}>
            <LabeledField
              name="username"
              label="UserName"
              type="text"
              placeholder="Введіть Username"
            />

            <LabeledField
              name="password"
              label="Пароль"
              type="password"
              placeholder="Введіть Пароль"
            />
            {status && <p className={css.error}>{status}</p>}

            <Button
              size="fs"
              variant="primary"
              type="submit"
              onClick={onSwitch}
              style={{ marginBottom: "24px", marginTop: "16px" }}
            >
              {isLoading ? <Loader location="auth" /> : "Увійти"}
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
