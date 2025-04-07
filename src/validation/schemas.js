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

export const ProfileEditSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Занадто коротке!")
    .max(20, "Занадто довге!")
    .optional(),
  userName: Yup.string()
    .min(3, "Занадто коротке!")
    .max(20, "Занадто довге!")
    .optional(),
  email: Yup.string().email("Недійсний email!").optional(),
  number: Yup.string()
    .matches(
      /^\+\d{2} \d{3} \d{3}-\d{2}-\d{2}$/,
      "Має бути у форматі +38 077 777-77-77"
    )
    .optional(),
  password: Yup.string()
    .min(8, "Має бути не менше 8 символів!")
    .max(30, "Має бути менше 30 символів!")
    .optional(),
  birthday: Yup.date().typeError("Невірний формат дати").optional(),
  additionalInfo: Yup.string()
    .min(10, "Занадто короткий опис!")
    .max(1000, "Занадто довгий опис")
    .optional(),
});

