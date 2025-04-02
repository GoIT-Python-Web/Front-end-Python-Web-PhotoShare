import * as Yup from "yup";

// 1 upper case letter, 1 numeric digit, 1 lower case letter, min 8 characters
const passwordRules = /^(?=.*[A-Z])(?=.*\d)(?=.*[a-z]).{8,}$/;

export const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .required("Name is required"),
  userName: Yup.string()
  .min(3, "Too Short!")
  .max(20, "Too Long!")
  .required("UserName is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      passwordRules,
      "The password must consist of at least 8 characters, one capital letter and one number!"
    )
    .required("Password is required"),
});