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
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputCurrency } from '@/modules/common/components/InputCurrency';
import {
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
import { z } from 'zod';

const schema = z.object({
  description: z
    .string({
      required_error: i18next.t('validation.descriptionRequired'),
    })
    .min(1, { message: i18next.t('validation.descriptionRequired') }),
  date: z
    .string({ required_error: i18next.t('validation.dateRequired') })
    .refine(
      value => {
        const dateParsed = parseDate(value, 'brazilian');
        if (!dateParsed) return false;

        return dateIsAfter(
          dateToStartDay(addDaysInDate(new Date(), -1)),
          dateToStartDay(dateParsed),
        );
      },
      { message: i18next.t('validation.dateInvalid') },
    ),
  observation: z.string().optional(),
  minValueWithoutBeer: z
    .number({
      coerce: true,
      required_error: i18next.t('validation.minValueWithoutBeerRequired'),
    })
    .min(1, { message: i18next.t('validation.minValueWithoutBeerInvalid') }),
  minValueWithBeer: z
    .number({
      coerce: true,
      required_error: i18next.t('validation.minValueWithBeerRequired'),
    })
    .min(1, { message: i18next.t('validation.minValueWithBeerInvalid') }),
});

type FormData = z.infer<typeof schema>;

export function CreateSteak() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(schema),
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

  return (
    <Container maxW="container.lg" pb="8">
      <Center p="8">
        <Heading>{t('create-steak.pageTitle')}</Heading>
      </Center>

      <Center>
        <Box w="20rem">
          <form onSubmit={onSubmit}>
            <Controller
              control={control}
              name="description"
              render={({ field, fieldState }) => (
                <FormControl isInvalid={fieldState.invalid} mb="4">
                  <FormLabel htmlFor="description">
                    {t('common.inputDescriptionLabel')}
                  </FormLabel>
                  <Input
                    id="description"
                    placeholder={t('common.inputDescriptionPlaceholder')}
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
              name="date"
              render={({ field, fieldState }) => (
                <FormControl isInvalid={fieldState.invalid} mb="4">
                  <FormLabel htmlFor="date">
                    {t('common.inputDateLabel')}
                  </FormLabel>
                  <InputMasked
                    id="date"
                    placeholder={t('common.inputDatePlaceholder')}
                    format="##/##/####"
                    mask={['D', 'D', 'M', 'M', 'A', 'A', 'A', 'A']}
                    value={field.value}
                    onChange={field.onChange}
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
              name="observation"
              render={({ field }) => (
                <FormControl mb="4">
                  <FormLabel htmlFor="observation">
                    {t('common.inputObservationLabel')}
                  </FormLabel>
                  <Textarea
                    id="observation"
                    placeholder={t('common.inputObservationPlaceholder')}
                    value={field.value}
                    onChange={event => field.onChange(event.target.value)}
                  />
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="minValueWithoutBeer"
              render={({ field, fieldState }) => (
                <FormControl isInvalid={fieldState.invalid} mb="4">
                  <FormLabel htmlFor="minValueWithoutBeer">
                    {t('common.inputMinValueWithoutBeerLabel')}
                  </FormLabel>
                  <InputCurrency
                    id="minValueWithoutBeer"
                    placeholder={t(
                      'common.inputMinValueWithoutBeerPlaceholder',
                    )}
                    value={field.value}
                    onChange={({ floatValue }) => field.onChange(floatValue)}
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
              name="minValueWithBeer"
              render={({ field, fieldState }) => (
                <FormControl isInvalid={fieldState.invalid} mb="4">
                  <FormLabel htmlFor="minValueWithBeer">
                    {t('common.inputMinValueWithBeerLabel')}
                  </FormLabel>
                  <InputCurrency
                    id="minValueWithBeer"
                    placeholder={t('common.inputMinValueWithBeerPlaceholder')}
                    value={field.value}
                    onChange={({ floatValue }) => field.onChange(floatValue)}
                  />
                  {fieldState.error?.message && (
                    <FormErrorMessage>
                      {fieldState.error?.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              )}
            />

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
