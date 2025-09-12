import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type FormTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  labelClassName?: string;
  containerClassName?: string;
  rows?: number;
};

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      label,
      error,
      className,
      labelClassName,
      containerClassName,
      id,
      name,
      rows = 3,
      ...props
    },
    ref
  ) => {
    const textareaId = id || name || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <div className={cn('w-full', containerClassName)}>
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              'block text-sm font-medium text-gray-700 mb-1',
              labelClassName
            )}
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="mt-1">
          <textarea
            id={textareaId}
            ref={ref}
            name={name}
            rows={rows}
            className={cn(
              'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300',
              'placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6',
              'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200',
              error
                ? 'border-red-500 focus:ring-red-500'
                : 'focus:ring-blue-600',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600" id={`${textareaId}-error`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';
