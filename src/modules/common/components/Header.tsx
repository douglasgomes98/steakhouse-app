import { useAuthentication } from '@/hooks';
import { Flex, IconButton, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FiLogOut } from 'react-icons/fi';

export function Header() {
  const { t } = useTranslation();
  const { actions } = useAuthentication();

  return (
    <Flex justify="space-between" p="4">
      <Text>{t('common.headerMessageLabel')}</Text>

      <IconButton
        aria-label="logoff"
        as={FiLogOut}
        color="black"
        variant="unstyled"
        height="1.5rem"
        width="1.5rem"
        onClick={actions.logout}
      />
    </Flex>
  );
}
