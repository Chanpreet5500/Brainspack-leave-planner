import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().min(3, "Too Short").required("First Name Required"),
  lastName: Yup.string().min(3, "Too Short").required("Lasr Name Required"),
  email: Yup.string()
    .required("Email Required")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Invalid email"),
  phoneNumber: Yup.number()
    .required("Phone number required"),
  designation: Yup.string().min(5, "Too Short").required("Designation Required"),
});
export default validationSchema;
