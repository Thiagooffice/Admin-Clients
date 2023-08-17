import * as yup from "yup";

export const signInSchema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

export const createClientSchema = yup.object().shape({
    name: yup.string().required("Name is required"),})

export const registerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().required("E-mail is required").email("Invalid e-mail"),
  senha: yup
    .string()
    .optional()
    .required("Password is required"),
    confirmeSenha: yup
    .string()
    .optional()
    .required("Confirm Password is required")
    .oneOf([yup.ref("senha")], "Passwords must match"),
})