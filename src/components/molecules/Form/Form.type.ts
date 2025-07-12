import { ReactNode } from "react";
import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormStateReturn,
} from "react-hook-form";

interface Field {
  name: string;
  type: string | "onlyNumber";
  placeholder: string;
  validation?: object;
  icon?: React.ReactNode;
  invisible?: boolean;
  column?: "full" | "half";
  defaultValue?: string;
}

interface FormProps<T extends FieldValues> {
  fields: Field[];
  className?: string;
  onSubmit: (data: T) => void;
  submitText?: string;
  disabled?: boolean;
  hideButton?: boolean;
  inputTheme?: "dark" | "light" | "white";
  buttonTheme?:
    | "secondary"
    | "default"
    | "outline"
    | "link"
    | "ghost"
    | "destructive";
  customButtons?: (params: {
    handleSubmit: UseFormHandleSubmit<T>;
    formState: UseFormStateReturn<T>;
  }) => ReactNode;
  customLink?: ReactNode;
}

export type { Field, FormProps };
