import * as Yup from "yup";

// 1 upper case letter, 1 numeric digit, 1 lower case letter, min 8 characters
// const passwordRules = /^(?=.*[A-Z])(?=.*\d)(?=.*[a-z]).{8,}$/;

export const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Занадто короткий!")
    .max(20, "Занадто довго!")
    .required("Імʼя є обовязковим!"),
  userName: Yup.string()
    .min(3, "Занадто короткий!")
    .max(20, "Занадто довго!")
    .required("UserName є обовязковим!"),
  email: Yup.string()
    .email("Недійсний email!")
    .required("Email є обовязковим!"),
  password: Yup.string()
    .min(8, "Має бути не менше 8 символів!")
    .max(30, "Має бути менше 20 символів!")
    .required("Пароль є обовязковим!"),
});
