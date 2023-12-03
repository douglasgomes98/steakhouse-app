import { forwardRef, useCallback } from 'react';
import {
  NumberFormatValues,
  PatternFormat,
  PatternFormatProps,
} from 'react-number-format';

import { Input, InputProps } from '@chakra-ui/react';

type CustomInput = Omit<InputProps, 'value' | 'onChange'>;

type CustomNumberFormatProps = Omit<
  PatternFormatProps,
  'onValueChange' | 'onChange' | 'value'
>;

interface CustomInputMaskedProps {
  onChange?: (value: string) => void;
  value?: string;
}

export type InputMaskedProps = CustomInputMaskedProps &
  CustomInput &
  CustomNumberFormatProps;

export const InputMasked = forwardRef<HTMLInputElement, InputMaskedProps>(
  ({ onChange, value, ...props }, ref) => {
    const handleValueChange = useCallback(
      (values: NumberFormatValues) => {
        const { formattedValue } = values;

        if (onChange) {
          onChange(String(formattedValue));
        }
      },
      [onChange],
    );

    return (
      <PatternFormat
        getInputRef={ref}
        customInput={Input as any}
        onValueChange={handleValueChange}
        value={value || ''}
        {...props}
      />
    );
  },
);
