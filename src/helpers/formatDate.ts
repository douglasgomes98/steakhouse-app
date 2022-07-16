import { format } from 'date-fns';

const templates = {
  monthAndYear: 'MM/yyyy',
};

export function formatDate(
  date: Date,
  template: keyof typeof templates,
): string {
  return format(date, templates[template]);
}
