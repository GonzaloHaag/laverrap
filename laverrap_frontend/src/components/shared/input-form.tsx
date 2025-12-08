import { Label } from "../ui";
import { Input } from "../ui/input";
import { forwardRef, type InputHTMLAttributes } from "react";
import { ErrorMessage } from "./error-message";

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelFor?: string;
  error?: string;
  placeholder: string;
  type: string;
}

export const InputForm = forwardRef<HTMLInputElement, InputFormProps>(
  ({ label, labelFor, error, placeholder, type, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-y-1 text-sm">
        <Label htmlFor={labelFor} className="font-medium text-gray-700">
          {label}
        </Label>
        <Input
          ref={ref}
          placeholder={placeholder}
          type={type}
          aria-invalid={error ? "true" : "false"}
          {...props}
        />
        {error && <ErrorMessage message={error} />}
      </div>
    );
  }
);
