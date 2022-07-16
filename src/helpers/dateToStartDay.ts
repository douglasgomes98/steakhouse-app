import { startOfDay } from 'date-fns';

export function dateToStartDay(date: Date) {
  return startOfDay(date);
}
