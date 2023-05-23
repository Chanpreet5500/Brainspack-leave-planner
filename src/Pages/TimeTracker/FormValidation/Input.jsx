import React from "react";
import { useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { MdError } from "react-icons/md";
import { Input, Box } from "@mui/material";

export const ValidateInput = (props) => {
  console.log(props, 'props from validate input')
  const { register } = useFormContext();
  return (
    <Input
      // value={props.value}
      onChange={props.onChange}
      // disableUnderline={props.disableUnderline}
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
      disableUnderline={props.disableUnderline}
      {...register(props.label, {
        required: {
          value: true,
          message: "required",
        },
      })}
    />
  );
};

const InputError = ({ message }) => {
  return (
    <motion.p {...framer_error}>
      <MdError />
      {message}
    </motion.p>
  );
};

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};
