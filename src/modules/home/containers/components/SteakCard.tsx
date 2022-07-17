import { formatCurrency, formatDate } from '@/helpers';
import { Button, Flex, Heading, Text, Icon, Tooltip } from '@chakra-ui/react';
import { FaUsers } from 'react-icons/fa';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { MouseEvent } from 'react';

export type SteakCardProps = {
  date: Date;
  description: string;
  observation?: string;
  amountPeople: number;
  amountCollected: number;
  onClick: (event: MouseEvent) => void;
};

export function SteakCard({
  date,
  description,
  observation,
  amountPeople,
  amountCollected,
  onClick,
}: SteakCardProps) {
  return (
    <Button
      minW="20rem"
      maxW="20rem"
      minH="12rem"
      bg="white"
      borderRadius="lg"
      boxShadow="base"
      variant="unstyled"
      p="4"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      _hover={{
        bg: 'gray.100',
      }}
      onClick={onClick}
    >
      <Flex direction="column" w="100%">
        <Flex mb="2">
          <Text fontSize="2xl" fontWeight="bold">
            {formatDate(date, 'brazilian')}
          </Text>
        </Flex>

        <Flex mb="4">
          <Tooltip label={description}>
            <Heading
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              overflow="hidden"
              fontSize="xl"
            >
              {description}
            </Heading>
          </Tooltip>
        </Flex>

        {observation && (
          <Flex mb="2">
            <Tooltip label={observation}>
              <Text
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
              >
                {observation}
              </Text>
            </Tooltip>
          </Flex>
        )}
      </Flex>

      <Flex justify="space-between" w="100%">
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
