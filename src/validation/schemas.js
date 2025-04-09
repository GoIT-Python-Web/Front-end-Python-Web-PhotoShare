import * as Yup from "yup";

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
      /^\+\d{2}\d{3}\d{3}\d{2}\d{2}$/,
      "Має бути у форматі +380777777777"
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
