import { formatCurrency, formatDate } from '@/helpers';
import { useSteaks } from '@/hooks';
import { routes } from '@/routers/constants/routes';
import {
  Container,
  Center,
  Heading,
  Box,
  Flex,
  Text,
  Icon,
  Button,
  Radio,
  Badge,
  useToast,
  PopoverTrigger,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  ButtonGroup,
  PopoverFooter,
} from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';
import { ModalAddPeople } from './components/ModalAddPeople';

export function EditSteak() {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { steaks, actions } = useSteaks();

  const [modalAddPeopleIsOpen, setModalAddPeopleIsOpen] = useState(false);

  const currentSteak = useMemo(() => {
    return steaks.find(steak => steak.id === params.id);
  }, [steaks, params]);

  const handleCloseModalAddPeople = useCallback(() => {
    setModalAddPeopleIsOpen(false);
  }, []);

  const toast = useToast({
    position: 'top-right',
  });

  function handleDeleteSteak() {
    if (!currentSteak) return;

    actions.removeSteak(currentSteak.id);

    toast({
      title: 'Churras deletado com sucesso!',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    navigate(routes.dashboard, {
      replace: true,
    });
  }

  function handleGoBack() {
    navigate(routes.dashboard, {
      replace: true,
    });
  }

  if (!currentSteak) {
    return (
      <Container maxW="container.lg" pb="8">
        <Center p="8">
          <Heading>Churras não encontrado</Heading>
        </Center>

        <Center p="8">
          <Button onClick={handleGoBack}>Ver churras adicionados</Button>
        </Center>
      </Container>
    );
  }

  return (
    <>
      <Container maxW="container.lg" pb="8">
        <Center p="8">
          <Heading>Editando Churras</Heading>
        </Center>

        <Center>
          <Box boxShadow="base" borderRadius="lg" p="4" maxW="35rem" w="100%">
            <Flex justify="space-between" mb="2">
              <Text fontSize="lg">
                {formatDate(currentSteak.date, 'brazilian')}
              </Text>

              <Flex align="center">
                <Icon
                  aria-label="persons"
                  as={FaUsers}
                  color="blue.500"
                  height="1.5rem"
                  width="1.5rem"
                />
                <Text fontSize="lg" ml="2">
                  {currentSteak.peoples.length}
                </Text>
              </Flex>
            </Flex>

            <Flex justify="space-between" align="center" mb="1" gap="1rem">
              <Heading
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
              >
                {currentSteak.description}
              </Heading>

              <Flex align="center">
                <Icon
                  aria-label="money"
                  as={RiMoneyDollarCircleFill}
                  color="blue.500"
                  height="1.5rem"
                  width="1.5rem"
                />
                <Text ml="2">{formatCurrency(currentSteak.amountPayed)}</Text>
              </Flex>
            </Flex>

            <Box mb="1">
              <Badge>{`Valor sem cerveja ${formatCurrency(
                currentSteak.minValueWithoutBeerByPeople,
              )}`}</Badge>
              <br />
              <Badge colorScheme="green">{` Valor com cerveja
                ${formatCurrency(currentSteak.minValueWithBeerByPeople)}
              `}</Badge>
            </Box>

            {currentSteak.observation && (
              <Text>{currentSteak.observation}</Text>
            )}
          </Box>
        </Center>

        <Center mt="8">
          <Box boxShadow="base" borderRadius="lg" p="4" maxW="35rem" w="100%">
            <Flex
              justify="space-between"
              align="center"
              mb={currentSteak.peoples.length > 1 ? '4' : ''}
            >
              <Heading fontSize="lg">Participantes</Heading>

              <Button onClick={() => setModalAddPeopleIsOpen(true)}>
                Adicionar
              </Button>
            </Flex>

            {currentSteak.peoples.map(people => (
              <Popover key={people.id}>
                <PopoverTrigger>
                  <Button
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    pb="2"
                    pt="2"
                    gap="1rem"
                    w="100%"
                    variant="ghost"
                  >
                    <Flex>
                      <Radio
                        isChecked={people.isPayed}
                        onClick={() =>
                          actions.changePeoplePayment(
                            people.id,
                            currentSteak.id,
                          )
                        }
                      />
                      <Text
                        ml="4"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        overflow="hidden"
                      >
                        {people.name}
                      </Text>
                    </Flex>

                    <Text>{formatCurrency(people.amount)}</Text>
                  </Button>
                </PopoverTrigger>
                <PopoverContent bg="gray.50">
                  <PopoverArrow bg="gray.50" />
                  <PopoverCloseButton />
                  <PopoverHeader>Remover participante</PopoverHeader>
                  <PopoverBody>
                    Deseja remover <strong>{people.name}</strong> do churras?
                  </PopoverBody>
                  <PopoverFooter display="flex" justifyContent="flex-end">
                    <ButtonGroup size="sm">
                      <Button
                        colorScheme="red"
                        onClick={() =>
                          actions.removePeople(people.id, currentSteak.id)
                        }
                      >
                        Sim
                      </Button>
                    </ButtonGroup>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
            ))}
          </Box>
        </Center>

        <Center mt="8">
          <Box maxW="35rem" w="100%">
            <Button
              colorScheme="red"
              variant="outline"
              w="100%"
              onClick={handleDeleteSteak}
            >
              Apagar Churras
            </Button>
          </Box>
        </Center>
      </Container>

      <ModalAddPeople
        isOpen={modalAddPeopleIsOpen}
        onClose={handleCloseModalAddPeople}
        currentSteakId={currentSteak.id}
        minValueWithoutBeer={currentSteak.minValueWithoutBeerByPeople}
        minValueWithBeer={currentSteak.minValueWithBeerByPeople}
      />
    </>
  );
}
