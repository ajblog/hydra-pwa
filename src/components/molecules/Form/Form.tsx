import { useForm, FieldValues, Path } from "react-hook-form";
import { motion } from "framer-motion";
import { Button, Input } from "../../atoms";

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

export function Form<T extends FieldValues>({
  fields,
  onSubmit,
  submitText = "ثبت",
}: FormProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-6 py-4">
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
          {errors[field.name] && (
            <p className="text-red-500 text-sm">
              {(errors[field.name]?.message as string) || "خطای نامشخص"}
            </p>
          )}
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
}
