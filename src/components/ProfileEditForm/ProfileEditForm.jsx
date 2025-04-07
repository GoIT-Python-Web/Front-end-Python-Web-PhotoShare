import React from "react";
import { Formik, Form, Field } from "formik";
import Input from "../UI/inputs/Input.jsx";
import Button from "../UI/buttons/Button.jsx";
import css from "./ProfileEditForm.module.css";
import { ProfileEditSchema } from "/src/validation/schemas.js";

const INITIAL_VALUES = {
  name: "",
  userName: "",
  email: "",
  number: "",
  password: "",
  birthday: "",
  additionalInfo: "",
};

const ProfileEditForm = () => {
  return (
    <div className={css.container}>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={ProfileEditSchema}
        onSubmit={(values) => {
          console.log("Форма відправлена:", values);
        }}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <p className={css.title}>Особисті данні</p>
            <div className={css.wrapInfo}>
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
                    placeholder="Електронна пошта"
                    error={meta.touched && meta.error}
                    errorMessage={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>

              <Field name="number">
                {({ field, meta }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder="Номер телефону"
                    error={meta.touched && meta.error}
                    errorMessage={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>

              <Field name="birthday">
                {({ field, meta }) => (
                  <Input
                    {...field}
                    type="date"
                    placeholder="День народження"
                    error={meta.touched && meta.error}
                    errorMessage={meta.touched && meta.error ? meta.error : ""}
                  />
                )}
              </Field>
            </div>

            <p className={css.title}>Зміна паролю</p>

            <Field name="password">
              {({ field, meta }) => (
                <Input
                  {...field}
                  type="password"
                  placeholder="Пароль"
                  showPassword
                  error={meta.touched && meta.error}
                  errorMessage={meta.touched && meta.error ? meta.error : ""}
                />
              )}
            </Field>

            <p className={css.title}>Додаткові данні</p>

            <Field name="additionalInfo">
              {({ field, meta }) => (
                <Input
                  {...field}
                  type="textarea"
                  placeholder="Додаткові дані "
                  error={meta.touched && meta.error}
                  errorMessage={meta.touched && meta.error ? meta.error : ""}
                />
              )}
            </Field>

            <div className={css.wrapBtn}>
              <Button
                size="fs"
                variant="secondary"
                type="button"
                disabled={isSubmitting}
              >
                Скинути
              </Button>

              <Button
                size="fs"
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
