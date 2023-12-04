import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  RadioGroup,
  Radio,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSteaks } from '@/hooks';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { z } from 'zod';

export type ModalAddPeopleProps = {
  isOpen: boolean;
  onClose: () => void;
  currentSteakId: string;
  minValueWithoutBeer: number;
  minValueWithBeer: number;
};

const schema = z.object({
  name: z
    .string({
      required_error: i18next.t('validation.nameRequired'),
    })
    .min(1, i18next.t('validation.nameRequired')),
  withBeer: z.enum(['withoutBeer', 'withBeer']),
});

type FormData = z.infer<typeof schema>;

export function ModalAddPeople({
  isOpen,
  onClose,
  currentSteakId,
  minValueWithBeer,
  minValueWithoutBeer,
}: ModalAddPeopleProps) {
  const { t } = useTranslation();

  const { handleSubmit, control } = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      withBeer: 'withoutBeer',
    },
  });

  const { actions } = useSteaks();

  const toast = useToast({
    position: 'top-right',
  });

  const onSubmit = handleSubmit(async ({ name, withBeer }) => {
    actions.addPeople(
      {
        name,
        amount:
          withBeer === 'withBeer' ? minValueWithBeer : minValueWithoutBeer,
      },
      currentSteakId,
    );

    toast({
      title: t('edit-steak.addPeopleSuccessMessage'),
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    onClose();
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('edit-steak.modalAddPeopleTitle')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={onSubmit} id="form-add-people">
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState }) => (
                <FormControl isInvalid={fieldState.invalid} mb="4">
                  <FormLabel htmlFor="name">
                    <FormLabel htmlFor="name">
                      {t('common.inputNameLabel')}
                    </FormLabel>
                  </FormLabel>
                  <Input
                    id="name"
                    placeholder={t('common.inputNamePlaceholder')}
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
              name="withBeer"
              render={({ field }) => (
                <RadioGroup onChange={field.onChange} value={field.value}>
                  <Stack>
                    <Radio value="withoutBeer">
                      {t('edit-steak.withoutBeerLabel')}
                    </Radio>
                    <Radio value="withBeer">
                      {t('edit-steak.withBeerLabel')}
                    </Radio>
                  </Stack>
                </RadioGroup>
              )}
            />
          </form>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            {t('edit-steak.cancelAddPeopleButtonLabel')}
          </Button>
          <Button type="submit" form="form-add-people" colorScheme="blue">
            {t('edit-steak.confirmAddPeopleButtonLabel')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
