import * as Yup from "yup";

export const registerValidationSchema = Yup.object().shape({
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

export const loginValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Занадто коротке!")
    .max(30, "Занадто довге!")
    .required("UserName є обовʼязковим!"),
  password: Yup.string()
    .min(8, "Має бути не менше 8 символів!")
    .max(30, "Має бути менше 20 символів!")
    .required("Пароль є обовʼязковим!"),
});
