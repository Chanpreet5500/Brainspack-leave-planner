import * as Yup from "yup";

export const ValidationSchema = Yup.object().shape({
  validate: Yup.array().of(
    Yup.object().shape({
      projectName: Yup.string().required("This field is required"),
      taskName: Yup.string().required("This field is required"),
      date: Yup.date().required("This field is required"),
      taskDescription: Yup.string().required("This field is required"),
      hours: Yup.string().required("This field is required"),
    })
  ),
});
