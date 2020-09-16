import * as yup from "yup";

export default yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be 3 chars or longer"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be 8 chars or longer"),
  terms: yup
    .boolean()
    .test(
      "consent",
      "You must agree to our Terms and Conditions",
      (value) => value === true
    )
    .required("You must agree to our Terms and Conditions"),
});
