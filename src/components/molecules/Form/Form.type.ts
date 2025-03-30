import { FieldValues } from "react-hook-form";

interface Field {
  name: string;
  type: string;
  placeholder: string;
  validation?: object;
  icon?: React.ReactNode;
  invisible?: boolean;
}

interface FormProps<T extends FieldValues> {
  fields: Field[];
  onSubmit: (data: T) => void;
  submitText?: string;
  hideButton?: boolean;
  inputTheme?: "dark" | "light";
  buttonTheme?:
    | "secondary"
    | "default"
    | "outline"
    | "link"
    | "ghost"
    | "destructive";
}

export type {Field , FormProps}