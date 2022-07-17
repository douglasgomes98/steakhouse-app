import { useSteaks } from '@/hooks';
import { Header } from '@/modules/common/components/Header';
import { routes } from '@/routers/constants/routes';
import {
  Container,
  Center,
  Heading,
  Wrap,
  WrapItem,
  useMediaQuery,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CreateSteakButton } from './components/CreateSteakButton';
import { SteakCard } from './components/SteakCard';

export function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
        {steaks.map(({ id, date, description, observation }) => (
          <WrapItem key={id}>
            <SteakCard
              date={date}
              description={description}
              observation={observation}
              amountPeople={0}
              amountCollected={0}
              onClick={() => navigate(routes.createEditSteakRoute(id))}
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
