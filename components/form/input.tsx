'use client';

import { Input } from '@/components/ui/input';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';

import { useFieldContext } from '@/hooks/use-form';
import { useStore } from '@tanstack/react-form';

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, ''> {
  label?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description?: string;
}

const InputField = ({ label, icon, description, ...props }: InputProps) => {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);
  const Icon = icon;
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field>
      {label && (
        <FieldLabel htmlFor={field.name}>
          {label}
          {props.required && '*'}
        </FieldLabel>
      )}

      <div className="relative w-full">
        {
          <span className="absolute top-2.5 left-2 max-w-4 max-h-4 object-cover">
            {Icon && <Icon className="w-4 h-4 opacity-45" />}
          </span>
        }

        <Input
          id={field.name}
          name={field.name}
          value={field.state.value ?? ''}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          placeholder="Login button not working on mobile"
          autoComplete="off"
          {...props}
        />
      </div>

      {description && (
        <FieldDescription className="text-sm opacity-45">
          {description}
        </FieldDescription>
      )}
      <FieldError
        errors={errors.map((e) => ({
          message: e.message,
        }))}
      />
    </Field>
  );
};

export default InputField;
