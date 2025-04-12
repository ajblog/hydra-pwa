import * as React from "react";
import { cn } from "../../../utils";

interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode;
  theme?: "dark" | "light" | "white";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, theme, type, icon, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {icon && (
          <span
            className={`absolute right-3 text-muted-foreground  ${theme === "dark" ? "bg-white"  : ""}`}
          >
            {icon}
          </span>
        )}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-full border-1 bg-transparent px-3 py-6 text-base text-center shadow-sm transition-colors placeholder:text-center focus-visible:outline-none focus-visible:border-amber-100 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            theme === "dark"
              ? "border-[#7D7D7D] placeholder:text-[#7D7D7D]"
              : theme === "light"
                ? "border-[#DBDBDB] placeholder:text-[#DBDBDB] "
                : "border-none bg-white placeholder:text-[#434343]",
            className
          )}
          ref={ref}
          autoComplete={type === "password" ? "new-password" : "off"} // Use "new-password" for password fields, "off" for others
          autoCorrect="off" // Disable autocorrect suggestions
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
