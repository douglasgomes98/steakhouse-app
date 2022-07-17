import {
  KeyboardEvent,
  FocusEvent,
  useState,
  forwardRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import NumberFormat, {
  NumberFormatPropsBase,
  NumberFormatValues,
  SourceInfo,
} from 'react-number-format';

import { Input, InputProps } from '@chakra-ui/react';

type CustomInput = Omit<InputProps, 'value' | 'onChange'>;

type CustomNumberFormatProps = Omit<NumberFormatPropsBase<any>, 'onChange'>;

interface CustomCurrencyInput {
  initialValue?: number | null;
}

export type CurrencyInputProps = CustomCurrencyInput &
  CustomInput &
  CustomNumberFormatProps;

const currencyFormatter = (formatted_value: string) => {
  if (!Number(formatted_value)) return 'R$ 0.00';

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(formatted_value) / 100);
};

export const parseToCurrency = (formatted_value: number) => {
  if (!Number(formatted_value)) return 'R$ 0.00';

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(formatted_value));
};

export const parseValueToNumber = (formatted_value: string) => {
  if (!formatted_value) return 0;

  return Number(formatted_value.replace(/[^0-9.-]+/g, ''));
};

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ onValueChange, initialValue, ...props }, ref) => {
    const [currentValue, setCurrentValue] = useState<number>(0);

    useEffect(() => {
      if (!initialValue) return;
      if (typeof initialValue === 'string') return;

      setCurrentValue(initialValue * 10000);
    }, [initialValue]);

    const handleFocus = useCallback(
      (event: FocusEvent<HTMLInputElement>) => event.target.select(),
      [],
    );

    const handleChange = useCallback(
      (values: NumberFormatValues, sourceInfo: SourceInfo) => {
        setCurrentValue(parseFloat(values.value) * 100);
        if (onValueChange) {
          onValueChange(
            { ...values, floatValue: Number(values.floatValue) / 100 },
            sourceInfo,
          );
        }
      },
      [onValueChange],
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

    const valueFormatted = useMemo(() => {
      return currentValue / 100;
    }, [currentValue]);

    return (
      <NumberFormat
        getInputRef={ref}
        customInput={Input}
        allowEmptyFormatting
        decimalSeparator=","
        thousandSeparator="."
        decimalScale={2}
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
