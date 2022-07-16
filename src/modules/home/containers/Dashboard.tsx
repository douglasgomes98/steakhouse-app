import { Header } from '@/modules/shared/components/Header';
import { Container, Center, Heading, Wrap, WrapItem } from '@chakra-ui/react';
import { CreateSteakButton } from './components/CreateSteakButton';
import { SteakCard } from './components/SteakCard';

export function Dashboard() {
  return (
    <Container maxW="container.lg">
      <Header />

      <Center pb="8">
        <Heading>Agenda de Churras</Heading>
      </Center>

      <Wrap justify="center" spacing="3" pt="4" pb="4" pl="1" pr="1">
        <WrapItem>
          <SteakCard />
        </WrapItem>
        <WrapItem>
          <SteakCard />
        </WrapItem>
        <WrapItem>
          <SteakCard />
        </WrapItem>
        <WrapItem>
          <SteakCard />
        </WrapItem>
        <WrapItem>
          <SteakCard />
        </WrapItem>
        <WrapItem>
          <SteakCard />
        </WrapItem>
        <WrapItem>
          <SteakCard />
        </WrapItem>
        <WrapItem>
          <SteakCard />
        </WrapItem>
        <WrapItem>
          <CreateSteakButton />
        </WrapItem>
      </Wrap>
    </Container>
  );
}
