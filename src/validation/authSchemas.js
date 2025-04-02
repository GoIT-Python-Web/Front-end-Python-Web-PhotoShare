import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name is too short!")
    .max(30, "Name is too long!")
    .required("Name is required!"),
  password: Yup.string()
    .min(8, "Must be at least 8 characters!")
    .max(30, "Must be less than 20 characters!")
    .required("Password is required!"),
});
