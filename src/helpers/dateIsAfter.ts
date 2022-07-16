import { isAfter } from 'date-fns';

export function dateIsAfter(date: Date, dateToCompare: Date) {
  return isAfter(dateToCompare, date);
}
