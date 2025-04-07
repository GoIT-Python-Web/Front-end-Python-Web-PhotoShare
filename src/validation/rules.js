import * as Yup from "yup";

export const nameField = Yup.string()
  .min(3, "Занадто коротке!")
  .max(20, "Занадто довге!")
  .required("Імʼя є обовʼязковим!");

export const userNameField = Yup.string()
  .min(3, "Занадто коротке!")
  .max(20, "Занадто довге!")
  .required("UserName є обовʼязковим!");

export const emailField = Yup.string()
  .email("Недійсний email!")
  .required("Email є обовʼязковим!");

export const passwordField = Yup.string()
  .min(8, "Має бути не менше 8 символів!")
  .max(30, "Має бути менше 30 символів!")
  .required("Пароль є обовʼязковим!");
