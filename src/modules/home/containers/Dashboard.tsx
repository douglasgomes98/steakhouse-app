import { Header } from '@/modules/common/components/Header';
import { Container, Center, Heading, Wrap, WrapItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { CreateSteakButton } from './components/CreateSteakButton';
import { SteakCard, SteakCardProps } from './components/SteakCard';

const steaks: SteakCardProps[] = [
  {
    date: new Date(),
    description: 'Sem motivo',
    amountPeople: 15,
    amountCollected: 100,
  },
  {
    date: new Date(),
    description: 'Sem motivo',
    amountPeople: 15,
    amountCollected: 100,
  },
  {
    date: new Date(),
    description: 'Sem motivo',
    amountPeople: 15,
    amountCollected: 100,
  },
  {
    date: new Date(),
    description: 'Sem motivo',
    amountPeople: 15,
    amountCollected: 100,
  },
  {
    date: new Date(),
    description: 'Sem motivo',
    amountPeople: 15,
    amountCollected: 100,
  },
  {
    date: new Date(),
    description: 'Sem motivo',
    amountPeople: 15,
    amountCollected: 100,
  },
  {
    date: new Date(),
    description: 'Sem motivo',
    amountPeople: 15,
    amountCollected: 100,
  },
  {
    date: new Date(),
    description: 'Sem motivo',
    amountPeople: 15,
    amountCollected: 100,
  },
  {
    date: new Date(),
    description: 'Sem motivo',
    amountPeople: 15,
    amountCollected: 100,
  },
  {
    date: new Date(),
    description: 'Sem motivo',
    amountPeople: 15,
    amountCollected: 100,
  },
  {
    date: new Date(),
    description: 'Sem motivo',
    amountPeople: 15,
    amountCollected: 100,
  },
];

export function Dashboard() {
  const { t } = useTranslation();

  return (
    <Container maxW="container.lg" pb="8">
      <Header />

      <Center pb="8">
        <Heading>{t('dashboard.pageTitle')}</Heading>
      </Center>

      <Wrap justify="center" spacing="3" pt="4" pb="4" pl="1" pr="1">
        {steaks.map(({ date, description, amountPeople, amountCollected }) => (
          <WrapItem>
            <SteakCard
              date={date}
              description={description}
              amountPeople={amountPeople}
              amountCollected={amountCollected}
            />
          </WrapItem>
        ))}
        <WrapItem>
          <CreateSteakButton />
        </WrapItem>
      </Wrap>
    </Container>
  );
}
