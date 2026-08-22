import * as yup from "yup";
import yupPassword from "yup-password";

yupPassword(yup);

export const signupValidator = yup.object({
  fullname: yup.string().required().min(3),
  username: yup.string().required().min(3),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(6)
    .minLowercase(1)
    .minUppercase(1)
    .minNumbers(1)
    .minSymbols(1),
  image: yup.string().required(),
  role: yup.string().required(),
});
