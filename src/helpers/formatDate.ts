import { format } from 'date-fns';

const templates = {
  monthAndYear: 'MM/yyyy',
};

export function formatDate(
  date: Date,
  template: keyof typeof templates,
): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return format(date, templates[template]);
}
