import { Label, NativeSelect, NativeSelectOption } from "../ui";
import { forwardRef, type InputHTMLAttributes } from "react";
import { ErrorMessage } from "./error-message";

interface SelectFormProps extends InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  labelFor?: string;
  error?: string;
  placeholder?: string;
  options: { id: number; label: string; value: string | number }[];
}

export const SelectForm = forwardRef<HTMLSelectElement, SelectFormProps>(
  ({ label, labelFor, error, placeholder, options, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-y-1 text-sm">
        <Label htmlFor={labelFor} className="font-medium text-gray-700">
          {label}
        </Label>
        <NativeSelect
          ref={ref}
          aria-invalid={error ? "true" : "false"}
          {...props}
        >
          {placeholder && (
            <NativeSelectOption value="">{placeholder}</NativeSelectOption>
          )}
          {options.map((option) => (
            <NativeSelectOption key={option.id} value={option.value}>
              {option.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        {error && <ErrorMessage message={error} />}
      </div>
    );
  }
);
