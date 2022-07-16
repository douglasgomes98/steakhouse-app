// pt-BR
import ptBRvalidation from './languages/pt-BR/validation.json';
import ptBRLogin from './languages/pt-BR/login.json';
import ptBRCommon from './languages/pt-BR/common.json';
import ptBRDashboard from './languages/pt-BR/dashboard.json';

export const messages = {
  'pt-BR': {
    translation: {
      ...ptBRvalidation,
      ...ptBRLogin,
      ...ptBRCommon,
      ...ptBRDashboard,
    },
  },
};
