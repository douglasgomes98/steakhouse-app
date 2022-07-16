import { formatCurrency, formatDate } from '@/helpers';
import { Button, Flex, Heading, Text, Icon } from '@chakra-ui/react';
import { FaUsers } from 'react-icons/fa';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';

export type SteakCardProps = {
  date: Date;
  description: string;
  amountPeople: number;
  amountCollected: number;
};

export function SteakCard({
  date,
  description,
  amountPeople,
  amountCollected,
}: SteakCardProps) {
  return (
    <Button
      minW="20rem"
      minH="12rem"
      bg="white"
      borderRadius="lg"
      boxShadow="base"
      variant="unstyled"
      p="4"
      _hover={{
        bg: 'gray.100',
      }}
    >
      <Flex mb="2">
        <Text fontSize="2xl" fontWeight="bold">
          {formatDate(date, 'monthAndYear')}
        </Text>
      </Flex>

      <Flex mb="12">
        <Heading fontSize="xl">{description}</Heading>
      </Flex>

      <Flex justify="space-between">
        <Flex align="center">
          <Icon
            aria-label="persons"
            as={FaUsers}
            color="blue.500"
            height="1.5rem"
            width="1.5rem"
          />
          <Text ml="2">{amountPeople}</Text>
        </Flex>

        <Flex align="center">
          <Icon
            aria-label="money"
            as={RiMoneyDollarCircleFill}
            color="blue.500"
            height="1.5rem"
            width="1.5rem"
          />
          <Text ml="2">{formatCurrency(amountCollected)}</Text>
        </Flex>
      </Flex>
    </Button>
  );
}
