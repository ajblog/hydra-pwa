import { useForm, FieldValues, Path } from "react-hook-form";
import { motion } from "framer-motion";
import { Button, Input, showErrorToast } from "../../atoms";
import React, { useEffect } from "react";

interface Field {
  name: string;
  type: string;
  placeholder: string;
  validation?: object;
  icon?: React.ReactNode;
}

interface FormProps<T extends FieldValues> {
  fields: Field[];
  onSubmit: (data: T) => void;
  submitText?: string;
}

export const Form = React.memo(function Form<T extends FieldValues>({
  fields,
  onSubmit,
  submitText = "ثبت",
}: FormProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<T>({ mode: "onSubmit" });

  const handleFormSubmit = (data: T) => {
    onSubmit(data);
  };

  const handleFormError = () => {
    Object.values(errors).forEach((error) => {
      if (error?.message) {
        showErrorToast(error.message as string);
      }
    });
  };

   useEffect(() => {
     if (isSubmitted && Object.keys(errors).length > 0) {
       Object.values(errors).forEach((error) => {
         if (error?.message) {
           showErrorToast(error.message as string);
         }
       });
     }
   }, [errors, isSubmitted]);

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit, handleFormError)}
      className="space-y-4 px-6 py-4"
    >
      {fields.map((field, index) => (
        <motion.div
          key={field.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 * index }}
        >
          <Input
            type={field.type}
            placeholder={field.placeholder}
            icon={field.icon}
            {...register(field.name as Path<T>, field.validation)}
          />

        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <Button type="submit" size="lg" variant="secondary" className="w-full">
          {submitText}
        </Button>
      </motion.div>
    </form>
  );
});
