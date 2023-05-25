import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    projectName: Yup.string()
    .min(4, "Too Short")
    .required("Field not be empty"),
    date: Yup.string()
    .min(2, "Too Short")
    .required("Field not be empty"),
    taskName: Yup.string()
    .min(6, "Too Short")
    .required("Field not be empty"),
    taskDescription: Yup.string()
    .min(6, "Too Short")
    .required("Field not be empty"),
    hours: Yup.string()
    .required("Field not be empty"),
    status: Yup.string()
    .min(2, "Too Short")
    .required("Field not be empty"),
  
});
export default validationSchema;