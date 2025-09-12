import { useState, useCallback } from 'react';

type ValidationRule<T> = {
  validator: (value: any, values?: T) => boolean | string;
  message: string;
};

type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T>[];
};

type FormErrors<T> = {
  [K in keyof T]?: string;
};

export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationRules?: ValidationRules<T>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback(
    (name: string, value: any): string => {
      if (!validationRules || !validationRules[name as keyof T]) return '';

      const rules = validationRules[name as keyof T] as ValidationRule<T>[];
      
      for (const rule of rules) {
        const isValid = rule.validator(value, values);
        if (isValid !== true) {
          return typeof isValid === 'string' ? isValid : rule.message;
        }
      }
      
      return '';
    },
    [validationRules, values]
  );

  const validateForm = useCallback((): boolean => {
    if (!validationRules) return true;

    const newErrors: FormErrors<T> = {};
    let isValid = true;

    Object.keys(validationRules).forEach((key) => {
      const error = validateField(key, values[key as keyof T]);
      if (error) {
        newErrors[key as keyof T] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validateField, validationRules, values]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      
      // Handle different input types
      let finalValue: any = value;
      
      if (type === 'number') {
        finalValue = value === '' ? '' : Number(value);
      } else if (type === 'checkbox') {
        finalValue = (e.target as HTMLInputElement).checked;
      }
      
      setValues((prev) => ({
        ...prev,
        [name]: finalValue,
      }));

      // Validate field if there are validation rules
      if (validationRules?.[name as keyof T]) {
        const error = validateField(name, finalValue);
        setErrors((prev) => ({
          ...prev,
          [name]: error,
        }));
      }
    },
    [validateField, validationRules]
  );

  const setFieldValue = useCallback((name: string, value: any) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate field if there are validation rules
    if (validationRules?.[name as keyof T]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  }, [validateField, validationRules]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  const handleSubmit = useCallback(
    (onSubmit: (values: T) => Promise<void> | void) => {
      return async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (validateForm()) {
          setIsSubmitting(true);
          try {
            await onSubmit(values);
          } finally {
            setIsSubmitting(false);
          }
        }
      };
    },
    [validateForm, values]
  );

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFieldValue,
    setErrors,
    resetForm,
    setValues,
  };
}

// Common validation rules
export const requiredRule = (message = 'This field is required'): ValidationRule<any> => ({
  validator: (value) => {
    if (value === undefined || value === null) return false;
    if (typeof value === 'string') return value.trim() !== '';
    if (Array.isArray(value)) return value.length > 0;
    return true;
  },
  message,
});

export const emailRule = (message = 'Please enter a valid email address'): ValidationRule<any> => ({
  validator: (value) => {
    if (!value) return true; // Skip if empty (use requiredRule for required fields)
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(value).toLowerCase());
  },
  message,
});

export const minLengthRule = (min: number, message?: string): ValidationRule<any> => ({
  validator: (value) => {
    if (!value) return true; // Skip if empty
    return String(value).length >= min;
  },
  message: message || `Must be at least ${min} characters`,
});

export const passwordMatchRule = (
  fieldName: string,
  message = 'Passwords do not match'
): ValidationRule<any> => ({
  validator: (value, values) => {
    if (!values) return true;
    return value === (values as any)[fieldName];
  },
  message,
});

// Example usage:
/*
const { values, errors, handleChange, handleSubmit } = useForm(
  { email: '', password: '', confirmPassword: '' },
  {
    email: [requiredRule(), emailRule()],
    password: [requiredRule(), minLengthRule(6)],
    confirmPassword: [
      requiredRule(),
      passwordMatchRule('password', 'Passwords must match')
    ],
  }
);

// In your component:
<form onSubmit={handleSubmit(async (values) => {
  // Handle form submission
  console.log(values);
})}>
  <input
    name="email"
    value={values.email}
    onChange={handleChange}
    placeholder="Email"
  />
  {errors.email && <div className="error">{errors.email}</div>}
  
  <input
    type="password"
    name="password"
    value={values.password}
    onChange={handleChange}
    placeholder="Password"
  />
  {errors.password && <div className="error">{errors.password}</div>}
  
  <button type="submit" disabled={isSubmitting}>
    {isSubmitting ? 'Submitting...' : 'Submit'}
  </button>
</form>
*/
