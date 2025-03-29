import * as React from "react";
import { cn } from "../../../utils";

interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {icon && (
          <span className="absolute right-3 text-muted-foreground">{icon}</span>
        )}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-full border-[#DBDBDB] border-1 bg-transparent px-3 py-6 text-base text-center shadow-sm transition-colors placeholder:text-[#DBDBDB] placeholder:text-center focus-visible:outline-none focus-visible:border-amber-100 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
