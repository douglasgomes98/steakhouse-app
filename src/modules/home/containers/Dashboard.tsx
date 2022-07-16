import { useSteaks } from '@/hooks';
import { Header } from '@/modules/common/components/Header';
import {
  Container,
  Center,
  Heading,
  Wrap,
  WrapItem,
  useMediaQuery,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { CreateSteakButton } from './components/CreateSteakButton';
import { SteakCard } from './components/SteakCard';

export function Dashboard() {
  const { t } = useTranslation();
  const { steaks } = useSteaks();

  const [centerCards] = useMediaQuery('(max-width: 1025px)');

  return (
    <Container maxW="container.lg" pb="8">
      <Header />

      <Center pb="8">
        <Heading>{t('dashboard.pageTitle')}</Heading>
      </Center>

      <Wrap
        justify={centerCards ? 'center' : ''}
        spacing="3"
        pt="4"
        pb="4"
        pl="1"
        pr="1"
      >
        {steaks.map(({ id, date, description }) => (
          <WrapItem key={id}>
            <SteakCard
              date={date}
              description={description}
              amountPeople={0}
              amountCollected={0}
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
