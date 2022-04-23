import * as Yup from "yup";

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const passwordRegExp =
  /^(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
var validationSchema = [
  // validation for add user form
  Yup.object().shape({
    name: Yup.string()
      .min(3, "*Names must have at least 3 characters")

      .required("*Name is required"),
    email: Yup.string()
      .email("*Must be a valid email address")
      .max(100, "*Email must be less than 100 characters")
      .required("*Email is required"),
    phone: Yup.string()
      .matches(phoneRegExp, "*Phone number is not valid")
      .required("*Phone number required"),
    password: Yup.string()
      .matches(
        passwordRegExp,
        "The password length must be greater than or equal to 8 , one or more uppercase characters,one or more lowercase characters, one or more numeric values and one or more special characters "
      )
      .required("*Password required"),
    confirmPassword: Yup.string()
      .required(`Confirm Password is required`)
      .oneOf([Yup.ref("password"), null], `Password must match`),
  }),

  // validation for edit form
  Yup.object().shape({
    name: Yup.string()
      .min(3, "*Names must have at least 2 characters")

      .required("*Name is required"),
    email: Yup.string()
      .email("*Must be a valid email address")
      .max(100, "*Email must be less than 100 characters")
      .required("*Email is required"),
    phone: Yup.string()
      .matches(phoneRegExp, "*Phone number is not valid")
      .required("*Phone number required"),
  }),
];
export default validationSchema;
