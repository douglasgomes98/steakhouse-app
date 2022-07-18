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
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSteaks } from '@/hooks';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

export type ModalAddPeopleProps = {
  isOpen: boolean;
  onClose: () => void;
  currentSteakId: string;
  minValueWithoutBeer: number;
  minValueWithBeer: number;
};

type FormData = {
  name: string;
  withBeer: string;
};

const schema = yup.object().shape({
  name: yup.string().required(i18next.t('validation.nameRequired')),
  withBeer: yup.string().required(),
});

export function ModalAddPeople({
  isOpen,
  onClose,
  currentSteakId,
  minValueWithBeer,
  minValueWithoutBeer,
}: ModalAddPeopleProps) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    shouldUnregister: true,
    shouldFocusError: true,
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

  function handleChangeRadio(value: string) {
    setValue('withBeer', value);
    trigger('withBeer');
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('edit-steak.modalAddPeopleTitle')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={onSubmit} id="form-add-people">
            <FormControl isInvalid={!!errors.name} mb="4">
              <FormLabel htmlFor="name">{t('common.inputNameLabel')}</FormLabel>
              <Input
                id="name"
                type="text"
                placeholder={t('common.inputNamePlaceholder')}
                autoFocus
                {...register('name')}
              />
              {errors.name && (
                <FormErrorMessage>{errors.name.message}</FormErrorMessage>
              )}
            </FormControl>

            <RadioGroup
              onChange={handleChangeRadio}
              value={getValues().withBeer}
            >
              <Stack {...register('withBeer')}>
                <Radio value="withoutBeer">
                  {t('edit-steak.withoutBeerLabel')}
                </Radio>
                <Radio value="withBeer">{t('edit-steak.withBeerLabel')}</Radio>
              </Stack>
            </RadioGroup>
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
