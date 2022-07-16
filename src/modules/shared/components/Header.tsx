import { useAuthentication } from '@/hooks/useAuthentication';
import { Flex, IconButton, Text } from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';

export function Header() {
  const { actions } = useAuthentication();

  return (
    <Flex justify="space-between" p="4">
      <Text>Seja bem vindo!</Text>

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
