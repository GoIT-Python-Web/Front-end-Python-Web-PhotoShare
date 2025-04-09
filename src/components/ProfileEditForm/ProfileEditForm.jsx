import { Formik, Form, Field } from "formik";
import css from "./ProfileEditForm.module.css";
import Input from "../common/inputs/Input.jsx";
import Button from "../common/buttons/Button.jsx";
import { ProfileEditSchema } from "../../validation/schemas.js";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/auth/selectors.js";

const ProfileEditForm = () => {
  const user = useSelector(selectUser);

  const INITIAL_VALUES = {
    name: user.name ?? "",
    userName: user.username ?? "",
    email: user.email ?? "",
    number: user.phone ?? "",
    password: "",
    birthday: user.birthday ?? "",
    additionalInfo: user.description ?? "",
  };

  return (
    <div className={css.container}>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={ProfileEditSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("Форма відправлена:", values);
          resetForm();
        }}
      >
        {({ isSubmitting, resetForm, values }) => (
          <Form className={css.form}>
            <p className={css.title}>Особисті данні</p>
            <div className={css.wrapInfo}>
              <div className={css.infoItem}>
                <Field name="name">
                  {({ field, meta }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder="Імʼя"
                      error={meta.touched && meta.error}
                      errorMessage={
                        meta.touched && meta.error ? meta.error : ""
                      }
                    />
                  )}
                </Field>
              </div>

              <div className={css.infoItem}>
                <Field name="userName">
                  {({ field, meta }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder="UserName"
                      error={meta.touched && meta.error}
                      errorMessage={
                        meta.touched && meta.error ? meta.error : ""
                      }
                    />
                  )}
                </Field>
              </div>

              <div className={css.infoItem}>
                <Field name="email">
                  {({ field, meta }) => (
                    <Input
                      {...field}
                      type="email"
                      placeholder="Електронна пошта"
                      error={meta.touched && meta.error}
                      errorMessage={
                        meta.touched && meta.error ? meta.error : ""
                      }
                    />
                  )}
                </Field>
              </div>

              <div className={css.infoItem}>
                <Field name="number">
                  {({ field, meta }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder="Номер телефону"
                      error={meta.touched && meta.error}
                      errorMessage={
                        meta.touched && meta.error ? meta.error : ""
                      }
                    />
                  )}
                </Field>
              </div>

              <div className={css.infoItem}>
                <Field name="birthday">
                  {({ field, meta }) => (
                    <Input
                      {...field}
                      type="date"
                      placeholder="День народження"
                      error={meta.touched && meta.error}
                      errorMessage={
                        meta.touched && meta.error ? meta.error : ""
                      }
                    />
                  )}
                </Field>
              </div>

              <div className={css.infoItem}>
                <Field name="password">
                  {({ field, meta }) => (
                    <Input
                      {...field}
                      type="password"
                      placeholder="Пароль"
                      error={meta.touched && meta.error}
                      errorMessage={
                        meta.touched && meta.error ? meta.error : ""
                      }
                    />
                  )}
                </Field>
              </div>
            </div>

            <div className={css.wrapAdditionalInfo}>
              <p className={css.title}>Додаткові данні</p>
              <textarea
                className={css.textarea}
                placeholder="Додаткові данні"
                rows="5"
              />
            </div>

            <div className={css.wrapBtn}>
              <Button
                size="lg"
                variant="secondary"
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  resetForm();
                }}
              >
                Скинути
              </Button>

              <Button
                size="lg"
                variant="primary"
                type="submit"
                disabled={isSubmitting}
              >
                Застосувати Зміни
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileEditForm;
