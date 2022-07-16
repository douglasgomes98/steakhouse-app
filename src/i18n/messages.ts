// pt-BR
import ptBRvalidation from './languages/pt-BR/validation.json';
import ptBRLogin from './languages/pt-BR/login.json';
import ptBRCommon from './languages/pt-BR/common.json';
import ptBRDashboard from './languages/pt-BR/dashboard.json';
import ptBrCreateSteak from './languages/pt-BR/create-steak.json';

export const messages = {
  'pt-BR': {
    translation: {
      ...ptBRvalidation,
      ...ptBRLogin,
      ...ptBRCommon,
      ...ptBRDashboard,
      ...ptBrCreateSteak,
    },
  },
};
