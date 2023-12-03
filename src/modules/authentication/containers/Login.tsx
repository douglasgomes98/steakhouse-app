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
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { parseQueryParams } from '@/helpers';
import { routes } from '@/routers/constants/routes';
import { useAuthentication } from '@/hooks';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { z } from 'zod';

const schema = z.object({
  email: z
    .string()
    .min(1, { message: i18next.t('validation.emailRequired') })
    .email({ message: i18next.t('validation.emailInvalid') }),
  password: z
    .string()
    .min(1, i18next.t('validation.passwordRequired'))
    .min(8, { message: i18next.t('validation.passwordMinLength') }),
});

type FormData = z.infer<typeof schema>;

export function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);

  const { actions } = useAuthentication();

  const { handleSubmit, control } = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    shouldUnregister: true,
    shouldFocusError: true,
  });

  const toast = useToast({
    position: 'top-right',
  });

  const redirectUrl = useMemo(() => {
    const params = parseQueryParams(location.search)?.redirect;

    if (!params) return null;

    if (Array.isArray(params)) {
      return params.join(',');
    }

    return String(params);
  }, [location]);

  const onSubmit = handleSubmit(({ email, password }) => {
    if (email !== 'steakhouse@mail.com' || password !== '12345678') {
      toast({
        title: t('login.invalidCredentials'),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });

      return;
    }

    actions.login();

    navigate(redirectUrl || routes.dashboard);
  });

  return (
    <Flex align="center" justify="center" h="100vh">
      <Box w="20rem">
        <Heading as="h1" size="lg" mb="8" textAlign="center" fontWeight="bold">
          {t('login.pageTitle')}
        </Heading>

        <form onSubmit={onSubmit}>
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <FormControl isInvalid={fieldState.invalid} mb="4">
                <FormLabel htmlFor="email">
                  {t('common.inputEmailLabel')}
                </FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('common.inputEmailPlaceholder')}
                  autoFocus
                  value={field.value}
                  onChange={event => field.onChange(event.target.value)}
                />
                {fieldState.error?.message && (
                  <FormErrorMessage>
                    {fieldState.error?.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <FormControl isInvalid={fieldState.invalid} mb="4">
                <FormLabel htmlFor="password">
                  {t('common.inputPasswordLabel')}
                </FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('common.inputPasswordPlaceholder')}
                    value={field.value}
                    onChange={event => field.onChange(event.target.value)}
                  />
                  <InputRightElement width="2rem">
                    <IconButton
                      icon={
                        showPassword ? (
                          <AiOutlineEyeInvisible size="1.5rem" />
                        ) : (
                          <AiOutlineEye size="1.5rem" />
                        )
                      }
                      aria-label="icon-password"
                      variant="unstyled"
                      onClick={() => setShowPassword(prevState => !prevState)}
                    />
                  </InputRightElement>
                </InputGroup>
                {fieldState.error?.message && (
                  <FormErrorMessage>
                    {fieldState.error?.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            )}
          />

          <Button type="submit" w="100%">
            {t('login.loginButtonLabel')}
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
