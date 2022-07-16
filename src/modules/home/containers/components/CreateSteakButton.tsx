import { Button, Icon, Text, Flex } from '@chakra-ui/react';
import { MdOutdoorGrill } from 'react-icons/md';

export function CreateSteakButton() {
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
        Adicionar Churras
      </Text>
    </Button>
  );
}
