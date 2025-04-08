import * as Yup from "yup";
import { nameField, userNameField, emailField, passwordField } from "./rules";

export const registerValidationSchema = Yup.object().shape({
  name: nameField,
  username: userNameField,
  email: emailField,
  password: passwordField,
});

export const loginValidationSchema = Yup.object().shape({
  username: userNameField,
  password: passwordField,
});
