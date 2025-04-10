import { Formik, Form, Field } from "formik";
import css from "./ProfileEditForm.module.css";
import Input from "../../common/inputs/Input.jsx";
import Button from "../../common/buttons/Button.jsx";
import { ProfileEditSchema } from "../../../validation/schemas.js";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../store/auth/operations";
import { FaPenToSquare } from "react-icons/fa6";
import { useRef, useState } from "react";
import def from "../../../assets/images/EditProfilPage/AvatarDef.png";

const ProfileEditForm = ({ user }) => {
  const INITIAL_VALUES = {
    avatar: user?.image_url ?? def,
    name: user?.name ?? "",
    email: user?.email ?? "",
    number: user?.phone ?? "",
    password: "",
    birthday: user?.birthday ?? "",
    additionalInfo: user?.description ?? "",
  };

  const dispatch = useDispatch();

  const [avatarSrc, setAvatarSrc] = useState(def);
  const fileInputRef = useRef(null);

  const handleImageError = () => {
    setAvatarSrc(def);
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarSrc(imageUrl);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={css.container}>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={ProfileEditSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const formData = new FormData();

            Object.entries(values).forEach(([key, value]) => {
              formData.append(key, value);
            });

            if (fileInputRef.current?.files[0]) {
              formData.append("avatar", fileInputRef.current.files[0]);
            }

            await dispatch(updateUser(formData)).unwrap();
            console.log("Форма відправлена:", values);
            resetForm();
          } catch (err) {
            console.error("Помилка оновлення:", err);
          }
        }}
      >
        {({ isSubmitting, resetForm }) => (
          <Form className={css.form}>
            <div className={css.avatarWrap}>
              <img
                className={css.avatarImg}
                src={avatarSrc}
                alt="Аватар"
                onError={handleImageError}
              />
              <button className={css.editBtn} onClick={handleEditClick}>
                {/* <svg width="16" height="16">
            <use href="/public/sprite.svg#pen" />
          </svg> */}
                <FaPenToSquare size={22} />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
            <hr className={css.divider} />

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
              {/* <textarea
                className={css.textarea}
                placeholder="Додаткові данні"
                rows="5"
              /> */}
              <Field name="additionalInfo">
                {({ field, meta }) => (
                  <>
                    <textarea
                      {...field}
                      className={css.textarea}
                      placeholder="Додаткові данні"
                      rows="5"
                    />
                    {meta.touched && meta.error && (
                      <div className={css.error}>{meta.error}</div>
                    )}
                  </>
                )}
              </Field>
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
