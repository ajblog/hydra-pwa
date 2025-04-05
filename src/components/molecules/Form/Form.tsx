import { useForm, FieldValues, Path } from "react-hook-form";
import { motion } from "framer-motion";
import { Button, Input, showErrorToast } from "../../atoms";
import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FormProps } from "./Form.type";
import { cn } from "../../../utils";

export const Form = React.memo(function Form<T extends FieldValues>({
  fields,
  onSubmit,
  submitText = "ثبت",
  hideButton = false,
  inputTheme = "light",
  buttonTheme = "secondary",
  customButtons,
  className,
}: FormProps<T>) {
  const {
    register,
    handleSubmit,

    formState,
  } = useForm<T>({ mode: "onSubmit" });

  const { errors, isSubmitted } = formState;

  const [visiblePasswords, setVisiblePasswords] = useState<{
    [key: string]: boolean;
  }>({});

  const togglePasswordVisibility = (fieldName: string) => {
    setVisiblePasswords((prev) => ({ ...prev, [fieldName]: !prev[fieldName] }));
  };

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
      className={cn(
        "space-y-4 px-6 py-4 w-full grid grid-cols-2 gap-x-4",
        className
      )}
    >
      {fields.map((field, index) =>
        !field.invisible ? (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 * index }}
            className={`relative ${field.column === "half" ? "col-span-1" : "col-span-full"}`}
          >
            <Input
              theme={inputTheme}
              type={
                field.type === "password" && visiblePasswords[field.name]
                  ? "text"
                  : field.type === "onlyNumber"
                    ? "text"
                    : field.type
              }
              placeholder={field.placeholder}
              defaultValue={field.defaultValue}
              icon={field.icon}
              {...register(field.name as Path<T>, field.validation)}
              onInput={
                field.type === "onlyNumber"
                  ? (e) => {
                      let value = e.currentTarget.value;

                      // Convert Persian digits (۰–۹) to English digits (0–9)
                      value = value.replace(/[\u06F0-\u06F9]/g, (d) =>
                        String.fromCharCode(d.charCodeAt(0) - 1728)
                      );

                      // Remove any non-digit characters
                      value = value.replace(/[^\d]/g, "");

                      e.currentTarget.value = value;
                    }
                  : undefined
              }
            />

            {field.type === "password" && (
              <button
                type="button"
                onClick={() => togglePasswordVisibility(field.name)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-700"
              >
                {visiblePasswords[field.name] ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            )}
          </motion.div>
        ) : null
      )}

      {!hideButton &&
        (customButtons ? (
          customButtons({
            handleSubmit,
            formState,
          })
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className=" col-span-full"
          >
            <Button
              type="submit"
              size="lg"
              variant={buttonTheme}
              className="w-full"
            >
              {submitText}
            </Button>
          </motion.div>
        ))}
    </form>
  );
});
