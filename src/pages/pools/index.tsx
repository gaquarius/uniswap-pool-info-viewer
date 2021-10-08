import Pools from 'components/Pools';
import PoolWatchList from 'components/PoolWatchList';
import { Main } from 'templates/Main';

const Index = () => {
  return (
    <Main>
      <PoolWatchList />
      <Pools />
    </Main>
  );
};

export default Index;
