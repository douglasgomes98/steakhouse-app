import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useToast,
  Textarea,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputCurrency } from '@/modules/common/components/InputCurrency';
import {
  dateIsValid,
  parseDate,
  dateIsAfter,
  dateToStartDay,
  addDaysInDate,
} from '@/helpers';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useSteaks } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/routers/constants/routes';
import { InputMasked } from '@/modules/common/components/InputMasked';

type FormData = {
  description: string;
  date: string;
  observation?: string;
  minValueWithoutBeer: number;
  minValueWithBeer: number;
};

const schema = yup.object().shape({
  description: yup
    .string()
    .required(i18next.t('validation.descriptionRequired')),
  date: yup
    .string()
    .required(i18next.t('validation.dateRequired'))
    .test('date', i18next.t('validation.dateInvalid'), value => {
      if (!value) return false;

      return dateIsValid(parseDate(value, 'brazilian'));
    })
    .test('date', i18next.t('validation.dateInvalid'), value => {
      if (!value) return false;

      const dateParsed = parseDate(value, 'brazilian');
      if (!dateParsed) return false;

      return dateIsAfter(
        dateToStartDay(addDaysInDate(new Date(), -1)),
        dateToStartDay(dateParsed),
      );
    }),
  observation: yup.string().nullable(),
  minValueWithoutBeer: yup
    .number()
    .required(i18next.t('validation.minValueWithoutBeerRequired'))
    .min(1, i18next.t('validation.minValueWithoutBeerInvalid')),
  minValueWithBeer: yup
    .number()
    .required(i18next.t('validation.minValueWithBeerRequired'))
    .min(1, i18next.t('validation.minValueWithBeerInvalid')),
});

export function CreateSteak() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(schema as any),
    shouldUnregister: true,
    shouldFocusError: true,
    defaultValues: {
      minValueWithoutBeer: 0,
      minValueWithBeer: 0,
    },
  });

  const { actions } = useSteaks();

  const toast = useToast({
    position: 'top-right',
  });

  const onSubmit = handleSubmit(
    async ({
      description,
      date,
      observation,
      minValueWithoutBeer,
      minValueWithBeer,
    }) => {
      actions.createSteak({
        description,
        date: parseDate(date, 'brazilian') as Date,
        observation,
        minValueWithoutBeerByPeople: minValueWithoutBeer,
        minValueWithBeerByPeople: minValueWithBeer,
      });

      toast({
        title: t('create-steak.createSteakSuccessMessage'),
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      navigate(routes.dashboard);
    },
  );

  function handleInputChange(value: any, key: keyof FormData) {
    setValue(key, value);
    trigger(key);
  }

  return (
    <Container maxW="container.lg" pb="8">
      <Center p="8">
        <Heading>{t('create-steak.pageTitle')}</Heading>
      </Center>

      <Center>
        <Box w="20rem">
          <form onSubmit={onSubmit}>
            <FormControl isInvalid={!!errors.description} mb="4">
              <FormLabel htmlFor="description">
                {t('common.inputDescriptionLabel')}
              </FormLabel>
              <Input
                id="description"
                type="text"
                placeholder={t('common.inputDescriptionPlaceholder')}
                autoFocus
                {...register('description')}
              />
              {errors.description && (
                <FormErrorMessage>
                  {errors.description.message}
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.date} mb="4">
              <FormLabel htmlFor="date">{t('common.inputDateLabel')}</FormLabel>
              <InputMasked
                id="date"
                placeholder={t('common.inputDatePlaceholder')}
                {...register('date')}
                format="##/##/####"
                mask={['D', 'D', 'M', 'M', 'A', 'A', 'A', 'A']}
                onChange={value => handleInputChange(value, 'date')}
                value={getValues().date}
              />
              {errors.date && (
                <FormErrorMessage>{errors.date.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.observation} mb="4">
              <FormLabel htmlFor="observation">
                {t('common.inputObservationLabel')}
              </FormLabel>
              <Textarea
                id="observation"
                placeholder={t('common.inputObservationPlaceholder')}
                {...register('observation')}
              />
              {errors.observation && (
                <FormErrorMessage>
                  {errors.observation.message}
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.minValueWithoutBeer} mb="4">
              <FormLabel htmlFor="minValueWithoutBeer">
                {t('common.inputMinValueWithoutBeerLabel')}
              </FormLabel>
              <InputCurrency
                id="minValueWithoutBeer"
                placeholder={t('common.inputMinValueWithoutBeerPlaceholder')}
                onChange={({ floatValue }) => {
                  handleInputChange(floatValue, 'minValueWithoutBeer');
                }}
              />
              {errors.minValueWithoutBeer && (
                <FormErrorMessage>
                  {errors.minValueWithoutBeer.message}
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.minValueWithBeer} mb="4">
              <FormLabel htmlFor="minValueWithBeer">
                {t('common.inputMinValueWithBeerLabel')}
              </FormLabel>
              <InputCurrency
                id="minValueWithBeer"
                placeholder={t('common.inputMinValueWithBeerPlaceholder')}
                onChange={({ floatValue }) => {
                  handleInputChange(floatValue, 'minValueWithBeer');
                }}
              />
              {errors.minValueWithBeer && (
                <FormErrorMessage>
                  {errors.minValueWithBeer.message}
                </FormErrorMessage>
              )}
            </FormControl>

            <Button type="submit" w="100%" mb="4" colorScheme="blue">
              {t('create-steak.createSteakButtonLabel')}
            </Button>

            <Button variant="outline" w="100%" onClick={() => navigate(-1)}>
              {t('create-steak.cancelCreateSteakButtonLabel')}
            </Button>
          </form>
        </Box>
      </Center>
    </Container>
  );
}
