import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    firstName: Yup.string()
    .min(3, "Too Short")
    .required("Required"),
    lastName: Yup.string()
    .min(3, "Too Short")
    .required("Required"),
    email: Yup.string()
    .required("Required"),
    phoneNumber: Yup.number()
    // .min(10, "Too Short").max(10,'Maximum')
    .required("Required"),
    designation: Yup.string()
    .min(5,"Too Short")
    .required("Required"),
  
});
export default validationSchema;