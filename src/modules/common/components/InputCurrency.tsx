import {
  KeyboardEvent,
  FocusEvent,
  useState,
  forwardRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import {
  NumericFormatProps,
  NumberFormatValues,
  SourceInfo,
  NumberFormatBase,
  NumberFormatBaseProps,
  PatternFormatProps,
  OnValueChange,
} from 'react-number-format';

import { Input, InputProps } from '@chakra-ui/react';
import { formatCurrency } from '@/helpers';

type CustomInput = Omit<InputProps, 'value' | 'onChange'>;

type CustomNumberFormatProps = Omit<
  NumberFormatBaseProps & NumericFormatProps & PatternFormatProps,
  'value' | 'onChange' | 'format' | 'onValueChange'
>;

interface CustomInputCurrency {
  value?: number | null;
  onChange?: OnValueChange;
}

export type InputCurrencyProps = CustomInputCurrency &
  CustomInput &
  CustomNumberFormatProps;

export function parseValueToNumber(formatted_value: string) {
  if (!formatted_value) return 0;

  return Number(formatted_value.replace(/[^0-9.-]+/g, ''));
}

export const InputCurrency = forwardRef<HTMLInputElement, InputCurrencyProps>(
  ({ onChange, value, ...props }, ref) => {
    const [currentValue, setCurrentValue] = useState<number>(0);

    useEffect(() => {
      if (!value) return;
      if (typeof value === 'string') return;

      setCurrentValue(value * 10000);
    }, [value]);

    const handleFocus = useCallback(
      (event: FocusEvent<HTMLInputElement>) => event.target.select(),
      [],
    );

    const handleChange = useCallback(
      (values: NumberFormatValues, sourceInfo: SourceInfo) => {
        setCurrentValue(parseFloat(values.value) * 100);
        if (onChange) {
          onChange(
            { ...values, floatValue: Number(values.floatValue) / 100 },
            sourceInfo,
          );
        }
      },
      [onChange],
    );

    const keyDown = useCallback(
      (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code === 'Backspace' && !currentValue) {
          event.preventDefault();
        }

        if (event.code === 'Backspace' && currentValue < 1000) {
          event.preventDefault();
          setCurrentValue(0);
        }
      },
      [currentValue],
    );

    const currencyFormatter = useCallback((formatted_value: string) => {
      if (!Number(formatted_value)) return formatCurrency(0);

      return formatCurrency(Number(formatted_value) / 100);
    }, []);

    const valueFormatted = useMemo(() => {
      return currentValue / 100;
    }, [currentValue]);

    return (
      <NumberFormatBase
        getInputRef={ref}
        customInput={Input as any}
        value={valueFormatted}
        format={currencyFormatter}
        onKeyDown={keyDown}
        onValueChange={handleChange}
        onFocus={handleFocus}
        {...props}
      />
    );
  },
);
