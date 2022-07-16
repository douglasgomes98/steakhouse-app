import { routes } from '@/routers/constants/routes';
import { Button, Icon, Text, Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdOutdoorGrill } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export function CreateSteakButton() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Button
      display="flex"
      alignItems="center"
      justifyItems="center"
      flexDirection="column"
      variant="unstyled"
      minW="20rem"
      minH="12rem"
      bg="gray.100"
      boxShadow="base"
      _hover={{
        bg: 'gray.200',
      }}
      onClick={() => navigate(routes.createSteak)}
    >
      <Flex
        justify="center"
        align="center"
        bg="blue.500"
        h="5rem"
        w="5rem"
        borderRadius="50%"
      >
        <Icon as={MdOutdoorGrill} color="gray.100" height="3rem" width="3rem" />
      </Flex>

      <Text fontSize="xl" fontWeight="bold" mt="2">
        {t('dashboard.createSteakButtonLabel')}
      </Text>
    </Button>
  );
}
