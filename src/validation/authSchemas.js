import * as Yup from "yup";
import { nameField, userNameField, emailField, passwordField } from "./rules";

export const registerValidationSchema = Yup.object().shape({
  name: nameField,
  userName: userNameField,
  email: emailField,
  password: passwordField,
});

export const loginValidationSchema = Yup.object().shape({
  name: userNameField.label("UserName"),
  password: passwordField,
});
