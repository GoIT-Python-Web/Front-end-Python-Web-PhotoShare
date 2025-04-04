import * as Yup from "yup";

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
