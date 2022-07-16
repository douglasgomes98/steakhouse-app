import { parse, isValid } from 'date-fns';

const templates = {
  brazilian: 'dd/MM/yyyy',
};

export function parseDate(date: string, template: keyof typeof templates) {
  if (isValid(parse(date, templates[template], new Date()))) {
    return parse(date, templates[template], new Date());
  }

  return null;
}
