import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Box,
  Input,
  Button,
  Flex,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { parseQueryParams } from '@/helpers/parseQueryParams';
import { routes } from '@/routers/constants/routes';
import { useAuthentication } from '@/hooks/useAuthentication';

type FormData = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email(i18next.t('validation.emailInvalid'))
    .required(i18next.t('validation.emailRequired')),
  password: yup
    .string()
    .min(8, i18next.t('validation.passwordMinLength'))
    .required(i18next.t('validation.passwordRequired')),
});

export function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectUrl = useMemo(() => {
    const params = parseQueryParams(location.search)?.redirect;

    if (!params) return null;

    if (Array.isArray(params)) {
      return params.join(',');
    }

    return String(params);
  }, [location]);

  const { actions } = useAuthentication();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    shouldUnregister: true,
    shouldFocusError: true,
  });

  const toast = useToast({
    position: 'top-right',
  });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    if (email !== 'steakhouse@mail.com' || password !== '12345678') {
      toast({
        title: t('login.invalidCredentials'),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    actions.login();

    navigate(redirectUrl || routes.dashboard);
  });

  return (
    <Flex align="center" justify="center" h="100vh">
      <Box w="20rem">
        <Heading as="h2" size="xl">
          Login
        </Heading>

        <form onSubmit={onSubmit}>
          <FormControl isInvalid={!!errors.email} mb="4">
            <FormLabel htmlFor="email">{t('common.inputEmailLabel')}</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder={t('common.inputEmailPlaceholder')}
              {...register('email')}
            />
            {errors.email && (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.password} mb="4">
            <FormLabel htmlFor="password">
              {t('common.inputPasswordLabel')}
            </FormLabel>
            <Input
              id="password"
              type="password"
              placeholder={t('common.inputPasswordPlaceholder')}
              {...register('password')}
            />
            {errors.password && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>

          <Button type="submit" w="100%">
            {t('login.loginButtonLabel')}
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
