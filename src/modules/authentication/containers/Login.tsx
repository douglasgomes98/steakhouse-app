import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Heading,
  Box,
  Input,
  Button,
  Flex,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type FormData = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
  });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    // eslint-disable-next-line no-console
    console.log({ email, password });
  });

  return (
    <Flex align="center" justify="center" h="100vh">
      <Box w="20rem">
        <Heading as="h2" size="xl">
          Login
        </Heading>

        <form onSubmit={onSubmit}>
          <FormControl isInvalid={!!errors.email} mb="4">
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" type="email" {...register('email')} />
            {errors.email ? (
              <FormErrorMessage>{errors.email.message}.</FormErrorMessage>
            ) : (
              <FormHelperText>Digite o seu e-mail aqui.</FormHelperText>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.password} mb="4">
            <FormLabel htmlFor="password">Senha</FormLabel>
            <Input id="password" type="password" {...register('password')} />
            {errors.password ? (
              <FormErrorMessage>{errors.password.message}.</FormErrorMessage>
            ) : (
              <FormHelperText>Digite a sua senha aqui.</FormHelperText>
            )}
          </FormControl>

          <Button type="submit" w="100%">
            Entrar
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
