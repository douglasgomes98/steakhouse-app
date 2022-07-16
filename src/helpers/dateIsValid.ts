import { isValid } from 'date-fns';

export function dateIsValid(date: Date | null) {
  return isValid(date);
}
