import * as Yup from "yup";

export const ValidationSchema = Yup.object().shape({
  tasks: Yup.array().of(
    Yup.object().shape({
      projectName: Yup.string().min(3, "Too Short").required("This field is required"),
      taskName: Yup.string().min(3, "Too Short").required("This field is required"),
      date: Yup.date().required("This field is required"),
      taskDescription: Yup.string().min(6, "Too Short").required("This field is required"),
      hours: Yup.string()
        .min(5, `Format should be "00:00"`)
        .max(5, `Format should be "00:00"`)
        .required("This field is required")
        .matches(
          /^([0-1][0-9]|[2][0-3]):[0-5][0-9]$/,
          `Range  "00:00" to "24:00"`
        ),
    })
  ),
});
