import { forwardRef } from 'react';
import NumberFormat, {
  NumberFormatValues,
  NumberFormatPropsBase,
} from 'react-number-format';

import { Input, InputProps } from '@chakra-ui/react';

type CustomInput = Omit<InputProps, 'value' | 'onChange' | 'ref'>;

type CustomMaskedInputProps = {
  onChange?: (value: string) => void;
  value?: string;
};

type CustomNumberFormatProps = Omit<
  NumberFormatPropsBase<unknown>,
  'onValueChange' | 'onChange' | 'value'
>;

export type MaskedInputProps = CustomMaskedInputProps &
  CustomInput &
  CustomNumberFormatProps;

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ onChange, value, ...props }, ref) => {
    function handleValueChange(values: NumberFormatValues) {
      const { formattedValue } = values;

      if (onChange) {
        onChange(String(formattedValue));
      }
    }

    return (
      <NumberFormat
        getInputRef={ref}
        customInput={Input}
        onValueChange={handleValueChange}
        value={value || ''}
        {...props}
      />
    );
  },
);
